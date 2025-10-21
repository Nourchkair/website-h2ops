declare module "ogl" {
  export class Renderer {
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    constructor(opts?: any);
    setSize(w: number, h: number): void;
  }
  export class Camera {
    position: { set: (x: number, y: number, z: number) => void };
    constructor(gl: any, opts?: any);
    perspective(opts: any): void;
  }
  export class Geometry { constructor(gl: any, attrs: any); }
  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(gl: any, opts: any);
  }
  export class Mesh {
    position: any;
    rotation: any;
    constructor(gl: any, opts: any);
  }
}
