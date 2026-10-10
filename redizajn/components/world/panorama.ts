import * as THREE from "three";

/**
 * Panorama Kalemegdana preuzima kadar na kraju spustanja.
 *
 * Snimljena je sa 62,8 m i sa nagibom gimbala od 0,1 stepena, pa joj
 * horizont lezi tacno po sredini slike. Zato se postavlja kao isecak
 * valjka oko kamere, sa sredinom na toj istoj visini: model doveze
 * kameru dotle, a dalje gleda prava fotografija.
 *
 * Model i fotografija se ne mesaju. Valjak je blizi od grada, pa dok
 * je vidljiv zaklanja ga u celosti.
 */

/** Odnos stranica snimka je 3:1. DJI ne upisuje ugao zahvata, pa je
 *  uzet uobicajeni za trored panoramu: 186 stepeni siroko, 62 visoko. */
const H_FOV = 186;
const V_FOV = 62;

/**
 * Azimut na koji gleda sredina snimka. GimbalYawDegree u fajlu nosi
 * smer prvog kadra, ne sredine sklopljene panorame, pa je ovo
 * namesteno poredjenjem sa istim mestom u 3D gradu.
 */
const BEARING = 292;

const RADIUS = 900;

const VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

const FRAG = `
uniform sampler2D uTex;
uniform float uFade;
varying vec2 vUv;
void main(){
  if (uFade < .004) discard;
  // Ivice se stapaju sa prazninom, da se ne vidi gde snimak prestaje.
  float edge = smoothstep(0., .05, vUv.x) * smoothstep(1., .95, vUv.x)
             * smoothstep(0., .06, vUv.y) * smoothstep(1., .9, vUv.y);
  vec3 c = texture2D(uTex, vUv).rgb;
  // Snimak je dnevni, a sajt nocni. Spusta se i hladi dok ne legne u
  // paletu, i dok tekst preko njega ne postane citljiv.
  c = mix(vec3(dot(c, vec3(.299, .587, .114))), c, .88) * .42;
  c += vec3(.012, .010, .030);
  // Leva strana kadra tamnija, jer tamo stoji tekst.
  c *= mix(.62, 1., smoothstep(.0, .42, vUv.x));
  gl_FragColor = vec4(c, uFade * edge);
}`;

export type Panorama = {
  mesh: THREE.Mesh;
  setFade: (v: number) => void;
  dispose: () => void;
};

export function buildPanorama(at: [number, number], y: number, mobile: boolean): Panorama {
  const tex = new THREE.TextureLoader().load(mobile ? "/beograd/pano-4k.webp" : "/beograd/pano-8k.webp");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.anisotropy = 4;

  const height = 2 * RADIUS * Math.tan(((V_FOV / 2) * Math.PI) / 180);
  const geo = new THREE.CylinderGeometry(
    RADIUS,
    RADIUS,
    height,
    160,
    1,
    true,
    0,
    (H_FOV * Math.PI) / 180
  );

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: { uTex: { value: tex }, uFade: { value: 0 } },
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(at[0], y, at[1]);
  // Teme valjka na uglu theta lezi na (r sin t, r cos t), a obrtanje za
  // fi mu sabira ugao. Pogled po azimutu B gleda u tacku na uglu
  // 180 - B, pa sredina snimka (theta = H_FOV/2) treba da padne tamo.
  mesh.rotation.y = ((180 - BEARING - H_FOV / 2) * Math.PI) / 180;
  // Panorama je pozadina: crta se pre svega providnog, inace bi
  // prekrila panele koji vise ispred nje.
  mesh.renderOrder = -1;

  return {
    mesh,
    setFade: (v) => {
      mat.uniforms.uFade.value = v;
    },
    dispose: () => {
      geo.dispose();
      mat.dispose();
      tex.dispose();
    },
  };
}
