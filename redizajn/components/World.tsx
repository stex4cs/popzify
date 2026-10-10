"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { stations, PANORAMA_Y } from "@/lib/stations";
import { loadCity, type City } from "./world/grad";
import { buildPanorama } from "./world/panorama";
import { buildAerials } from "./world/vazduh";
import { buildMontaza } from "./world/montaza";
import { getVariant, subscribeVariant } from "@/lib/variant";
import { buildWork, type WorkScene } from "./world/work";
import styles from "./World.module.css";

/**
 * Jedan neprekidan svet. Canvas stoji fiksiran preko celog ekrana, a
 * scroll spusta kameru iz svemira do ispod Beograda. Nema zasebnih
 * scena po sekciji: sve sto se vidi zivi u ovoj jednoj sceni.
 *
 * Scena je u pravim metrima. Zbog toga kamera moze da stane na visinu
 * sa koje je snimak iz drona stvarno nastao, a zgrade iz OpenStreetMap-a
 * ulaze sa svojim visinama bez preracunavanja.
 *
 * Svet je podeljen na dva sloja. Svemir — znak, zvezde i komete — visi
 * o kameri i putuje sa njom, pa se gasi kako se spustamo. Zemlja stoji
 * u svetu, na svom mestu, i pojavljuje se kad udjemo u atmosferu.
 *
 * Tekst nije ovde nego u HTML sloju iznad, da ostane ostar i citljiv.
 * Sve sto scena napravi skuplja se i oslobadja na unmount.
 */
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: "high-performance" });
    } catch {
      // Stari uredjaj, blokiran GPU ili pukao drajver: scena se preskace.
      // Bez ovoga bi bacena greska oborila celu stranu zajedno sa tekstom.
      canvas.dataset.fallback = "1";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060d);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Daljina mora da pokrije devet kilometara visine i pet kilometara
    // grada. Blizina je na dva metra jer je najblize sto se crta znak,
    // koji visi jedanaest metara ispred kamere.
    const camera = new THREE.PerspectiveCamera(32, 1, 2, 32000);
    camera.rotation.order = "YXZ";
    scene.add(camera);

    /** Sve sto pripada svemiru visi o kameri i putuje sa njom. */
    const space = new THREE.Group();
    camera.add(space);

    const gradStation = stations.find((st) => st.id === "grad")!;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const track = <T extends THREE.BufferGeometry | THREE.Material>(x: T): T => {
      if (x instanceof THREE.BufferGeometry) geometries.push(x);
      else materials.push(x);
      return x;
    };

    // --- violet disk iza znaka ---
    const backMat = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `varying vec2 vUv; uniform float uT; uniform float uHit;
          void main(){ vec2 p=vUv-.5; float d=length(p*vec2(1.,1.1));
            float g=smoothstep(.22,0.,d)*.55 + smoothstep(.09,0.,abs(d-.12-sin(uT*.4)*.01))*.08;
            // Udarni talas od klika: prsten koji se siri i gasi.
            float r = mix(.09, .36, 1.-uHit);
            g += smoothstep(.04, 0., abs(d-r)) * uHit * .9;
            vec3 c=mix(vec3(.39,.40,.95), vec3(.66,.33,.97), smoothstep(-.2,.2,p.x+p.y));
            gl_FragColor=vec4(c*g, g); }`,
        uniforms: { uT: { value: 0 }, uHit: { value: 0 } },
      })
    );
    // --- znak: P sa play trouglom, u hromiranom prstenu ---
    const mark = new THREE.Group();
    space.add(mark);

    const back = new THREE.Mesh(track(new THREE.PlaneGeometry(30, 30)), backMat);
    back.position.z = -4;
    mark.add(back);

    // Svetla putuju sa znakom. Da stoje na pocetku hodnika, staklo bi
    // posivelo cim se znak udalji.
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

    const pGeo = track(
      new THREE.ExtrudeGeometry(shape, {
        depth: 44,
        bevelEnabled: true,
        bevelThickness: 12,
        bevelSize: 7,
        bevelSegments: 10,
        curveSegments: mobile ? 32 : 64,
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
    mark.add(P);

    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(2.24, 0.055, 32, mobile ? 160 : 320)),
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
      track(new THREE.TorusGeometry(2.42, 0.008, 12, mobile ? 160 : 320)),
      track(new THREE.MeshBasicMaterial({ color: 0x8b8cff, transparent: true, opacity: 0.35 }))
    );
    mark.add(ring, ring2);

    // --- cestice kroz ceo hodnik, ne samo oko znaka ---
    const Z_NEAR = -8;
    const Z_FAR = -170;
    const DEPTH = Z_NEAR - Z_FAR;
    const N = mobile ? 1100 : 3200;
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    const col = new Float32Array(N * 3);
    const palette = [0xb9a6ff, 0xffffff, 0x8b8cff, 0x67e8f9, 0xd8b4fe].map((c) => new THREE.Color(c));
    for (let i = 0; i < N; i++) {
      const r = 7 + Math.pow(Math.random(), 0.6) * 62;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.75 + (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = Z_FAR + Math.random() * DEPTH;
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
        uniforms: {
          uT: { value: 0 },
          uPR: { value: renderer.getPixelRatio() },
          uFade: { value: 1 },
          uMouse: { value: new THREE.Vector2() },
        },
        vertexShader: `attribute float aSeed; attribute vec3 aColor; uniform float uT, uPR, uFade; uniform vec2 uMouse;
          varying vec3 vC; varying float vA;
          void main(){ vec3 p=position;
            p.y += sin(uT*(.25+aSeed*.4) + aSeed*40.)*2.2;
            p.x += cos(uT*(.2+aSeed*.3) + aSeed*30.)*1.6;
            p.xy += uMouse*(2.+aSeed*4.);
            vec4 mv = modelViewMatrix*vec4(p,1.);
            float big = step(.988, aSeed);
            gl_PointSize = (mix(2.2, 8., aSeed*aSeed) + big*13.) * uPR * (46./max(-mv.z,.001));
            vA = (.3 + .7*abs(sin(uT*(.5+aSeed*1.8) + aSeed*40.))) * uFade;
            vC = aColor; gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vC; varying float vA;
          void main(){ vec2 c=gl_PointCoord-.5; float d=length(c);
            float disc = smoothstep(.5,.38,d); float core = smoothstep(.22,0.,d);
            float a = (disc*.55 + core*.8) * vA; if(a<.01) discard;
            gl_FragColor = vec4(vC*(.8+core), a); }`,
      })
    );
    space.add(new THREE.Points(ptsGeo, ptsMat));

    // --- svetlosne linije ---
    const streaks = new THREE.Group();
    streaks.rotation.z = -0.62;
    streaks.position.z = -34;
    streaks.scale.setScalar(4);
    space.add(streaks);
    const streakMat = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `varying vec2 vUv; uniform float uFade; void main(){
            float head = pow(vUv.y, 6.); float edge = smoothstep(.5,0.,abs(vUv.x-.5));
            vec3 c = mix(vec3(.75,.55,1.), vec3(1.,.92,.85), head);
            gl_FragColor = vec4(c, (head*.58 + vUv.y*.11) * edge * uFade); }`,
        uniforms: { uFade: { value: 1 } },
      })
    );
    const SN = mobile ? 14 : 28;
    /** Gde kometa upada u kadar. Sira staza i brzi let znace da ih kroz
     *  kadar prodje vise, a da ih u jednom trenutku i dalje nema gomila. */
    const streakX = () => -0.6 + Math.random() * 4.2;
    const streakData: { m: THREE.Mesh; x: number; y: number; v: number; z: number }[] = [];
    for (let i = 0; i < SN; i++) {
      const g = track(new THREE.PlaneGeometry(0.016 + Math.random() * 0.022, 1.6 + Math.random() * 2.4));
      const m = new THREE.Mesh(g, streakMat);
      streakData.push({
        m,
        x: streakX(),
        y: Math.random() * 15 - 7.5,
        v: 2.6 + Math.random() * 4.4,
        z: Math.random() * 1.8 - 0.4,
      });
      streaks.add(m);
    }

    // --- radovi ---
    // Paneli vise nad Kalemegdanom, na visini sa koje je panorama
    // snimljena, trideset metara ispred kamere na toj stanici.
    const place = (g: THREE.Object3D) => {
      const bearing = (gradStation.yaw * Math.PI) / 180;
      g.position.set(
        gradStation.at[0] + Math.sin(bearing) * 18,
        PANORAMA_Y,
        gradStation.at[1] - Math.cos(bearing) * 18
      );
      g.rotation.y = -bearing;
    };

    // Snimci iz drona stoje na svojim visinama, u krugu koji lezi u
    // pravcu u koji kamera gleda sa stanice "vazduh". Krug ne ide po
    // putanji spustanja jer kamera tokom pada ne gleda tamo kuda ide.
    const vazduhStation = stations.find((st) => st.id === "vazduh")!;
    const vb = (vazduhStation.yaw * Math.PI) / 180;
    const aerials = buildAerials(
      [vazduhStation.at[0] + Math.sin(vb) * 400, vazduhStation.at[1] - Math.cos(vb) * 400],
      mobile
    );
    scene.add(aerials.group);

    // Poslednja stanica: montaza ispod kote grada.
    const ispodStation = stations.find((st) => st.id === "ispod")!;
    const montaza = buildMontaza();
    {
      const b = (ispodStation.yaw * Math.PI) / 180;
      montaza.group.position.set(
        ispodStation.at[0] + Math.sin(b) * 130,
        ispodStation.y - 46,
        ispodStation.at[1] - Math.cos(b) * 130
      );
      montaza.group.rotation.y = -b;
    }
    scene.add(montaza.group);

    let work: WorkScene = buildWork(getVariant(), mobile);
    place(work.group);
    scene.add(work.group);
    const unsubscribe = subscribeVariant((v) => {
      scene.remove(work.group);
      work.dispose();
      work = buildWork(v, mobile);
      place(work.group);
      scene.add(work.group);
    });

    // --- post ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.62, 0.52, 0.45);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    let markPush = 1; // uspravni kadar: znak dalje od kamere da stane u sirinu
    let markLift = 0; // uspravni kadar: znak malo vise, da tekst dole dise
    const resize = () => {
      const w = window.innerWidth,
        h = window.innerHeight,
        asp = w / h;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);
      camera.aspect = asp;
      markPush = asp < 1 ? 1 / Math.max(asp, 0.5) : 1;
      markLift = asp < 1 ? 0.22 : 0;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    const target = new THREE.Vector2(),
      cur = new THREE.Vector2();

    /**
     * Znak se hvata i vrti misem. Pogodak se racuna u pikselima na
     * ekranu umesto raycastom, jer je iznad platna sloj sa tekstom pa
     * do canvasa ne stize nijedan dogadjaj — slusa se ceo prozor.
     *
     * Na dodir se ne hvata: tamo prst sluzi za skrol i otimanje poteza
     * bi pokvarilo stranu.
     */
    const markScreen = { x: 0, y: 0, r: 0 };
    const spin = { x: 0, y: 0, vx: 0, vy: 0 };
    const drag = { on: false, id: -1, px: 0, py: 0, t: 0, moved: 0 };
    let hover = false;
    let hit = 0;

    const overMark = (e: PointerEvent) =>
      Math.hypot(e.clientX - markScreen.x, e.clientY - markScreen.y) < markScreen.r * 1.05;

    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));

      if (drag.on && e.pointerId === drag.id) {
        const step = Math.max((e.timeStamp - drag.t) / 1000, 1 / 240);
        const dx = e.clientX - drag.px;
        const dy = e.clientY - drag.py;
        drag.px = e.clientX;
        drag.py = e.clientY;
        drag.t = e.timeStamp;
        drag.moved += Math.abs(dx) + Math.abs(dy);

        const ay = dx * 0.006;
        const ax = dy * 0.004;
        spin.y += ay;
        spin.x += ax;
        // Zamah se pamti u radijanima u sekundi, da let posle pustanja
        // ne zavisi od toga koliko kadrova uredjaj stigne da nacrta.
        spin.vy = Math.max(Math.min(ay / step, 12), -12);
        spin.vx = Math.max(Math.min(ax / step, 8), -8);
        return;
      }

      const now = e.pointerType !== "touch" && overMark(e);
      if (now !== hover) {
        hover = now;
        document.body.style.cursor = now ? "grab" : "";
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !overMark(e)) return;
      drag.on = true;
      drag.id = e.pointerId;
      drag.px = e.clientX;
      drag.py = e.clientY;
      drag.t = e.timeStamp;
      drag.moved = 0;
      spin.vx = 0;
      spin.vy = 0;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      e.preventDefault();
    };

    const onUp = (e: PointerEvent) => {
      if (!drag.on || e.pointerId !== drag.id) return;
      drag.on = false;
      document.body.style.cursor = hover ? "grab" : "";
      document.body.style.userSelect = "";
      // Kratak potez bez pomeranja je klik: znak odgovori udarom.
      if (drag.moved < 6) {
        hit = 1;
        spin.vy += 4;
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    /**
     * Udeo skrola se preslika na deonicu izmedju dve stanice, pa se
     * kamera i znak interpoliraju po istom faktoru. Smoothstep da
     * prelaz nema odskok na granici deonice.
     */
    const seg = { i: 0, f: 0 };
    const locate = (p: number) => {
      const n = stations.length - 1;
      const x = Math.min(Math.max(p, 0), 1) * n;
      const i = Math.min(Math.floor(x), n - 1);
      const f = x - i;
      seg.i = i;
      seg.f = f * f * (3 - 2 * f);
    };
    const screenA = new THREE.Vector3();
    const screenB = new THREE.Vector3();

    /** Pola kadra na zadatom rastojanju od kamere. */
    const halfHAt = (dist: number) => Math.tan((camera.fov * Math.PI) / 360) * dist;
    const halfWAt = (dist: number) => halfHAt(dist) * camera.aspect;

    /** Vrednost na deonici izmedju dve stanice. */
    const lerpSeg = (ka: number, kb: number, f: number) => ka + (kb - ka) * f;

    /**
     * Grad se ucitava u pozadini i ulazi u scenu kad stigne. Dok traje,
     * svemir radi normalno — nista ne ceka na njega.
     */
    // Panorama stoji na visini sa koje je snimljena i pali se tek kad
    // joj se kamera priblizi; dotle je grad taj koji se vidi.
    const pano = buildPanorama(gradStation.at, PANORAMA_Y, mobile);
    scene.add(pano.mesh);

    let city: City | null = null;
    const cityAbort = new AbortController();
    loadCity(cityAbort.signal).then(
      (c) => {
        city = c;
        c.setFade(0);
        scene.add(c.group);
      },
      () => {
        // Bez grada ostaje svemir; spustanje i dalje radi.
      }
    );

    // Kontekst moze da se izgubi i kasnije (uspavani GPU, prebacivanje karte).
    // Tada se petlja zaustavlja i ostaje mirna pozadina, bez praznog ekrana.
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.dataset.fallback = "1";
    };
    canvas.addEventListener("webglcontextlost", onLost);

    const clock = new THREE.Clock();
    let raf = 0;
    let smoothed = 0;

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime * (reduce ? 0.25 : 1);

      // Glacanje ide po vremenu, ne po kadru. Sa korakom po kadru bi na
      // slabijem uredjaju kamera vidno kaskala za skrolom.
      cur.lerp(target, 1 - Math.exp(-3 * dt));

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      smoothed += (p - smoothed) * (1 - Math.exp(-5 * dt));

      const intro = 1 - Math.pow(1 - Math.min(clock.elapsedTime / 2.2, 1), 3);

      locate(smoothed);
      const a = stations[seg.i];
      const b = stations[seg.i + 1];

      // Visina se interpolira geometrijski: izmedju devet kilometara i
      // sezdeset metara linearni korak bi pola puta proveo u svemiru.
      const ya = a.y + 60;
      const yb = b.y + 60;
      const alt = ya * Math.pow(yb / ya, seg.f) - 60;

      camera.position.set(
        lerpSeg(a.at[0], b.at[0], seg.f) + cur.x * 6,
        alt + cur.y * 3,
        lerpSeg(a.at[1], b.at[1], seg.f)
      );
      camera.rotation.x = (lerpSeg(a.pitch, b.pitch, seg.f) * Math.PI) / 180 - cur.y * 0.05;
      // yaw je azimut po busoli (0 sever, raste na istok), a rotacija
      // oko Y u sceni raste na zapad — otuda minus.
      camera.rotation.y = (-lerpSeg(a.yaw, b.yaw, seg.f) * Math.PI) / 180 + cur.x * 0.08;

      // Znak visi o kameri: x i y su udeo kadra, treci broj rastojanje.
      const markD = lerpSeg(a.mark[2], b.mark[2], seg.f) * markPush;
      const halfH = halfHAt(markD);
      const halfW = halfH * camera.aspect;
      mark.position.set(
        lerpSeg(a.mark[0], b.mark[0], seg.f) * halfW,
        (lerpSeg(a.mark[1], b.mark[1], seg.f) + markLift) * halfH + Math.sin(t * 0.8) * 0.05,
        -markD
      );

      // Svemir se gasi kako ulazimo u atmosferu, grad se pali.
      const spaceFade = smoothstep(500, 3200, alt);
      // Model se vidi izmedju atmosfere i sto desetog metra. Iznad ga
      // jos nema, ispod ga smenjuje fotografija — prelaz je kratak, na
      // osamdeset metara visine, da se ne gledaju oboje u istom kadru.
      const cityFade = (1 - smoothstep(3800, 8200, alt)) * smoothstep(110, 190, alt);
      const entry = smoothstep(600, 2000, alt) * (1 - smoothstep(4200, 7000, alt));
      ptsMat.uniforms.uFade.value = spaceFade;
      streakMat.uniforms.uFade.value = entry;
      // Fotografija je tacno dopuna modelu: koliko jedan izadje, toliko
      // drugi udje. Ispod kote se i ona gasi, tamo je mrak.
      const panoFade = (1 - smoothstep(110, 190, alt)) * smoothstep(-20, 8, alt);
      pano.setFade(panoFade);
      if (city) {
        city.setFade(cityFade);
        city.tick(t);
      }
      // Rastojanje se meri od stvarne kamere; ranije su isle nule, pa
      // je svaki panel ispadao petsto metara daleko i gasio se.
      work.update(t, camera.position, smoothed, (z) => halfWAt(18 - z));

      // Snimci se vide u pojasu visina na kojima i stoje.
      // Pojas se zatvara pre nego sto panorama preuzme, da se dnevni
      // snimci i fotografija Kalemegdana ne poklope u istom kadru.
      aerials.update(camera, smoothstep(72, 155, alt) * (1 - smoothstep(300, 520, alt)));

      // Montaza se otvara tek kad se prodje kota; iznad nje nema sta.
      montaza.update(t, 1 - smoothstep(-16, 26, alt));

      // Polozaj i poluprecnik znaka u pikselima, da pokazivac zna gde je.
      camera.updateMatrixWorld();
      screenA.copy(mark.position).applyMatrix4(camera.matrixWorld).project(camera);
      screenB
        .set(mark.position.x + 2.42 * mark.scale.x, mark.position.y, mark.position.z)
        .applyMatrix4(camera.matrixWorld)
        .project(camera);
      markScreen.x = (screenA.x * 0.5 + 0.5) * window.innerWidth;
      markScreen.y = (0.5 - screenA.y * 0.5) * window.innerHeight;
      markScreen.r = (Math.abs(screenB.x - screenA.x) * 0.5) * window.innerWidth;

      if (!drag.on) {
        spin.y += spin.vy * dt;
        spin.x += spin.vx * dt;
        const damp = Math.pow(0.025, dt);
        spin.vx *= damp;
        spin.vy *= damp;
        // Dok leti, znak se vrti slobodno. Kad zamah splasne, seda na
        // najblizi pun obrtaj — inace bi se smirio okrenut nalicjem i
        // P bi se citalo unazad.
        const TAU = Math.PI * 2;
        const pull = Math.abs(spin.vy) < 0.4 ? 2.8 : 0.25;
        spin.y += (Math.round(spin.y / TAU) * TAU - spin.y) * (1 - Math.exp(-pull * dt));
        spin.x *= Math.exp(-2 * dt);
      }
      spin.x = Math.max(Math.min(spin.x, 0.7), -0.7);

      hit *= Math.exp(-2.6 * dt);
      if (hit < 0.004) hit = 0;
      backMat.uniforms.uHit.value = hit;

      const grabbed = drag.on || hover ? 1 : 0;
      mark.scale.setScalar((0.72 + 0.28 * intro) * (1 + hit * 0.05 + grabbed * 0.02));
      mark.rotation.y = spin.y + cur.x * 0.35 + Math.sin(t * 0.35) * 0.22 + (1 - intro) * -1.2;
      mark.rotation.x = spin.x - cur.y * 0.22 + Math.sin(t * 0.27) * 0.06;
      ring.rotation.x = Math.sin(t * 0.5) * 0.12 + (1 - intro) * 1.4;
      ring.rotation.y = Math.cos(t * 0.4) * 0.1;
      ring2.rotation.set(Math.sin(t * 0.3) * 0.3, Math.cos(t * 0.25) * 0.3, t * 0.1);
      ring2.scale.setScalar(1 + hit * 0.16);
      (ring2.material as THREE.MeshBasicMaterial).opacity = 0.35 + hit * 0.5;

      ptsMat.uniforms.uT.value = t;
      ptsMat.uniforms.uMouse.value.copy(cur);
      backMat.uniforms.uT.value = t;

      for (const d of streakData) {
        d.y += d.v * dt * (reduce ? 0.25 : 1);
        if (d.y > 7.5) {
          d.y = -7.5 - Math.random() * 3;
          d.x = streakX();
          d.v = 2.6 + Math.random() * 4.4;
          d.z = Math.random() * 1.8 - 0.4;
        }
        d.m.position.set(d.x + cur.x * 0.3, d.y, d.z);
      }

      composer.render();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      cityAbort.abort();
      city?.dispose();
      pano.dispose();
      aerials.dispose();
      montaza.dispose();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.userSelect = "";
      canvas.removeEventListener("webglcontextlost", onLost);
      unsubscribe();
      work.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.stage} aria-hidden="true" />;
}
