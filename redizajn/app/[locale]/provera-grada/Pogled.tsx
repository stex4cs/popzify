"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { loadCity, type City } from "@/components/world/grad";

export default function Pogled() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07060d);
    const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);

    const q = new URLSearchParams(window.location.search);
    const alt = Number(q.get("v") || 1400);
    const yaw = Number(q.get("yaw") || 0) * (Math.PI / 180);
    const dist = Number(q.get("d") || 0);
    cam.position.set(Math.sin(yaw) * dist, alt, Math.cos(yaw) * dist);
    cam.lookAt(0, 0, 0);

    let city: City | null = null;
    let raf = 0;
    const clock = new THREE.Clock();
    loadCity().then((c) => {
      city = c;
      scene.add(c.group);
      const tick = () => {
        c.tick(clock.getElapsedTime());
        renderer.render(scene, cam);
        raf = requestAnimationFrame(tick);
      };
      tick();
    });

    return () => {
      cancelAnimationFrame(raf);
      city?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%" }} />;
}
