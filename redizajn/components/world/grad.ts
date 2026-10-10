import * as THREE from "three";

/**
 * Beograd ispod kamere: zgrade i reke iz OpenStreetMap-a.
 *
 * Fajlovi nose obrise i visine, ne gotov mesh — obris je deset puta
 * manji, a izvlacenje u 3D je u pregledacu jeftino i uradi se jednom.
 * Koordinate su u cetvrtinama metra od usca Save i Dunava, u int16.
 *
 * Jedna jedinica scene je jedan metar, pa visine iz OSM-a ulaze kakve
 * jesu i kamera moze da stoji na stvarnoj visini snimka iz drona.
 *
 * Podaci: (c) OpenStreetMap doprinosioci, ODbL.
 */

const UNIT = 0.25;
const MAGIC = 0x31474250; // "PBG1"

type Ring = { pts: Float32Array; n: number; height: number };

function parse(buf: ArrayBuffer, withHeight: boolean): Ring[] {
  const dv = new DataView(buf);
  if (dv.getUint32(0, true) !== MAGIC) throw new Error("Neocekivan format podataka o gradu");
  const count = dv.getUint32(4, true);
  const out: Ring[] = [];
  let o = 8;
  for (let i = 0; i < count; i++) {
    const n = dv.getUint16(o, true);
    o += 2;
    let height = 0;
    if (withHeight) {
      height = dv.getUint16(o, true) / 10;
      o += 2;
    }
    const pts = new Float32Array(n * 2);
    for (let k = 0; k < n; k++) {
      pts[k * 2] = dv.getInt16(o, true) * UNIT;
      pts[k * 2 + 1] = dv.getInt16(o + 2, true) * UNIT;
      o += 4;
    }
    out.push({ pts, n, height });
  }
  return out;
}

/** Zidovi se prave rucno, krov ide kroz earcut koji Three vec nosi. */
function buildings(rings: Ring[]): THREE.BufferGeometry {
  let tris = 0;
  const roofs: number[][] = [];
  const contour: THREE.Vector2[] = [];
  for (const r of rings) {
    contour.length = 0;
    for (let k = 0; k < r.n; k++) contour.push(new THREE.Vector2(r.pts[k * 2], r.pts[k * 2 + 1]));
    const faces = THREE.ShapeUtils.triangulateShape(contour, []);
    roofs.push(faces.flat());
    tris += r.n * 2 + faces.length;
  }

  const pos = new Float32Array(tris * 9);
  const nor = new Float32Array(tris * 9);
  const hgt = new Float32Array(tris * 3);
  let p = 0;
  let nn = 0;
  let hh = 0;

  const push = (x: number, y: number, z: number, nx: number, ny: number, nz: number, h: number) => {
    pos[p++] = x;
    pos[p++] = y;
    pos[p++] = z;
    nor[nn++] = nx;
    nor[nn++] = ny;
    nor[nn++] = nz;
    hgt[hh++] = h;
  };

  rings.forEach((r, i) => {
    const h = r.height;
    for (let k = 0; k < r.n; k++) {
      const ax = r.pts[k * 2];
      const az = r.pts[k * 2 + 1];
      const j = (k + 1) % r.n;
      const bx = r.pts[j * 2];
      const bz = r.pts[j * 2 + 1];
      // Normala zida: okomita na ivicu, u ravni tla.
      const dx = bx - ax;
      const dz = bz - az;
      const len = Math.hypot(dx, dz) || 1;
      const nx = dz / len;
      const nz = -dx / len;
      push(ax, 0, az, nx, 0, nz, 0);
      push(bx, 0, bz, nx, 0, nz, 0);
      push(bx, h, bz, nx, 0, nz, h);
      push(ax, 0, az, nx, 0, nz, 0);
      push(bx, h, bz, nx, 0, nz, h);
      push(ax, h, az, nx, 0, nz, h);
    }
    const faces = roofs[i];
    for (let k = 0; k < faces.length; k += 3) {
      for (let v = 0; v < 3; v++) {
        const idx = faces[k + v];
        push(r.pts[idx * 2], h, r.pts[idx * 2 + 1], 0, 1, 0, h);
      }
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  geo.setAttribute("aH", new THREE.BufferAttribute(hgt, 1));
  geo.computeBoundingSphere();
  return geo;
}

function water(rings: Ring[]): THREE.BufferGeometry {
  const parts: number[] = [];
  const contour: THREE.Vector2[] = [];
  for (const r of rings) {
    contour.length = 0;
    for (let k = 0; k < r.n; k++) contour.push(new THREE.Vector2(r.pts[k * 2], r.pts[k * 2 + 1]));
    for (const f of THREE.ShapeUtils.triangulateShape(contour, [])) {
      for (const idx of f) parts.push(r.pts[idx * 2], 0, r.pts[idx * 2 + 1]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(parts), 3));
  geo.computeBoundingSphere();
  return geo;
}

const BUILDING_VERT = `
attribute float aH;
varying float vH;
varying float vUp;
varying vec3 vView;
void main(){
  vH = aH;
  vUp = normal.y;
  vec4 mv = modelViewMatrix * vec4(position, 1.);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

/**
 * Grad nije osvetljen suncem nego sam sobom: tamne mase, svetli obrisi
 * i tanka linija na vrhu. Tako se cita i sa 200 m i sa 20 m, a ostaje
 * u istoj paleti kao ostatak sajta.
 */
const BUILDING_FRAG = `
varying float vH;
varying float vUp;
varying vec3 vView;
uniform float uFade;
void main(){
  if (uFade < .01) discard;
  float tall = clamp(vH / 60., 0., 1.);
  vec3 base = mix(vec3(.075, .070, .125), vec3(.150, .130, .255), tall);
  // Krovovi su svetliji, kao da hvataju nebo.
  base += vUp * vec3(.070, .070, .120);
  float rim = pow(1. - clamp(dot(normalize(vView), vec3(0., 1., 0.)), 0., 1.), 3.);
  base += rim * mix(vec3(.10, .09, .22), vec3(.26, .20, .50), tall);
  gl_FragColor = vec4(base, uFade);
}`;

const WATER_FRAG = `
varying vec3 vP;
uniform float uT;
uniform float uFade;
void main(){
  if (uFade < .01) discard;
  // Reka je plava i glatka: jedina velika povrsina bez zgrada, pa po njoj
  // oko odmah nalazi usce. Odsjaj putuje nizvodno.
  float ripple = sin(vP.x * .012 + uT * .25) * .5 + sin(vP.z * .009 - uT * .18) * .5;
  vec3 col = vec3(.030, .055, .135) + ripple * vec3(.010, .020, .045);
  gl_FragColor = vec4(col, uFade);
}`;

const WATER_VERT = `
varying vec3 vP;
void main(){
  vP = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

/** Obale kao linije: dve tacke po segmentu, jedan poziv za sve reke. */
function shores(rings: Ring[]): THREE.BufferGeometry {
  let segs = 0;
  for (const r of rings) segs += Math.max(r.n - 1, 0);
  const pos = new Float32Array(segs * 6);
  let p = 0;
  for (const r of rings) {
    for (let k = 0; k < r.n - 1; k++) {
      pos[p++] = r.pts[k * 2];
      pos[p++] = 0;
      pos[p++] = r.pts[k * 2 + 1];
      pos[p++] = r.pts[(k + 1) * 2];
      pos[p++] = 0;
      pos[p++] = r.pts[(k + 1) * 2 + 1];
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.computeBoundingSphere();
  return geo;
}

export type City = {
  group: THREE.Group;
  setFade: (v: number) => void;
  tick: (t: number) => void;
  dispose: () => void;
};

/**
 * Ucitava i sklapa grad. Scena radi i dok ovo traje — dok fajlovi ne
 * stignu, grupa je prazna i nista ne puca.
 */
export async function loadCity(signal?: AbortSignal): Promise<City> {
  const [bz, bv, bo] = await Promise.all([
    fetch("/beograd/zgrade.bin", { signal }).then((r) => r.arrayBuffer()),
    fetch("/beograd/voda.bin", { signal }).then((r) => r.arrayBuffer()),
    fetch("/beograd/obale.bin", { signal }).then((r) => r.arrayBuffer()),
  ]);

  const group = new THREE.Group();
  const geoB = buildings(parse(bz, true));
  const geoW = water(parse(bv, false));
  const geoS = shores(parse(bo, false));

  const matB = new THREE.ShaderMaterial({
    vertexShader: BUILDING_VERT,
    fragmentShader: BUILDING_FRAG,
    transparent: true,
    uniforms: { uFade: { value: 1 } },
  });
  const matW = new THREE.ShaderMaterial({
    vertexShader: WATER_VERT,
    fragmentShader: WATER_FRAG,
    transparent: true,
    uniforms: { uT: { value: 0 }, uFade: { value: 1 } },
  });

  const matS = new THREE.LineBasicMaterial({
    color: 0x6fd9f2,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const meshW = new THREE.Mesh(geoW, matW);
  meshW.position.y = -0.4; // reka ispod kote zgrada, da se ne preklapaju
  const lineS = new THREE.LineSegments(geoS, matS);
  lineS.position.y = 0.6; // malo iznad vode, da se linija ne secka
  group.add(meshW, lineS, new THREE.Mesh(geoB, matB));

  return {
    group,
    setFade: (v) => {
      matB.uniforms.uFade.value = v;
      matW.uniforms.uFade.value = v;
      matS.opacity = 0.85 * v;
    },
    tick: (t) => {
      matW.uniforms.uT.value = t;
    },
    dispose: () => {
      geoB.dispose();
      geoW.dispose();
      geoS.dispose();
      matB.dispose();
      matW.dispose();
      matS.dispose();
      group.clear();
    },
  };
}
