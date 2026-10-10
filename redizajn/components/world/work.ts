import * as THREE from "three";
import { clips, CLIP_RATIO } from "@/lib/work";
import type { WorkVariant } from "@/lib/variant";

/**
 * Stanica Radovi u 3D prostoru, u dve varijante koje dele isti panel i
 * isto upravljanje videom:
 *
 *  jato  - paneli stoje razbacani po hodniku, kamera prolazi izmedju njih
 *  traka - paneli su nanizani u filmsku traku koja klizi pored kamere
 *
 * Video se pusta samo tamo gde se gleda. Ostali paneli stoje na poster
 * kadru, pa prvi prikaz kosta sedam sitnih slika umesto sedam snimaka.
 */

const PANEL_H = 2.0;
const PANEL_W = PANEL_H * CLIP_RATIO;
const PITCH = PANEL_W * 1.16;

/** Koliko snimaka sme da radi istovremeno. Dekodovanje je skupo. */
const BUDGET_DESKTOP = 3;
const BUDGET_MOBILE = 1;

/** x, y, z, zaokret oko Y, uvecanje — rucno rasporedjeno, ne nasumicno. */
const JATO: [number, number, number, number, number][] = [
  [-3.1, 0.9, -11.0, 0.4, 1.3],
  [0.6, -1.5, -14.5, -0.24, 1.15],
  [-3.5, -0.5, -18.0, 0.34, 1.2],
  [1.0, 1.3, -21.5, -0.26, 1.2],
  [-2.6, 0.1, -25.0, 0.32, 1.05],
  [0.7, -1.3, -28.5, -0.22, 1.0],
  [-2.0, 1.2, -32.0, 0.24, 0.95],
];

/** Panel se pojavljuje tek kad mu se kamera priblizi, i gasi u daljini. */
const FADE_NEAR = 14;
const FADE_FAR = 28;

/** Zakrivljenost trake: krajevi se povijaju od kamere. */
const ARC = 0.03;
const STRIP_Z = -10;

const VERT = `varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;

/**
 * Panel: zaobljeni pravougaonik sa tankim okvirom. Tekstura je sRGB, a
 * scena radi u linearnom prostoru, pa se prevodi ovde — OutputPass na
 * kraju lanca vraca sve u sRGB.
 */
const PANEL_FRAG = `
uniform sampler2D uTex;
uniform float uOn;
uniform float uFade;
uniform float uAspect;
varying vec2 vUv;

float sdBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.) + length(max(q, 0.)) - r;
}
vec3 toLinear(vec3 c){
  return mix(c / 12.92, pow((c + .055) / 1.055, vec3(2.4)), step(vec3(.04045), c));
}

void main(){
  vec2 half_ = vec2(uAspect, 1.) * .5;
  vec2 p = (vUv - .5) * vec2(uAspect, 1.);
  float d = sdBox(p, half_, .07);
  float inside = smoothstep(.004, -.004, d) * uFade;
  if (inside < .01) discard;

  vec3 col = toLinear(texture2D(uTex, vUv).rgb);
  col *= mix(.4, 1., uOn);

  float edge = smoothstep(.009, 0., abs(d + .004));
  col += edge * mix(.16, .5, uOn) * toLinear(vec3(.74, .72, 1.));

  gl_FragColor = vec4(col, inside);
}`;

/** Nosac trake: tamna podloga sa perforacijama uz obe ivice. */
const BAND_FRAG = `
uniform float uFrames;
uniform float uFade;
varying vec2 vUv;

vec3 toLinear(vec3 c){
  return mix(c / 12.92, pow((c + .055) / 1.055, vec3(2.4)), step(vec3(.04045), c));
}

void main(){
  float v = vUv.y;
  // Dve perforacije po oknu, kao na pravoj traci.
  float u = fract(vUv.x * uFrames * 2.);
  float nearEdge = step(.9, v) + step(v, .1);
  float hx = smoothstep(.13, .1, abs(u - .5));
  float hy = smoothstep(.038, .03, abs(v - (v > .5 ? .95 : .05)));
  if (nearEdge * hx * hy > .5) discard;

  vec3 base = toLinear(vec3(.07, .065, .1));
  float sheen = smoothstep(.5, .0, abs(v - .5)) * .012;
  if (uFade < .01) discard;
  gl_FragColor = vec4(base + sheen, .95 * uFade);
}`;

type Panel = {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  video: HTMLVideoElement;
  poster: THREE.Texture;
  tex: THREE.VideoTexture | null;
  started: boolean;
  on: number;
};

export type WorkScene = {
  group: THREE.Group;
  update: (t: number, camX: number, camZ: number, p: number, halfWAt: (z: number) => number) => void;
  dispose: () => void;
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export function buildWork(variant: WorkVariant, mobile: boolean): WorkScene {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const panels: Panel[] = [];
  let bandFade: THREE.ShaderMaterial | null = null;
  const loader = new THREE.TextureLoader();
  const budget = mobile ? BUDGET_MOBILE : BUDGET_DESKTOP;

  const panelGeo = new THREE.PlaneGeometry(PANEL_W, PANEL_H);
  geometries.push(panelGeo);

  clips.forEach((clip, i) => {
    const poster = loader.load(`/radovi/${clip.file}.jpg`);
    poster.generateMipmaps = false;
    poster.minFilter = THREE.LinearFilter;

    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("playsinline", "");
    video.src = `/radovi/${clip.file}.mp4`;

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: PANEL_FRAG,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTex: { value: poster },
        uOn: { value: 0 },
        uFade: { value: 1 },
        uAspect: { value: CLIP_RATIO },
      },
    });
    materials.push(mat);

    const mesh = new THREE.Mesh(panelGeo, mat);
    mesh.renderOrder = 1;

    if (variant === "jato") {
      const [x, y, z, ry, s] = JATO[i];
      mesh.position.set(x, y, z);
      mesh.rotation.y = ry;
      mesh.scale.setScalar(s);
    } else {
      const lx = (i - (clips.length - 1) / 2) * PITCH;
      mesh.position.set(lx, 0, -ARC * lx * lx);
      // Paneli stoje upravno na luk, pa traka ostaje jedna celina
      // umesto sedam tablica koje svaka za sebe gledaju u kameru.
      mesh.rotation.y = Math.atan(2 * ARC * lx);
    }

    group.add(mesh);
    panels.push({ mesh, mat, video, poster, tex: null, started: false, on: 0 });
  });

  // --- nosac trake ---
  if (variant === "traka") {
    const N = 96;
    const halfLen = ((clips.length - 1) / 2) * PITCH + PANEL_W * 0.62;
    const bandH = PANEL_H * 1.26;
    const pos = new Float32Array((N + 1) * 2 * 3);
    const uv = new Float32Array((N + 1) * 2 * 2);
    const idx: number[] = [];
    for (let i = 0; i <= N; i++) {
      const f = i / N;
      const x = -halfLen + f * halfLen * 2;
      const z = -ARC * x * x;
      pos.set([x, bandH / 2, z], i * 6);
      pos.set([x, -bandH / 2, z], i * 6 + 3);
      uv.set([f, 1], i * 4);
      uv.set([f, 0], i * 4 + 2);
      if (i < N) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const bandGeo = new THREE.BufferGeometry();
    bandGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    bandGeo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    bandGeo.setIndex(idx);
    geometries.push(bandGeo);

    const bandMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: BAND_FRAG,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: { uFrames: { value: clips.length }, uFade: { value: 1 } },
    });
    materials.push(bandMat);

    bandFade = bandMat;
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.z = -0.02;
    group.add(band);
    group.position.z = STRIP_Z;
  }

  const order: number[] = panels.map((_, i) => i);
  const world = new THREE.Vector3();
  const stripHalfLen = ((clips.length - 1) / 2) * PITCH + PANEL_W;

  const update: WorkScene["update"] = (t, camX, camZ, p, halfWAt) => {
    if (variant === "traka") {
      // Traka prolazi pored kamere tokom stanice. Put se racuna iz
      // stvarne sirine kadra, pa na telefonu izlazi iz kadra isto kao
      // na monitoru umesto da visi na ivici.
      const reach = halfWAt(STRIP_Z) + stripHalfLen;
      const pw = Math.min(Math.max((p - 0.28) / 0.66, 0), 1);
      group.position.x = reach - pw * reach * 2;
    }

    // Radovi pripadaju svojoj stanici i gase se kad se ona napusti.
    // Bez ovoga bi paneli ostali da vise nad kontaktom: kamera nikad
    // ne prodje pored njih, pa ih fade po udaljenosti ne hvata.
    const band = smoothstep(0.30, 0.46, p) * (1 - smoothstep(0.82, 0.95, p));
    if (bandFade) bandFade.uniforms.uFade.value = band;

    // Aktivan je onaj panel koji je kamera stvarno uhvatila: u jatu
    // najblizi, u traci onaj koji je usao u grlo ispred kamere.
    order.sort((a, b) => score(a) - score(b));
    function score(i: number) {
      panels[i].mesh.getWorldPosition(world);
      return variant === "traka"
        ? Math.abs(world.x - camX)
        : Math.hypot(world.x - camX, world.z - camZ);
    }

    for (let k = 0; k < panels.length; k++) {
      const panel = panels[order[k]];
      panel.mesh.getWorldPosition(world);
      const dist = Math.hypot(world.x - camX, world.z - camZ);
      const byDist =
        variant === "jato" ? Math.min(Math.max((FADE_FAR - dist) / (FADE_FAR - FADE_NEAR), 0), 1) : 1;
      const fade = byDist * band;
      panel.mat.uniforms.uFade.value = fade;

      const want = k < budget && fade > 0.15;

      if (want && !panel.started) {
        panel.started = true;
        const tex = new THREE.VideoTexture(panel.video);
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        panel.tex = tex;
        panel.video.play().then(
          () => {
            panel.mat.uniforms.uTex.value = tex;
          },
          () => {
            // Pregledac je odbio pustanje: poster ostaje, bez greske.
            panel.started = false;
            tex.dispose();
            panel.tex = null;
          }
        );
      } else if (!want && panel.started) {
        panel.video.pause();
        panel.started = false;
      } else if (want && panel.video.paused) {
        panel.video.play().catch(() => {});
      }

      const target = want && k === 0 ? 1 : want ? 0.72 : 0;
      panel.on += (target - panel.on) * 0.06;
      panel.mat.uniforms.uOn.value = panel.on;
    }

    // Mirno disanje, da scena ne izgleda zamrznuto kad se ne skroluje.
    if (variant === "jato") {
      for (let i = 0; i < panels.length; i++) {
        const [x, y, z, ry] = JATO[i];
        const m = panels[i].mesh;
        m.position.set(x + Math.sin(t * 0.21 + i) * 0.12, y + Math.sin(t * 0.33 + i * 1.7) * 0.1, z);
        m.rotation.y = ry + Math.sin(t * 0.25 + i) * 0.05;
      }
    } else {
      // Traka ide iznad sredine, da tekst dole desno ostane citljiv.
      group.position.y = 0.8 + Math.sin(t * 0.3) * 0.08;
      group.rotation.z = Math.sin(t * 0.17) * 0.012;
    }
  };

  const dispose = () => {
    for (const panel of panels) {
      panel.video.pause();
      panel.video.removeAttribute("src");
      panel.video.load();
      panel.poster.dispose();
      panel.tex?.dispose();
    }
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    group.clear();
  };

  return { group, update, dispose };
}
