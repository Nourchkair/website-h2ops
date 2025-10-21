// src/components/ui/Orb.tsx
'use client';
import React, { useEffect, useRef, memo } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';
import './Orb.css';

function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}: {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}) {
  const ctnDom = useRef<HTMLDivElement | null>(null);

  // Keep latest props without triggering a re-init
  const hueRef = useRef(hue);
  const hoverIntRef = useRef(hoverIntensity);
  const rotateOnHoverRef = useRef(rotateOnHover);
  const forceHoverRef = useRef(forceHoverState);
  useEffect(() => { hueRef.current = hue; }, [hue]);
  useEffect(() => { hoverIntRef.current = hoverIntensity; }, [hoverIntensity]);
  useEffect(() => { rotateOnHoverRef.current = rotateOnHover; }, [rotateOnHover]);
  useEffect(() => { forceHoverRef.current = forceHoverState; }, [forceHoverState]);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position,0.0,1.0); }
  `;

  const frag = /* glsl */ `
    precision highp float;
    uniform float iTime; uniform vec3 iResolution; uniform float hue;
    uniform float hover; uniform float rot; uniform float hoverIntensity;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c){ float y=dot(c,vec3(0.299,0.587,0.114));
      float i=dot(c,vec3(0.596,-0.274,-0.322));
      float q=dot(c,vec3(0.211,-0.523,0.312)); return vec3(y,i,q); }
    vec3 yiq2rgb(vec3 c){ float r=c.x+0.956*c.y+0.621*c.z;
      float g=c.x-0.272*c.y-0.647*c.z; float b=c.x-1.106*c.y+1.703*c.z;
      return vec3(r,g,b); }
    vec3 adjustHue(vec3 color,float h){ float a=h*3.14159265/180.0;
      vec3 q=rgb2yiq(color); float c=cos(a), s=sin(a);
      float I=q.y*c - q.z*s; float Q=q.y*s + q.z*c;
      q.y=I; q.z=Q; return yiq2rgb(q); }
    vec3 hash33(vec3 p){ p=fract(p*vec3(0.1031,0.11369,0.13787));
      p+=dot(p,p.yxz+19.19); return -1.0 + 2.0*fract(vec3(p.x+p.y,p.x+p.z,p.y+p.z)*p.zyx); }
    float snoise3(vec3 p){ const float K1=.333333333, K2=.166666667;
      vec3 i=floor(p+(p.x+p.y+p.z)*K1);
      vec3 d0=p-(i-(i.x+i.y+i.z)*K2);
      vec3 e=step(vec3(0.), d0-d0.yzx);
      vec3 i1=e*(1.-e.zxy); vec3 i2=1.-e.zxy*(1.-e);
      vec3 d1=d0-(i1-K2), d2=d0-(i2-K1), d3=d0-.5;
      vec4 h=max(0.6-vec4(dot(d0,d0),dot(d1,d1),dot(d2,d2),dot(d3,d3)),0.);
      vec4 n=h*h*h*h*vec4(dot(d0,hash33(i)),dot(d1,hash33(i+i1)),dot(d2,hash33(i+i2)),dot(d3,hash33(i+1.)));
      return dot(vec4(31.316), n);
    }
    vec4 extractAlpha(vec3 c){ float a=max(max(c.r,c.g),c.b); return vec4(c/(a+1e-5), a); }

    const vec3 base1=vec3(0.611765,0.262745,0.996078);
    const vec3 base2=vec3(0.298039,0.760784,0.913725);
    const vec3 base3=vec3(0.062745,0.078431,0.600000);
    const float innerR=0.6; const float noiseS=0.65;

    float l1(float I,float A,float d){ return I/(1.0 + d*A); }
    float l2(float I,float A,float d){ return I/(1.0 + d*d*A); }

    vec4 draw(vec2 uv){
      vec3 c1=adjustHue(base1,hue), c2=adjustHue(base2,hue), c3=adjustHue(base3,hue);
      float ang=atan(uv.y,uv.x); float len=length(uv); float inv = len>0.0 ? 1.0/len : 0.0;
      float n0=snoise3(vec3(uv*noiseS, iTime*0.5))*0.5+0.5;
      float r0=mix(mix(innerR,1.0,0.4), mix(innerR,1.0,0.6), n0);
      float d0=distance(uv,(r0*inv)*uv);
      float v0=l1(1.0,10.0,d0)*smoothstep(r0*1.05,r0,len);
      float a=iTime*-1.0; vec2 pos=vec2(cos(a),sin(a))*r0;
      float d=distance(uv,pos);
      float v1=l2(1.5,5.0,d)*l1(1.0,50.0,d0);
      float v2=smoothstep(1.0, mix(innerR,1.0, n0*0.5), len);
      float v3=smoothstep(innerR, mix(innerR,1.0,0.5), len);
      vec3 col=mix(c1,c2,cos(ang+iTime*2.0)*0.5+0.5);
      col=mix(c3,col,v0); col=(col+v1)*v2*v3; col=clamp(col,0.0,1.0);
      return extractAlpha(col);
    }

    vec4 mainImage(vec2 frag){
      vec2 center=iResolution.xy*0.5;
      float size=min(iResolution.x,iResolution.y);
      vec2 uv=(frag-center)/size*2.0;
      float s=sin(rot), c=cos(rot);
      uv=vec2(c*uv.x - s*uv.y, s*uv.x + c*uv.y);
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y*10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x*10.0 + iTime);
      return draw(uv);
    }

    void main(){
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  // Initialize ONCE; read latest props via refs each frame
  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hue: { value: hueRef.current },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntRef.current },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height); // DPR handled internally
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let targetHover = 0;
    let lastTime = 0;
    let currentRot = 0;
    const rotationSpeed = 0.3;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.min(rect.width, rect.height);
      const uvx = ((x - rect.width / 2) / size) * 2.0;
      const uvy = ((y - rect.height / 2) / size) * 2.0;
      targetHover = Math.sqrt(uvx * uvx + uvy * uvy) < 0.8 ? 1 : 0;
    };
    const onLeave = () => { targetHover = 0; };
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;

      // Read latest props via refs — no re-init
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hueRef.current;
      program.uniforms.hoverIntensity.value = hoverIntRef.current;

      const effectiveHover = forceHoverRef.current ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHoverRef.current && effectiveHover > 0.5) {
        currentRot += dt * rotationSpeed;
      }
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // IMPORTANT: empty deps → no re-inits on hover/prop change
  }, []); // <-- init once

  return <div ref={ctnDom} className="orb-container" />;
}

export default memo(Orb);
