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
 * Scena iza strana sa radovima.
 *
 * Znak putuje kroz sredinu kadra dok se skroluje i usput se pretvara:
 * P, torus cvor, kristal, kocka, prsten. Oko njega zvezde i komete.
 *
 * Laka je namerno — nema grada, panorame ni video panela, i ne vuce
 * nijedan dodatni fajl, samo geometriju. Te strane se otvaraju da bi
 * se citale.
 *
 * Pretvaranje nije morf temena nego smena oblika preko uvecanja: oblici
 * nemaju isti broj temena pa pravi morf izmedju njih ne postoji. Jedan
 * raste dok drugi nestaje, uz obrtaj, pa se cita kao pretvaranje.
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
    camera.position.z = 14.5;

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

    const glass = t(
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
        envMapIntensity: 1.2,
      })
    );

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

    const d = mobile ? 0.82 : 1;
    const oblici: THREE.Mesh[] = [
      new THREE.Mesh(pGeo, glass),
      new THREE.Mesh(t(new THREE.TorusKnotGeometry(1.35, 0.42, mobile ? 90 : 170, mobile ? 12 : 22)), glass),
      new THREE.Mesh(t(new THREE.IcosahedronGeometry(2.05, 0)), glass),
      new THREE.Mesh(t(new THREE.BoxGeometry(2.6, 2.6, 2.6, 2, 2, 2)), glass),
      new THREE.Mesh(t(new THREE.TorusGeometry(1.8, 0.52, mobile ? 14 : 22, mobile ? 70 : 130)), glass),
    ];
    for (const o of oblici) {
      o.scale.setScalar(0);
      mark.add(o);
    }

    // Prsten prati znak kroz sve oblike; on je ono sto ostaje isto.
    const ring = new THREE.Mesh(
      t(new THREE.TorusGeometry(2.5, 0.05, 20, mobile ? 120 : 230)),
      t(
        new THREE.MeshPhysicalMaterial({
          color: 0xe4e2ff,
          metalness: 1,
          roughness: 0.14,
          iridescence: 0.8,
          clearcoat: 1,
          envMapIntensity: 0.9,
        })
      )
    );
    mark.add(ring);

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
          void main(){ vec2 c = gl_PointCoord - .5; float dd = length(c);
            float disc = smoothstep(.5, .36, dd), core = smoothstep(.2, .0, dd);
            float a = (disc * .45 + core * .85) * vA; if (a < .01) discard;
            gl_FragColor = vec4(vec3(.74, .72, 1.) * (.8 + core), a); }`,
      })
    );
    scene.add(new THREE.Points(ptsGeo, ptsMat));

    // --- komete ---
    const streaks = new THREE.Group();
    streaks.rotation.z = -0.62;
    streaks.position.z = -26;
    // Komete se ne razmeravaju grupom, nego su odmah u metrima scene,
    // da pojas u kome se radjaju pokriva upravo kadar.
    scene.add(streaks);
    const streakMat = t(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
        fragmentShader: `varying vec2 vUv; void main(){
          float head = pow(vUv.y, 6.); float edge = smoothstep(.5, 0., abs(vUv.x - .5));
          vec3 c = mix(vec3(.75, .55, 1.), vec3(1., .92, .85), head);
          gl_FragColor = vec4(c, (head * .58 + vUv.y * .11) * edge); }`,
      })
    );
    const SN = mobile ? 10 : 20;
    const kometaX = () => -19 + Math.random() * 34;
    const komete: { m: THREE.Mesh; x: number; y: number; v: number; z: number }[] = [];
    for (let i = 0; i < SN; i++) {
      const g = t(new THREE.PlaneGeometry(0.05 + Math.random() * 0.08, 5 + Math.random() * 9));
      const m = new THREE.Mesh(g, streakMat);
      komete.push({
        m,
        x: kometaX(),
        y: Math.random() * 38 - 19,
        v: 5 + Math.random() * 7,
        z: Math.random() * 6 - 3,
      });
      streaks.add(m);
    }

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.55, 0.72));
    composer.addPass(new OutputPass());

    let visinaKadra = 7;
    const resize = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Koliko znak sme da prevali gore-dole da ostane u kadru.
      visinaKadra = Math.tan((camera.fov * Math.PI) / 360) * 14.5;
      mark.scale.setScalar(d * (camera.aspect < 1 ? 0.52 : 0.68));
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
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      skrol += (p - skrol) * (1 - Math.exp(-5 * dt));

      // Znak ide kroz sredinu kadra: na vrhu strane stoji tacno iznad
      // kadra, na dnu tacno ispod, pa ceo prelaz pripada skrolu.
      mark.position.set(sad.x * 0.6, (0.5 - skrol) * visinaKadra * 2.9 + sad.y * 0.3, 0);
      mark.rotation.y = sad.x * 0.3 + Math.sin(vreme * 0.3) * 0.2 + skrol * 5.2;
      mark.rotation.x = -sad.y * 0.2 + Math.sin(vreme * 0.24) * 0.06;

      ring.rotation.x = Math.sin(vreme * 0.5) * 0.14 + skrol * 1.4;
      ring.rotation.y = Math.cos(vreme * 0.4) * 0.12;

      // Smena oblika: deonice se broje po delu puta na kome je znak zaista
      // u kadru, ne po celom skrolu — inace bi prvi oblik (P) i poslednji
      // pali dok znak jos stoji iznad odnosno ispod kadra.
      const put = Math.min(Math.max((skrol - 0.1) / 0.8, 0), 1);
      const x = put * (oblici.length - 1);
      for (let i = 0; i < oblici.length; i++) {
        const blizina = 1 - Math.min(Math.abs(x - i), 1);
        const zeljeno = blizina * blizina * (3 - 2 * blizina);
        const o = oblici[i];
        const s = o.scale.x + (zeljeno - o.scale.x) * (1 - Math.exp(-9 * dt));
        o.scale.setScalar(s);
        o.rotation.y = vreme * 0.25 + i;
        o.rotation.x = vreme * 0.17 + i * 0.6;
        o.visible = s > 0.004;
      }

      for (const k of komete) {
        k.y += k.v * dt * (reduce ? 0.25 : 1);
        if (k.y > 19) {
          k.y = -19 - Math.random() * 7;
          k.x = kometaX();
          k.v = 5 + Math.random() * 7;
        }
        k.m.position.set(k.x + sad.x * 1.2, k.y, k.z);
      }

      camera.position.x = sad.x * 0.5;
      camera.position.y = sad.y * 0.3;
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
