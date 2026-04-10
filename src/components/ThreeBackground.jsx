import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setFallback(true);
      return undefined;
    }

    const getVarColor = (name, fallback) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      if (!raw) {
        return new THREE.Color(fallback);
      }
      return new THREE.Color(`rgb(${raw})`);
    };

    const createCardTexture = (title, value) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return new THREE.Texture(canvas);
      }
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(180, 160, 255, 0.35)";
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);
      ctx.fillStyle = "rgba(60, 54, 90, 0.9)";
      ctx.font = "600 32px 'Libre Baskerville', serif";
      ctx.fillText(title, 36, 86);
      ctx.font = "700 54px 'EB Garamond', serif";
      ctx.fillText(value, 36, 160);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power"
      });
    } catch (error) {
      setFallback(true);
      return undefined;
    }
    renderer.setPixelRatio(1);
    renderer.setSize(mount.clientWidth || window.innerWidth, mount.clientHeight || window.innerHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const accent = getVarColor("--accent", 0xa58cff);
    const accentTwo = getVarColor("--accent-2", 0x86b6ff);
    const ink = getVarColor("--ink", 0x1e1c2e);

    const materialPrimary = new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 0.55,
      roughness: 0.3,
      emissive: accent,
      emissiveIntensity: 0.2
    });
    const materialSecondary = new THREE.MeshStandardMaterial({
      color: accentTwo,
      metalness: 0.4,
      roughness: 0.35,
      emissive: accentTwo,
      emissiveIntensity: 0.12
    });
    const materialInk = new THREE.MeshStandardMaterial({
      color: ink,
      metalness: 0.2,
      roughness: 0.55
    });

    const items = [];

    const particles = new THREE.BufferGeometry();
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = -6 - Math.random() * 10;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: accentTwo,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particleField = new THREE.Points(particles, particleMaterial);
    scene.add(particleField);

    const iconGroup = new THREE.Group();
    group.add(iconGroup);

    const foodBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.6), materialPrimary);
    foodBox.position.set(2.6, 1.2, -2.2);
    iconGroup.add(foodBox);
    items.push({ mesh: foodBox, baseY: 1.2, speed: 0.8, rot: 0.006 });

    const clothesFold = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.5), materialSecondary);
    clothesFold.position.set(-2.4, 1.4, -2.4);
    iconGroup.add(clothesFold);
    items.push({ mesh: clothesFold, baseY: 1.4, speed: 0.7, rot: -0.004 });

    const coinGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32);
    const coin = new THREE.Mesh(coinGeometry, materialSecondary);
    coin.rotation.x = Math.PI / 2;
    coin.position.set(2.2, -0.8, -1.6);
    iconGroup.add(coin);
    items.push({ mesh: coin, baseY: -0.8, speed: 1.1, rot: 0.01 });

    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.25);
    heartShape.bezierCurveTo(0, 0.25, -0.4, -0.2, -0.8, 0.1);
    heartShape.bezierCurveTo(-1.2, 0.4, -0.9, 1.1, 0, 1.4);
    heartShape.bezierCurveTo(0.9, 1.1, 1.2, 0.4, 0.8, 0.1);
    heartShape.bezierCurveTo(0.4, -0.2, 0, 0.25, 0, 0.25);
    const heartGeometry = new THREE.ShapeGeometry(heartShape);
    const heart = new THREE.Mesh(heartGeometry, materialPrimary);
    heart.scale.set(0.4, 0.4, 0.4);
    heart.position.set(-1.6, -0.4, -1.4);
    iconGroup.add(heart);
    items.push({ mesh: heart, baseY: -0.4, speed: 0.9, rot: 0.008 });

    const cardTextureA = createCardTexture("Active pledges", "312");
    const cardTextureB = createCardTexture("NGOs live", "48");
    const cardMaterialA = new THREE.MeshStandardMaterial({
      map: cardTextureA,
      transparent: true,
      metalness: 0.1,
      roughness: 0.4
    });
    const cardMaterialB = new THREE.MeshStandardMaterial({
      map: cardTextureB,
      transparent: true,
      metalness: 0.1,
      roughness: 0.4
    });
    const cardGeometry = new THREE.PlaneGeometry(3, 1.6);
    const cardA = new THREE.Mesh(cardGeometry, cardMaterialA);
    cardA.position.set(-1.2, 2.2, -3.6);
    cardA.rotation.y = 0.3;
    group.add(cardA);
    items.push({ mesh: cardA, baseY: 2.2, speed: 0.4, rot: 0.001 });

    const cardB = new THREE.Mesh(cardGeometry, cardMaterialB);
    cardB.position.set(2.4, 2.1, -3.4);
    cardB.rotation.y = -0.3;
    group.add(cardB);
    items.push({ mesh: cardB, baseY: 2.1, speed: 0.35, rot: -0.001 });

    const wavePoints = 120;
    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(wavePoints * 3);
    for (let i = 0; i < wavePoints; i += 1) {
      const x = (i / (wavePoints - 1)) * 8 - 4;
      wavePositions[i * 3] = x;
      wavePositions[i * 3 + 1] = -2.4;
      wavePositions[i * 3 + 2] = -4.5;
    }
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    const waveMaterial = new THREE.LineBasicMaterial({ color: accentTwo, transparent: true, opacity: 0.4 });
    const waveLine = new THREE.Line(waveGeometry, waveMaterial);
    scene.add(waveLine);

    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(5, 6, 8);
    scene.add(light);

    const fill = new THREE.PointLight(0xffffff, 0.6);
    fill.position.set(-6, -3, 6);
    scene.add(fill);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    let frameId;
    let running = true;

    const animate = () => {
      if (!running) {
        return;
      }
      const time = performance.now() * 0.001;
      items.forEach((item, index) => {
        item.mesh.position.y = item.baseY + Math.sin(time * item.speed + index) * 0.25;
        item.mesh.rotation.y += item.rot;
        item.mesh.rotation.x += item.rot * 0.6;
      });
      const wavePositionsAttr = waveGeometry.getAttribute("position");
      for (let i = 0; i < wavePoints; i += 1) {
        const x = wavePositionsAttr.getX(i);
        wavePositionsAttr.setY(i, -2.4 + Math.sin(time * 1.4 + x) * 0.25);
      }
      wavePositionsAttr.needsUpdate = true;

      group.rotation.y += 0.001;
      particleField.rotation.y -= 0.0008;
      try {
        renderer.render(scene, camera);
      } catch (error) {
        setFallback(true);
        running = false;
        return;
      }
      frameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (!mount) {
        return;
      }
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        animate();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    animate();

    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frameId);
      boxGeometry.dispose();
      clothesFold.geometry.dispose();
      coinGeometry.dispose();
      heartGeometry.dispose();
      cardGeometry.dispose();
      waveGeometry.dispose();
      particles.dispose();
      materialPrimary.dispose();
      materialSecondary.dispose();
      materialInk.dispose();
      cardMaterialA.dispose();
      cardMaterialB.dispose();
      particleMaterial.dispose();
      waveMaterial.dispose();
      cardTextureA.dispose();
      cardTextureB.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="three-bg" ref={mountRef} aria-hidden="true">
      {fallback ? <div className="three-fallback" /> : null}
    </div>
  );
}
