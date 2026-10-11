"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import styles from "./radovi.module.css";

/**
 * Laka scena iza strana sa radovima.
 *
 * Isti jezik kao pocetna — stakleni znak, hromirani prsten, zvezde i
 * komete — ali bez grada, panorame i video panela. Te strane se otvaraju
 * da bi se citale, pa ne smeju da vuku dvanaest megabajta materijala;
 * ovde nema nijednog dodatnog fajla, samo geometrija.
 *
 * Skrol polako okrece znak i pomera zvezde, da strana ne bude mrtva.
 */
export default function Pozadina3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: "low-power" });
    } catch {
      // Bez WebGL-a strana ostaje citljiva, samo bez scene.
      canvas.dataset.fallback = "1";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060d);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 400);
    camera.position.z = 13;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const t = <T extends THREE.BufferGeometry | THREE.Material>(x: T): T => {
      if (x instanceof THREE.BufferGeometry) geos.push(x);
      else mats.push(x);
      return x;
    };

    // --- znak ---
    const mark = new THREE.Group();
    scene.add(mark);

    const l1 = new THREE.PointLight(0x8b5cf6, 60, 24);
    l1.position.set(-4, 3, 4);
    const l2 = new THREE.PointLight(0x22d3ee, 40, 24);
    l2.position.set(4, -3, 3);
    mark.add(l1, l2);

    const shape = new THREE.Shape();
    shape.moveTo(190, -136);
    shape.lineTo(276, -136);
    shape.absarc(276, -224, 88, Math.PI / 2, -Math.PI / 2, true);
    shape.lineTo(246, -312);
    shape.lineTo(246, -370);
    shape.quadraticCurveTo(246, -380, 236, -380);
    shape.lineTo(190, -380);
    shape.quadraticCurveTo(180, -380, 180, -370);
    shape.lineTo(180, -146);
    shape.quadraticCurveTo(180, -136, 190, -136);
    const tri = new THREE.Path();
    tri.moveTo(248, -186);
    tri.lineTo(312, -224);
    tri.lineTo(248, -262);
    tri.lineTo(248, -186);
    shape.holes.push(tri);

    const pGeo = t(
      new THREE.ExtrudeGeometry(shape, {
        depth: 44,
        bevelEnabled: true,
        bevelThickness: 12,
        bevelSize: 7,
        bevelSegments: 8,
        curveSegments: mobile ? 24 : 48,
      })
    );
    pGeo.center();
    pGeo.scale(0.0105, 0.0105, 0.0105);

    const P = new THREE.Mesh(
      pGeo,
      t(
        new THREE.MeshPhysicalMaterial({
          color: 0xa5a6ff,
          roughness: 0.06,
          transmission: 1,
          thickness: 1.4,
          ior: 1.45,
          iridescence: 1,
          iridescenceIOR: 1.35,
          clearcoat: 1,
          attenuationColor: new THREE.Color(0x6366f1),
          attenuationDistance: 1.1,
          envMapIntensity: 1.6,
        })
      )
    );
    const ring = new THREE.Mesh(
      t(new THREE.TorusGeometry(2.24, 0.055, 24, mobile ? 120 : 240)),
      t(
        new THREE.MeshPhysicalMaterial({
          color: 0xe4e2ff,
          metalness: 1,
          roughness: 0.14,
          iridescence: 0.8,
          clearcoat: 1,
          envMapIntensity: 2.2,
        })
      )
    );
    mark.add(P, ring);

    // --- zvezde ---
    const N = mobile ? 700 : 1800;
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = 6 + Math.pow(Math.random(), 0.6) * 44;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.8;
      pos[i * 3 + 2] = -110 + Math.random() * 115;
      seed[i] = Math.random();
    }
    const ptsGeo = t(new THREE.BufferGeometry());
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    ptsGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const ptsMat = t(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uT: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: `attribute float aSeed; uniform float uT, uPR; varying float vA;
          void main(){ vec3 p = position;
            p.y += sin(uT * (.2 + aSeed * .3) + aSeed * 40.) * 1.4;
            vec4 mv = modelViewMatrix * vec4(p, 1.);
            gl_PointSize = (1.6 + aSeed * aSeed * 6.) * uPR * (34. / max(-mv.z, .001));
            vA = .25 + .75 * abs(sin(uT * (.5 + aSeed * 1.8) + aSeed * 60.));
            gl_Position = projectionMatrix * mv; }`,
        fragmentShader: `varying float vA;
          void main(){ vec2 c = gl_PointCoord - .5; float d = length(c);
            float disc = smoothstep(.5, .36, d), core = smoothstep(.2, .0, d);
            float a = (disc * .45 + core * .85) * vA; if (a < .01) discard;
            gl_FragColor = vec4(vec3(.74, .72, 1.) * (.8 + core), a); }`,
      })
    );
    scene.add(new THREE.Points(ptsGeo, ptsMat));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.45));
    composer.addPass(new OutputPass());

    const resize = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      camera.aspect = w / h;
      // Znak stoji desno gore na sirokom, a gore na uspravnom ekranu.
      const asp = camera.aspect;
      mark.position.set(asp < 1 ? 0 : 3.6, asp < 1 ? 3.4 : 1.9, 0);
      mark.scale.setScalar(asp < 1 ? 0.55 : 0.64);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    const cilj = new THREE.Vector2();
    const sad = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      cilj.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.dataset.fallback = "1";
    };
    canvas.addEventListener("webglcontextlost", onLost);

    const clock = new THREE.Clock();
    let raf = 0;
    let skrol = 0;

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const vreme = clock.elapsedTime * (reduce ? 0.25 : 1);
      sad.lerp(cilj, 1 - Math.exp(-3 * dt));

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      skrol += (p - skrol) * (1 - Math.exp(-5 * dt));

      // Skrol okrece znak i uvlaci zvezde; strana se krece dok se cita.
      mark.rotation.y = sad.x * 0.3 + Math.sin(vreme * 0.3) * 0.22 + skrol * 2.4;
      mark.rotation.x = -sad.y * 0.2 + Math.sin(vreme * 0.24) * 0.06;
      ring.rotation.x = Math.sin(vreme * 0.5) * 0.12;
      ring.rotation.y = Math.cos(vreme * 0.4) * 0.1;

      camera.position.x = sad.x * 0.5;
      camera.position.y = sad.y * 0.3;
      camera.position.z = 13 - skrol * 5;
      camera.lookAt(0, 0, -6);

      ptsMat.uniforms.uT.value = vreme;
      composer.render();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.scena} aria-hidden="true" />;
}
