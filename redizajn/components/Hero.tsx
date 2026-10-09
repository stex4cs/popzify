"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import styles from "./Hero.module.css";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Hero scena: stakleni P sa play trouglom u hromiranom prstenu,
 * cestice i svetlosne linije. Jedna WebGL scena po strani.
 *
 * Sve sto scena napravi skuplja se u disposables i oslobadja na unmount:
 * geometrije, materijali, teksture, composer, renderer, listeneri i rAF.
 */
export default function Hero({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const t = dict[locale].hero;
  const hud = dict[locale].hud;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060d);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    // sve sto treba osloboditi na kraju
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const track = <T extends THREE.BufferGeometry | THREE.Material>(x: T): T => {
      if (x instanceof THREE.BufferGeometry) geometries.push(x);
      else materials.push(x);
      return x;
    };

    // --- svetla koja staklo hvata ---
    const l1 = new THREE.PointLight(0x8b5cf6, 60, 20);
    l1.position.set(-4, 3, 4);
    const l2 = new THREE.PointLight(0x22d3ee, 40, 20);
    l2.position.set(4, -3, 3);
    scene.add(l1, l2);

    // --- mekani violet disk iza, da transmisija ima sta da savije ---
    const backMat = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `varying vec2 vUv; uniform float uT;
          void main(){ vec2 p=vUv-.5; float d=length(p*vec2(1.,1.1));
            float g=smoothstep(.22,0.,d)*.55 + smoothstep(.09,0.,abs(d-.12-sin(uT*.4)*.01))*.08;
            vec3 c=mix(vec3(.39,.40,.95), vec3(.66,.33,.97), smoothstep(-.2,.2,p.x+p.y));
            gl_FragColor=vec4(c*g, g); }`,
        uniforms: { uT: { value: 0 } },
      })
    );
    const back = new THREE.Mesh(track(new THREE.PlaneGeometry(30, 30)), backMat);
    back.position.z = -4;
    scene.add(back);

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // --- P sa play trouglom kao supljinom, iz SVG znaka (y obrnut) ---
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

    const pGeo = track(
      new THREE.ExtrudeGeometry(shape, {
        depth: 44,
        bevelEnabled: true,
        bevelThickness: 12,
        bevelSize: 7,
        bevelSegments: 10,
        curveSegments: 64,
      })
    );
    pGeo.center();
    pGeo.scale(0.0105, 0.0105, 0.0105);

    const glass = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xa5a6ff,
        metalness: 0,
        roughness: 0.06,
        transmission: 1,
        thickness: 1.4,
        ior: 1.45,
        iridescence: 1,
        iridescenceIOR: 1.35,
        iridescenceThicknessRange: [120, 480],
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        attenuationColor: new THREE.Color(0x6366f1),
        attenuationDistance: 1.1,
        envMapIntensity: 1.6,
        specularIntensity: 1,
      })
    );
    const P = new THREE.Mesh(pGeo, glass);
    P.position.x = -0.06;
    heroGroup.add(P);

    // --- hromirani prsten ---
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(2.24, 0.055, 48, 320)),
      track(
        new THREE.MeshPhysicalMaterial({
          color: 0xe4e2ff,
          metalness: 1,
          roughness: 0.14,
          iridescence: 0.8,
          iridescenceIOR: 1.6,
          clearcoat: 1,
          envMapIntensity: 2.2,
        })
      )
    );
    const ring2 = new THREE.Mesh(
      track(new THREE.TorusGeometry(2.42, 0.008, 12, 320)),
      track(new THREE.MeshBasicMaterial({ color: 0x8b8cff, transparent: true, opacity: 0.35 }))
    );
    heroGroup.add(ring, ring2);

    // --- cestice ---
    const N = mobile ? 900 : 2200;
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    const col = new Float32Array(N * 3);
    const palette = [0xb9a6ff, 0xffffff, 0x8b8cff, 0x67e8f9, 0xd8b4fe].map((c) => new THREE.Color(c));
    for (let i = 0; i < N; i++) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const r = 2.4 + Math.pow(Math.random(), 0.7) * 4.5;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r * (Math.random() < 0.65 ? 1 : 0.55) + side * Math.random() * 0.6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
      seed[i] = Math.random();
      const c = palette[(Math.random() * palette.length) | 0];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const ptsGeo = track(new THREE.BufferGeometry());
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    ptsGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    ptsGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    const ptsMat = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uT: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uMouse: { value: new THREE.Vector2() } },
        vertexShader: `attribute float aSeed; attribute vec3 aColor; uniform float uT, uPR; uniform vec2 uMouse;
          varying vec3 vC; varying float vA;
          void main(){ vec3 p=position;
            p.y = mod(p.y + uT*(.12+aSeed*.25) + 4.5, 9.) - 4.5;
            p.x += sin(uT*.6 + aSeed*30.)*.12; p.xy += uMouse*(.25+aSeed*.5);
            vec4 mv = modelViewMatrix*vec4(p,1.);
            float big = step(.985, aSeed);
            gl_PointSize = (mix(2.5, 9., aSeed*aSeed) + big*14.) * uPR * (6./-mv.z);
            vA = (.35 + .65*abs(sin(uT*(.6+aSeed*2.) + aSeed*40.))) * smoothstep(4.5, 3., abs(p.y));
            vC = aColor; gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vC; varying float vA;
          void main(){ vec2 c=gl_PointCoord-.5; float d=length(c);
            float disc = smoothstep(.5,.38,d); float core = smoothstep(.22,0.,d);
            float a = (disc*.55 + core*.8) * vA; if(a<.01) discard;
            gl_FragColor = vec4(vC*(.8+core), a); }`,
      })
    );
    const points = new THREE.Points(ptsGeo, ptsMat);
    scene.add(points);

    // --- svetlosne linije ---
    const streaks = new THREE.Group();
    streaks.rotation.z = -0.62;
    scene.add(streaks);
    const streakMat = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uT: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `varying vec2 vUv; void main(){
            float head = pow(vUv.y, 6.); float edge = smoothstep(.5,0.,abs(vUv.x-.5));
            vec3 c = mix(vec3(.75,.55,1.), vec3(1.,.92,.85), head);
            gl_FragColor = vec4(c, (head*1.2 + vUv.y*.25) * edge); }`,
      })
    );
    const SN = mobile ? 6 : 12;
    const streakData: { m: THREE.Mesh; x: number; y: number; v: number; z: number }[] = [];
    for (let i = 0; i < SN; i++) {
      const g = track(new THREE.PlaneGeometry(0.018 + Math.random() * 0.02, 1.8 + Math.random() * 2.2));
      const m = new THREE.Mesh(g, streakMat);
      streakData.push({ m, x: 1.2 + Math.random() * 1.6, y: Math.random() * 14 - 7, v: 1.4 + Math.random() * 2.2, z: Math.random() * 1.5 - 0.3 });
      streaks.add(m);
    }

    // --- post ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.55, 0.2);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const resize = () => {
      const w = window.innerWidth,
        h = window.innerHeight,
        asp = w / h;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);
      camera.aspect = asp;
      camera.position.z = asp < 1 ? 10.5 / Math.max(asp, 0.5) : 10.5;
      heroGroup.position.y = asp < 1 ? 0.9 : 0.25;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    const target = new THREE.Vector2(),
      cur = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove);

    const pad = (n: number) => String(n).padStart(2, "0");
    const clock = new THREE.Clock();
    let raf = 0;
    let lastFrame = -1;

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime * (reduce ? 0.25 : 1);
      cur.lerp(target, 0.05);

      const intro = 1 - Math.pow(1 - Math.min(clock.elapsedTime / 2.2, 1), 3);
      heroGroup.scale.setScalar(0.72 + 0.28 * intro);
      heroGroup.rotation.y = cur.x * 0.45 + Math.sin(t * 0.35) * 0.22 + (1 - intro) * -1.2;
      heroGroup.rotation.x = -cur.y * 0.3 + Math.sin(t * 0.27) * 0.06;
      ring.rotation.x = Math.sin(t * 0.5) * 0.12 + (1 - intro) * 1.4;
      ring.rotation.y = Math.cos(t * 0.4) * 0.1;
      ring2.rotation.set(Math.sin(t * 0.3) * 0.3, Math.cos(t * 0.25) * 0.3, t * 0.1);
      P.position.y = Math.sin(t * 0.8) * 0.05;

      ptsMat.uniforms.uT.value = t;
      ptsMat.uniforms.uMouse.value.copy(cur);
      backMat.uniforms.uT.value = t;
      for (const d of streakData) {
        d.y += d.v * dt * (reduce ? 0.25 : 1);
        if (d.y > 7) {
          d.y = -7;
          d.x = 1.2 + Math.random() * 1.6;
        }
        d.m.position.set(d.x + cur.x * 0.3, d.y, d.z);
      }

      // timecode na 24 fps; DOM se dira samo kad se kadar promeni
      const f = Math.floor(clock.elapsedTime * 24);
      if (f !== lastFrame && tcRef.current) {
        lastFrame = f;
        tcRef.current.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(
          Math.floor(f / 24) % 60
        )}:${pad(f % 24)}`;
      }

      composer.render();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className={styles.hero}>
      <canvas
        ref={canvasRef}
        className={styles.stage}
        aria-label={
          locale === "sr"
            ? "Stakleni Popzify znak koji rotira, u hromiranom prstenu, sa česticama svetla"
            : "Rotating glass Popzify mark in a chrome ring, with drifting light particles"
        }
      />

      <div className={styles.hud}>
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />

        <div className={styles.top}>
          <div className={styles.brand}>
            <b>Pop</b>zify
          </div>
          <div className={`${styles.rec} mono`}>
            <span className={styles.dot} />
            <span>{hud.rec}</span>
            <span ref={tcRef}>00:00:00:00</span>
          </div>
        </div>

        <div />

        <div className={styles.bottom}>
          <div className={styles.headline}>
            <h1 className="display">
              {t.headlineBefore} <em className="outline">{t.headlineAccent}</em>
              {t.headlineAfter && ` ${t.headlineAfter}`}
            </h1>
            <p className="lead">{t.sub}</p>
          </div>
          <div className={`${styles.meta} mono`}>
            <span>{hud.format}</span>
            <span>{hud.lens}</span>
            <span>{hud.geo}</span>
          </div>
        </div>

        <div className={`${styles.hint} mono`}>{t.hint}</div>
      </div>
    </section>
  );
}
