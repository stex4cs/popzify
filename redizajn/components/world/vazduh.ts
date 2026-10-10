import * as THREE from "three";
import { aerials, AERIAL_RATIO } from "@/lib/vazduh";

/**
 * Snimci iz drona okaceni na svoje stvarne visine.
 *
 * Visina i azimut nisu izmisljeni nego procitani iz samih fajlova
 * (RelativeAltitude i GimbalYawDegree iz DJI zapisa). Svaki snimak
 * stoji na visini na kojoj je nastao, u pravcu u koji je kamera
 * gledala, pa se kroz njih prolazi silazeci sa 420 na 62,8 metara.
 *
 * GPS je pri obradi skinut, pa vodoravno mesto nije poznato; snimci se
 * zato rasporedjuju u krug oko putanje, a ne na tacnu tacku.
 */

const W = 40; // sirina panela u metrima
const R = 180; // poluprecnik kruga
/** Koliko snimaka sme da bude u punoj velicini. Ostali stoje na sitnoj. */
const SHARP = 3;

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
varying vec2 vUv;

float sdBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.) + length(max(q, 0.)) - r;
}
vec3 toLinear(vec3 c){
  return mix(c / 12.92, pow((c + .055) / 1.055, vec3(2.4)), step(vec3(.04045), c));
}

void main(){
  vec2 half_ = vec2(${AERIAL_RATIO.toFixed(4)}, 1.) * .5;
  vec2 p = (vUv - .5) * vec2(${AERIAL_RATIO.toFixed(4)}, 1.);
  float d = sdBox(p, half_, .055);
  float inside = smoothstep(.004, -.004, d) * uFade;
  if (inside < .01) discard;

  vec3 col = toLinear(texture2D(uTex, vUv).rgb);
  // Snimci su dnevni, sajt nocni: spustaju se i hlade kao i panorama.
  col = mix(vec3(dot(col, vec3(.299, .587, .114))), col, .9) * mix(.34, .62, uOn);

  float edge = smoothstep(.01, 0., abs(d + .004));
  col += edge * mix(.10, .34, uOn) * toLinear(vec3(.74, .72, 1.));
  gl_FragColor = vec4(col, inside);
}`;

export type Aerials = {
  group: THREE.Group;
  update: (camera: THREE.Camera, fade: number) => void;
  dispose: () => void;
};

/**
 * @param center  oko koje tacke stoji krug snimaka (x, z u metrima)
 */
export function buildAerials(center: [number, number], mobile: boolean): Aerials {
  const group = new THREE.Group();
  const geo = new THREE.PlaneGeometry(W, W / AERIAL_RATIO);
  const loader = new THREE.TextureLoader();

  type Slot = {
    mesh: THREE.Mesh;
    mat: THREE.ShaderMaterial;
    small: THREE.Texture;
    big: THREE.Texture | null;
  };
  const slots: Slot[] = [];

  aerials.forEach((a) => {
    const small = loader.load(`/beograd/${a.file}-mali.webp`);
    small.minFilter = THREE.LinearFilter;
    small.generateMipmaps = false;

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: { uTex: { value: small }, uFade: { value: 0 }, uOn: { value: 0 } },
    });

    // Azimut je po busoli: 0 sever, raste na istok. Snimak stoji u
    // pravcu u koji je kamera gledala i okrenut je nazad ka putanji.
    const b = (a.yaw * Math.PI) / 180;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(center[0] + Math.sin(b) * R, a.alt, center[1] - Math.cos(b) * R);
    mesh.rotation.y = b + Math.PI;
    mesh.renderOrder = 1;

    group.add(mesh);
    slots.push({ mesh, mat, small, big: null });
  });

  const world = new THREE.Vector3();
  const order = slots.map((_, i) => i);

  const update: Aerials["update"] = (camera, fade) => {
    if (fade < 0.01) {
      for (const s of slots) s.mat.uniforms.uFade.value = 0;
      return;
    }

    order.sort((i, j) => dist(i) - dist(j));
    function dist(i: number) {
      slots[i].mesh.getWorldPosition(world);
      return world.distanceTo(camera.position);
    }

    order.forEach((idx, rank) => {
      const s = slots[idx];
      s.mat.uniforms.uFade.value = fade;
      const near = rank < SHARP;
      s.mat.uniforms.uOn.value = near ? 1 : 0.35;

      // Puna velicina se dovlaci samo za ono sto je blizu. Sitne verzije
      // su svih osamnaest zajedno lakse od jedne pune.
      if (near && !s.big) {
        const file = aerials[idx].file;
        s.big = loader.load(`/beograd/${file}.webp`, (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          s.mat.uniforms.uTex.value = tex;
        });
      }
    });
  };

  const dispose = () => {
    geo.dispose();
    for (const s of slots) {
      s.mat.dispose();
      s.small.dispose();
      s.big?.dispose();
    }
    group.clear();
  };

  return { group, update, dispose };
}
