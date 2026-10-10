import * as THREE from "three";
import { clips } from "@/lib/work";
import { aerials } from "@/lib/vazduh";

/**
 * Stanica ispod kote: montaza.
 *
 * Gore je snimanje, dole je ono sto se sa snimljenim radi. Poslednja
 * stanica je zato vremenska linija — ali isecci u njoj nisu ukras nego
 * sam materijal: sedam reelova i osamnaest snimaka iz drona, isti oni
 * kroz koje se proslo pri spustanju.
 *
 * Isecak koji dodje pod glavu se pusti, ako je video. Ostali stoje na
 * poster kadru, pa cela traka kosta jedno dekodovanje.
 */

const TRACK_H = 2.6;
const TRACK_GAP = 3.4;
const CLIP_GAP = 0.4;

type Item = {
  tex: string;
  video?: string;
  /** Odnos stranica samog snimka, za popunjavanje isecka bez izduzenja. */
  ratio: number;
};

const ITEMS: Item[] = [
  ...clips.map((c) => ({ tex: `/radovi/${c.file}.jpg`, video: `/radovi/${c.file}.mp4`, ratio: 9 / 16 })),
  ...aerials.map((a) => ({ tex: `/beograd/${a.file}-mali.webp`, ratio: 16 / 9 })),
];

const VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

const FRAG = `
uniform sampler2D uTex;
uniform float uFade;
uniform float uOn;
uniform float uTexA;
uniform float uBoxA;
varying vec2 vUv;

vec3 toLinear(vec3 c){
  return mix(c / 12.92, pow((c + .055) / 1.055, vec3(2.4)), step(vec3(.04045), c));
}

void main(){
  if (uFade < .01) discard;

  // Isecak je sirok, snimak uspravan: popunjava se po kracoj strani.
  vec2 scale = uBoxA > uTexA ? vec2(1., uTexA / uBoxA) : vec2(uBoxA / uTexA, 1.);
  vec2 uv = (vUv - .5) * scale + .5;

  vec3 col = toLinear(texture2D(uTex, uv).rgb);
  // Materijal u traci stoji prigusen; pod glavom se otvori.
  col *= mix(.24, .60, uOn);

  // Ivica isecka: rez se vidi i kad je kadar taman.
  float e = min(min(vUv.x, 1. - vUv.x) * uBoxA, min(vUv.y, 1. - vUv.y));
  float edge = smoothstep(.035, 0., e);
  col += edge * mix(.040, .19, uOn) * toLinear(vec3(.74, .72, 1.));

  gl_FragColor = vec4(col, uFade);
}`;

/** Glava: jedina uspravna crta, stoji dok sve ostalo klizi. */
const HEAD_FRAG = `
uniform float uFade;
varying vec2 vUv;
void main(){
  if (uFade < .01) discard;
  float core = smoothstep(.5, .42, abs(vUv.x - .5));
  float glow = smoothstep(.5, .0, abs(vUv.x - .5));
  vec3 col = vec3(.24, .22, .46) * core + vec3(.04, .035, .09) * glow;
  gl_FragColor = vec4(col, uFade * (core * .8 + glow * .22));
}`;

/**
 * Pod: mreza koja bezi u dubinu, sa odsjajem trake, barom svetla ispod
 * glave i sporim talasom koji prelazi preko njega. Bez toga je ceo donji
 * deo kadra crn.
 */
const FLOOR_FRAG = `
uniform float uFade;
uniform float uT;
uniform float uHeadU;
varying vec2 vUv;

void main(){
  if (uFade < .01) discard;

  vec2 g = abs(fract(vUv * 42.) - .5);
  float line = smoothstep(.5, .42, max(g.x, g.y));
  float depth = smoothstep(.0, .36, vUv.y) * smoothstep(1., .58, vUv.y);

  // Odsjaj trake: pod je svetliji tamo gde je traka nad njim.
  float band = smoothstep(.0, .34, vUv.y) * (1. - smoothstep(.34, .74, vUv.y));

  // Bara svetla ispod glave.
  float d = distance(vec2(vUv.x, vUv.y * 1.7), vec2(uHeadU, .40 * 1.7));
  float pool = smoothstep(.2, .0, d);

  // Spori talas preko poda, da pod ne bude mrtav.
  float sweep = smoothstep(.07, .0, abs(fract(vUv.y * .5 - uT * .035) - .5));

  vec3 col = line * vec3(.020, .018, .044);
  col += band * vec3(.007, .006, .018);
  col += pool * vec3(.034, .030, .075);
  col += sweep * line * vec3(.022, .020, .045);

  gl_FragColor = vec4(col, uFade * depth * .85);
}`;

/** Prasina u mraku: sitne tacke koje svetlucaju i polako lebde. */
const DUST_VERT = `
attribute float aSeed;
uniform float uT;
uniform float uPR;
varying float vA;
varying vec3 vC;
void main(){
  vec3 p = position;
  p.y += sin(uT * (.12 + aSeed * .2) + aSeed * 40.) * 1.6;
  p.x += cos(uT * (.09 + aSeed * .14) + aSeed * 30.) * 2.4;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_PointSize = (1.4 + aSeed * aSeed * 5.) * uPR * (46. / max(-mv.z, .001));
  vA = .25 + .75 * abs(sin(uT * (.5 + aSeed * 2.2) + aSeed * 60.));
  vC = mix(vec3(.72, .68, 1.), vec3(.55, .82, .95), step(.78, aSeed));
  gl_Position = projectionMatrix * mv;
}`;

const DUST_FRAG = `
uniform float uFade;
varying float vA;
varying vec3 vC;
void main(){
  vec2 c = gl_PointCoord - .5;
  float d = length(c);
  float disc = smoothstep(.5, .36, d);
  float core = smoothstep(.2, .0, d);
  float a = (disc * .45 + core * .85) * vA * uFade;
  if (a < .01) discard;
  gl_FragColor = vec4(vC * (.75 + core), a);
}`;

type Clip = {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  /** Pocetak isecka po duzini trake, u metrima. */
  start: number;
  w: number;
  item: Item;
  video: HTMLVideoElement | null;
  tex: THREE.VideoTexture | null;
  on: number;
};

export type Montaza = {
  group: THREE.Group;
  update: (t: number, dt: number, fade: number) => void;
  dispose: () => void;
};

/** Glava stoji levo od sredine: na sredini bi prolazila kroz formu. */
const HEAD_X = -24;

export function buildMontaza(mobile: boolean): Montaza {
  const TRACKS = mobile ? 4 : 6;
  const PER_TRACK = mobile ? 7 : 10;

  const group = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.ShaderMaterial[] = [];
  const loader = new THREE.TextureLoader();
  const textures = new Map<string, THREE.Texture>();
  const getTex = (url: string) => {
    let t = textures.get(url);
    if (!t) {
      t = loader.load(url);
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      textures.set(url, t);
    }
    return t;
  };

  const tracks: { clips: Clip[]; len: number; speed: number }[] = [];
  const top = ((TRACKS - 1) / 2) * TRACK_GAP;
  let pick = 0;

  for (let i = 0; i < TRACKS; i++) {
    const list: Clip[] = [];
    let x = 0;
    for (let k = 0; k < PER_TRACK; k++) {
      const item = ITEMS[pick++ % ITEMS.length];
      // Sirine se razlikuju kao u pravoj montazi: nije svaki rez isti.
      const w = 4.5 + ((pick * 2.7) % 7);
      const geo = new THREE.PlaneGeometry(w, TRACK_H);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        uniforms: {
          uTex: { value: getTex(item.tex) },
          uFade: { value: 0 },
          uOn: { value: 0 },
          uTexA: { value: item.ratio },
          uBoxA: { value: w / TRACK_H },
        },
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = top - i * TRACK_GAP;
      mesh.position.z = -i * 1.2;
      geos.push(geo);
      mats.push(mat);
      group.add(mesh);

      list.push({ mesh, mat, start: x, w, item, video: null, tex: null, on: 0 });
      x += w + CLIP_GAP;
    }
    tracks.push({ clips: list, len: x, speed: 2.1 - i * 0.22 });
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
  head.position.set(HEAD_X, 0, 0.9);
  geos.push(headGeo);
  mats.push(headMat);
  group.add(head);

  const floorGeo = new THREE.PlaneGeometry(190, 220);
  const floorMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FLOOR_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uFade: { value: 0 },
      uT: { value: 0 },
      // Gde glava pada na pod, u koordinatama poda.
      uHeadU: { value: HEAD_X / 190 + 0.5 },
    },
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -top - 10, -60);
  geos.push(floorGeo);
  mats.push(floorMat);
  group.add(floor);

  // --- prasina ---
  const DUST = mobile ? 320 : 950;
  const dpos = new Float32Array(DUST * 3);
  const dseed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dpos[i * 3] = (Math.random() - 0.5) * 185;
    dpos[i * 3 + 1] = (Math.random() - 0.5) * 34 - 2;
    dpos[i * 3 + 2] = -55 + Math.random() * 85;
    dseed[i] = Math.random();
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
  dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dseed, 1));
  const dustMat = new THREE.ShaderMaterial({
    vertexShader: DUST_VERT,
    fragmentShader: DUST_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uT: { value: 0 },
      uFade: { value: 0 },
      uPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
    },
  });
  geos.push(dustGeo);
  mats.push(dustMat);
  group.add(new THREE.Points(dustGeo, dustMat));

  /** Isecak koji je trenutno pod glavom; jedini koji se pusta. */
  let playing: Clip | null = null;

  const stop = (c: Clip | null) => {
    if (!c?.video) return;
    c.video.pause();
  };

  const play = (c: Clip) => {
    if (!c.item.video) return;
    if (!c.video) {
      const v = document.createElement("video");
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "none";
      v.setAttribute("playsinline", "");
      v.src = c.item.video;
      c.video = v;
      const tex = new THREE.VideoTexture(v);
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      c.tex = tex;
    }
    c.video.play().then(
      () => {
        if (c.tex) c.mat.uniforms.uTex.value = c.tex;
      },
      () => {
        // Pregledac odbio pustanje: poster ostaje, bez greske.
      }
    );
  };

  let offset = 0;

  const update: Montaza["update"] = (t, dt, fade) => {
    for (const m of mats) m.uniforms.uFade.value = fade;
    floorMat.uniforms.uT.value = t;
    dustMat.uniforms.uT.value = t;
    if (fade < 0.01) {
      stop(playing);
      playing = null;
      return;
    }

    offset += dt;
    let best: Clip | null = null;
    let bestD = Infinity;

    for (const track of tracks) {
      const shift = offset * track.speed;
      for (const c of track.clips) {
        // Traka se vrti u krug: sta prodje levo, vraca se zdesna.
        let cx = ((c.start + c.w / 2 - shift) % track.len + track.len) % track.len - track.len / 2;
        c.mesh.position.x = cx;

        const d = Math.abs(cx - HEAD_X);
        const under = d < c.w / 2;
        if (under && c.item.video && d < bestD) {
          bestD = d;
          best = c;
        }
        const target = under ? 1 : 0;
        c.on += (target - c.on) * (1 - Math.exp(-6 * dt));
        c.mat.uniforms.uOn.value = c.on;
        // Isecak pod glavom malo iskoci, kao kad se u montazi izabere.
        c.mesh.scale.setScalar(1 + c.on * 0.08);
        c.mesh.position.z = -tracks.indexOf(track) * 1.2 + c.on * 1.4;
      }
    }

    if (best !== playing) {
      stop(playing);
      playing = best;
      if (best) play(best);
    }
  };

  const dispose = () => {
    stop(playing);
    for (const track of tracks) {
      for (const c of track.clips) {
        if (c.video) {
          c.video.removeAttribute("src");
          c.video.load();
        }
        c.tex?.dispose();
      }
    }
    textures.forEach((t) => t.dispose());
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
    group.clear();
  };

  return { group, update, dispose };
}
