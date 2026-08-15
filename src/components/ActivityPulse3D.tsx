import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ActivityPulse3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create a stylized wireframe icosahedron sphere representing activity pulse
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const pulseMesh = new THREE.Mesh(geometry, material);
    scene.add(pulseMesh);

    // Inner glowing core
    const innerGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0xdae1ff,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerCore);

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x80a0ff, 0.6));

    camera.position.z = 4.2;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0015;
      pulseMesh.rotation.x = time * 0.4;
      pulseMesh.rotation.y = time * 0.3;

      innerCore.rotation.x = -time * 0.6;
      innerCore.rotation.y = -time * 0.5;

      const scale = 1 + Math.sin(time * 2.5) * 0.12;
      pulseMesh.scale.set(scale, scale, scale);

      const innerScale = 0.9 + Math.cos(time * 2.5) * 0.08;
      innerCore.scale.set(innerScale, innerScale, innerScale);

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ minHeight: '220px' }}
    />
  );
};
