import * as THREE from "three";

/**
 * Stanica ispod kote: montaza.
 *
 * Gore je snimanje, dole je ono sto se sa snimljenim radi. Zato je
 * poslednja stanica vremenska linija u mraku — trake sa isecima, rez
 * po rez, i glava koja stoji na mestu dok materijal klizi kroz nju.
 *
 * Linija stoji daleko i prigusena: ona je pozadina kontaktu, ne
 * takmac tekstu preko nje.
 */

const TRACKS = 6;
const TRACK_H = 1.3;
const TRACK_GAP = 2.2;
const SPAN = 260; // duzina vremenske linije u metrima

const VERT = `
varying vec2 vUv;
varying float vX;
void main(){
  vUv = uv;
  vX = position.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

/**
 * Jedna traka je jedna ravan; iseci se crtaju u shaderu umesto da svaki
 * bude svoj objekat. Cetiri trake su tako cetiri poziva, ne osamdeset.
 */
const TRACK_FRAG = `
uniform float uT;
uniform float uFade;
uniform float uSeed;
uniform float uSpeed;
varying vec2 vUv;
varying float vX;

float hash(float n){ return fract(sin(n * 127.1 + uSeed) * 43758.5453); }

void main(){
  if (uFade < .01) discard;

  // Materijal klizi kroz glavu; glava stoji.
  float x = vUv.x * 34. - uT * uSpeed;
  float cell = floor(x);
  float f = fract(x);

  // Rez izmedju iseaka: tanak procep.
  float gap = smoothstep(0., .012, f) * smoothstep(1., .988, f);
  if (gap < .02) discard;

  float lit = hash(cell);
  vec3 col = mix(vec3(.014, .013, .030), vec3(.032, .026, .068), lit);
  // Poneki isecak je "izabran" i svetli jace.
  col += step(.88, lit) * vec3(.026, .019, .062);

  // Sitne crte u isecku, kao talasni oblik.
  float wave = step(.5, fract(f * 26. + lit * 7.)) * (1. - abs(vUv.y - .5) * 1.4);
  col += wave * .012;

  // Glava: svetla uspravna crta na sredini kadra trake.
  float head = smoothstep(.22, 0., abs(vX));
  col += head * vec3(.11, .10, .23);

  gl_FragColor = vec4(col * gap, uFade);
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
        uSpeed: { value: 0.42 - i * 0.07 },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, -i * TRACK_GAP, -i * 5);
    geos.push(geo);
    mats.push(mat);
    group.add(mesh);
  }

  return {
    group,
    update: (t, fade) => {
      for (const m of mats) {
        m.uniforms.uFade.value = fade;
        if (m.uniforms.uT) m.uniforms.uT.value = t;
      }
    },
    dispose: () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      group.clear();
    },
  };
}
