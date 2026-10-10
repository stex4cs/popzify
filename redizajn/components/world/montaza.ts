import * as THREE from "three";

/**
 * Stanica ispod kote: montaza.
 *
 * Gore je snimanje, dole je ono sto se sa snimljenim radi. Poslednja
 * stanica je zato vremenska linija: trake sa isecima, rez po rez, i
 * glava koja stoji dok materijal klizi kroz nju.
 *
 * Linija stoji uspravno, u visini kamere, i gleda se pravo u nju.
 * Prva verzija je lezala nize i gledala se odozgo pod ostrim uglom, pa
 * su se trake skupile u jednu mrlju i nista se nije citalo.
 */

const TRACKS = 8;
const TRACK_H = 2.6;
const TRACK_GAP = 3.4;
const SPAN = 170; // duzina vremenske linije u metrima
const CLIPS = 22; // koliko iseaka stane po duzini

const VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

/**
 * Jedna traka je jedna ravan; iseci se crtaju u shaderu umesto da svaki
 * bude svoj objekat. Osam traka su tako osam poziva, ne dvesta.
 */
const TRACK_FRAG = `
uniform float uT;
uniform float uFade;
uniform float uSeed;
uniform float uSpeed;
uniform float uRuler;
varying vec2 vUv;

float hash(float n){ return fract(sin(n * 127.1 + uSeed) * 43758.5453); }

void main(){
  if (uFade < .01) discard;

  float x = vUv.x * ${CLIPS}. - uT * uSpeed;
  float cell = floor(x);
  float f = fract(x);
  float lit = hash(cell);

  // Prazna mesta u traci: montaza nije puna od pocetka do kraja.
  if (lit < .2) discard;

  // Rez izmedju iseaka.
  float gap = smoothstep(0., .02, f) * smoothstep(1., .98, f);
  if (gap < .04) discard;

  vec3 col = mix(vec3(.020, .019, .041), vec3(.047, .038, .092), lit);

  // Talasni oblik unutar iseaka, da se vidi da je u njemu nesto.
  float h = .16 + hash(cell + 7.3) * .26;
  float band = smoothstep(h, h - .04, abs(vUv.y - .5));
  col += band * mix(vec3(.013, .012, .027), vec3(.036, .028, .072), hash(cell + 2.1));

  // Ivica iseaka, da se rez vidi i kad je isecak taman.
  float edge = smoothstep(.05, .0, min(f, 1. - f));
  col += edge * vec3(.027, .025, .054);

  // Poneki isecak je izabran.
  col += step(.9, lit) * vec3(.036, .026, .081);

  // Lenjir sa podeocima stoji samo na najgornjoj traci.
  float tick = step(.93, fract(vUv.x * ${CLIPS}. * 4.)) * step(.74, vUv.y);
  col += tick * uRuler * vec3(.06, .055, .12);

  gl_FragColor = vec4(col, uFade);
}`;

/** Glava: jedina uspravna crta, stoji dok sve ostalo klizi. */
const HEAD_FRAG = `
uniform float uFade;
varying vec2 vUv;
void main(){
  if (uFade < .01) discard;
  float core = smoothstep(.5, .44, abs(vUv.x - .5));
  float glow = smoothstep(.5, .0, abs(vUv.x - .5));
  vec3 col = vec3(.14, .13, .28) * core + vec3(.03, .028, .07) * glow;
  gl_FragColor = vec4(col, uFade * (core * .6 + glow * .18));
}`;

/** Pod: mreza koja bezi u dubinu, da se oseti da smo u prostoru. */
const FLOOR_FRAG = `
uniform float uFade;
varying vec2 vUv;
void main(){
  if (uFade < .01) discard;
  vec2 g = abs(fract(vUv * 42.) - .5);
  float line = smoothstep(.5, .44, max(g.x, g.y));
  float depth = smoothstep(.0, .4, vUv.y) * smoothstep(1., .55, vUv.y);
  gl_FragColor = vec4(line * vec3(.030, .027, .064), uFade * depth * .7);
}`;

export type Montaza = {
  group: THREE.Group;
  update: (t: number, fade: number) => void;
  dispose: () => void;
};

export function buildMontaza(): Montaza {
  const group = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.ShaderMaterial[] = [];
  const timed: THREE.ShaderMaterial[] = [];

  const top = ((TRACKS - 1) / 2) * TRACK_GAP;

  for (let i = 0; i < TRACKS; i++) {
    const geo = new THREE.PlaneGeometry(SPAN, TRACK_H);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: TRACK_FRAG,
      transparent: true,
      uniforms: {
        uT: { value: 0 },
        uFade: { value: 0 },
        uSeed: { value: i * 37.1 },
        // Gornje trake idu brze: slika se menja cesce od tona.
        uSpeed: { value: 0.5 - i * 0.045 },
        uRuler: { value: i === 0 ? 1 : 0 },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, top - i * TRACK_GAP, -i * 1.2);
    geos.push(geo);
    mats.push(mat);
    timed.push(mat);
    group.add(mesh);
  }

  const headGeo = new THREE.PlaneGeometry(0.5, TRACKS * TRACK_GAP + 5);
  const headMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: HEAD_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: { uFade: { value: 0 } },
  });
  const head = new THREE.Mesh(headGeo, headMat);
  // Glava stoji levo od sredine kadra: na sredini bi prolazila
  // tacno kroz formu, koja je centrirana.
  head.position.set(-24, 0, 0.8);
  geos.push(headGeo);
  mats.push(headMat);
  group.add(head);

  const floorGeo = new THREE.PlaneGeometry(SPAN, 220);
  const floorMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FLOOR_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: { uFade: { value: 0 } },
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -top - 10, -60);
  geos.push(floorGeo);
  mats.push(floorMat);
  group.add(floor);

  return {
    group,
    update: (t, fade) => {
      for (const m of mats) m.uniforms.uFade.value = fade;
      for (const m of timed) m.uniforms.uT.value = t;
    },
    dispose: () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      group.clear();
    },
  };
}
