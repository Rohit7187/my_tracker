import React, { useEffect, useRef } from 'react';

interface WaterShaderCanvasProps {
  waterPercentage?: number; // e.g. 48 for 48%
}

export const WaterShaderCanvas: React.FC<WaterShaderCanvasProps> = ({ waterPercentage = 48 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;

    const syncSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth || 400;
      const h = parent.clientHeight || 200;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    syncSize();

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform float u_fillLevel; // 0.0 to 1.0

      void main() {
          vec2 uv = v_texCoord;
          
          // Wave parameters
          float wave1 = sin(uv.x * 6.0 + u_time * 2.2) * 0.04;
          float wave2 = sin(uv.x * 12.0 + u_time * 3.5) * 0.025;
          float waterLevel = u_fillLevel + wave1 + wave2;
          
          // Background color (Light blue-white tint)
          vec3 color = vec3(0.96, 0.97, 1.0);
          
          // Water color (Serene Cerulean Blue)
          vec3 waterColor = vec3(0.0, 0.4, 1.0);
          
          // Smooth transition for water surface
          float mask = smoothstep(waterLevel - 0.008, waterLevel + 0.008, uv.y);
          color = mix(waterColor, color, mask);
          
          // Add subtle highlight line at the surface
          float highlight = pow(1.0 - abs(uv.y - waterLevel), 24.0) * 0.35;
          color += highlight * (1.0 - mask);
          
          gl_FragColor = vec4(color, 0.85);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrib = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uFillLevel = gl.getUniformLocation(program, 'u_fillLevel');

    const fillTarget = Math.min(Math.max(waterPercentage / 100, 0.05), 0.95);

    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uFillLevel) gl.uniform1f(uFillLevel, fillTarget);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [waterPercentage]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};
