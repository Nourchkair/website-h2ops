"use client";
import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import "./Particles.css";

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

type Props = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  /** 0..1 intensity of how far the cloud can travel across the screen */
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
};

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1, // 0..1 (how much of the screen it can traverse)
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // smoothed mouse (NDC: -1..1)
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const mouseRef = useRef({ x: 0, y: 0 });

  // world size at camera distance (computed on resize)
  const worldSizeRef = useRef({ width: 1, height: 1 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true, premultipliedAlpha: true });
    const gl = renderer.gl;

    // make sure canvas fills and never blocks clicks
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";

    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });

      // compute world-space width/height at current camera Z
      const fovRad = (camera.fov * Math.PI) / 180;
      const worldHeight = 2 * camera.position.z * Math.tan(fovRad / 2);
      const worldWidth = worldHeight * (width / height);
      worldSizeRef.current = { width: worldWidth, height: worldHeight };
    };

    window.addEventListener("resize", resize);
    resize();

    // Listen on window so wrapper can stay pointer-events:none
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        targetRef.current.active = false;
        return;
      }
      targetRef.current.active = true;
      targetRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
      targetRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // -1..1
    };

    if (moveParticlesOnHover) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col as any, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      const dt = t - last;
      last = t;
      elapsed += dt * speed;
      program.uniforms.uTime.value = elapsed * 0.001;

      // ease mouse for smoother motion
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.15;

      if (moveParticlesOnHover && targetRef.current.active) {
        // Map NDC to a fraction of world size (so it’s visible at your FOV)
        const intensity = Math.max(0, Math.min(1, particleHoverFactor));
        const maxX = (worldSizeRef.current.width * 0.25) * intensity;   // up to 25% of screen width
        const maxY = (worldSizeRef.current.height * 0.25) * intensity;  // up to 25% of screen height
        particles.position.x = -mouseRef.current.x * maxX;
        particles.position.y = -mouseRef.current.y * maxY;
      } else {
        // glide back to center when not active
        particles.position.x *= 0.92;
        particles.position.y *= 0.92;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return <div ref={containerRef} className={`particles-container ${className ?? ""}`} />;
}
