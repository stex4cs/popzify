import * as THREE from "three";
import { clips, CLIP_RATIO } from "@/lib/work";

/**
 * Stanica Radovi: sedam panela razbacanih nad Kalemegdanom, kroz koje
 * kamera prolazi.
 *
 * Video se pusta samo tamo gde se gleda. Ostali paneli stoje na poster
 * kadru, pa prvi prikaz kosta sedam sitnih slika umesto sedam snimaka.
 */

/** Visina panela u metrima: ekran od sedam metara nad tvrdjavom. */
const PANEL_H = 7;
const PANEL_W = PANEL_H * CLIP_RATIO;

/** Koliko snimaka sme da radi istovremeno. Dekodovanje je skupo. */
const BUDGET_DESKTOP = 3;
const BUDGET_MOBILE = 1;

/**
 * Raspored panela: udeo polovine kadra po x, metri po y i z, zaokret
 * oko Y i uvecanje. Rucno rasporedjeno, ne nasumicno.
 *
 * x nije u metrima nego udeo polovine kadra na toj dubini — isto kao
 * kod znaka. Na uspravnom ekranu je kadar skoro tri puta uzi, pa bi
 * fiksni metri gurnuli bliske panele van kadra a daleke na sredinu,
 * tacno preko teksta.
 *
 * Tezina je na desnoj strani jer tekst stanice stoji levo.
 */
const JATO: [frameX: number, y: number, z: number, ry: number, scale: number][] = [
  [0.84, 3.5, -14, -0.34, 1.0],
  [-0.15, -5.5, -24, 0.22, 1.0],
  [0.6, -2, -34, -0.3, 1.1],
  [-0.16, 5, -46, 0.24, 1.1],
  [0.33, 0.5, -58, -0.28, 1.0],
  [-0.09, -4, -72, 0.2, 0.95],
  [0.18, 4, -86, -0.22, 0.9],
];

/**
 * Panel se pojavljuje kad mu se kamera priblizi i gasi u daljini.
 * Brojevi su u metrima scene.
 */
const FADE_NEAR = 26;
const FADE_FAR = 145;

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
  // Aktivan panel ne ide do pune vrednosti: na svetlom kadru bi ga
  // bloom razlio u belo preko fotografije iza njega.
  col *= mix(.4, .72, uOn);

  float edge = smoothstep(.009, 0., abs(d + .004));
  col += edge * mix(.14, .40, uOn) * toLinear(vec3(.74, .72, 1.));

  gl_FragColor = vec4(col, inside);
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
  update: (t: number, cam: THREE.Vector3, p: number, halfWAt: (dist: number) => number) => void;
  dispose: () => void;
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export function buildWork(mobile: boolean): WorkScene {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const panels: Panel[] = [];
  const loader = new THREE.TextureLoader();
  const budget = mobile ? BUDGET_MOBILE : BUDGET_DESKTOP;
  /**
   * Uspravan kadar je skoro tri puta uzi a visi: panel iste visine
   * pokrije pola ekrana. Zato su na telefonu manji i spusteni ispod
   * teksta, koji tamo stoji u gornjoj polovini.
   */
  const scaleK = mobile ? 0.62 : 1;
  const yPomak = mobile ? -7 : 0;

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

    const [, y, z, ry, scale] = JATO[i];
    // x se racuna svakog kadra, jer zavisi od odnosa stranica.
    mesh.position.set(0, y * scaleK + yPomak, z);
    mesh.rotation.y = ry;
    mesh.scale.setScalar(scale * scaleK);

    group.add(mesh);
    panels.push({ mesh, mat, video, poster, tex: null, started: false, on: 0 });
  });

  const order: number[] = panels.map((_, i) => i);
  const world = new THREE.Vector3();

  let lastT = 0;
  const dtOf = () => Math.min(Math.max(nowT - lastT, 0), 0.08);
  let nowT = 0;

  const update: WorkScene["update"] = (t, cam, p, halfWAt) => {
    nowT = t;

    // Radovi pripadaju svojoj stanici i gase se kad se ona napusti.
    // Bez ovoga bi paneli ostali da vise nad kontaktom: kamera nikad
    // ne prodje pored njih, pa ih fade po udaljenosti ne hvata.
    const band = smoothstep(0.56, 0.7, p) * (1 - smoothstep(0.88, 0.98, p));

    // Aktivan je onaj panel koji je kamera najblize uhvatila.
    order.sort((a, b) => score(a) - score(b));
    function score(i: number) {
      panels[i].mesh.getWorldPosition(world);
      return world.distanceTo(cam);
    }

    for (let k = 0; k < panels.length; k++) {
      const panel = panels[order[k]];
      panel.mesh.getWorldPosition(world);
      const dist = world.distanceTo(cam);
      const byDist = Math.min(Math.max((FADE_FAR - dist) / (FADE_FAR - FADE_NEAR), 0), 1);
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
      // Po vremenu, ne po kadru: na sporijem uredjaju bi se paneli
      // palili vidno kasnije nego sto se do njih stigne.
      panel.on += (target - panel.on) * (1 - Math.exp(-3.5 * dtOf()));
      panel.mat.uniforms.uOn.value = panel.on;
    }

    lastT = t;

    // Polozaj po x i mirno disanje, da scena ne izgleda zamrznuto.
    for (let i = 0; i < panels.length; i++) {
      const [fx, y, z, ry] = JATO[i];
      const m = panels[i].mesh;
      // Grupa stoji osamnaest metara ispred kamere, pa je dubina panela
      // u odnosu na kameru 18 - z.
      const x = fx * halfWAt(18 - z);
      m.position.set(
        x + Math.sin(t * 0.21 + i) * 0.5,
        y * scaleK + yPomak + Math.sin(t * 0.33 + i * 1.7) * 0.4,
        z
      );
      m.rotation.y = ry + Math.sin(t * 0.25 + i) * 0.05;
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
