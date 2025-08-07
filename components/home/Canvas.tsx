'use client'
import useWindowDimensions from "@/hooks/use-window-dimension";
import { useEffect, useRef } from "react";

const genCircles = (width: number, height: number, num: number) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const genRadius = () => Math.random() * 2 + 4;

  const circles: {
    x: number;
    y: number;
    col: string;
    radius: number;
  }[] = [];
  for (let i = 0; i < num; i++) {
    circles.push({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      col: colors[Math.floor(Math.random() * 5)],
      radius: genRadius(),
    });
  }
  return circles;
};

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const { width, height } = useWindowDimensions();
  const ctx = canvas?.getContext("2d");

  const drawGrid = () => {
    if (!canvas || !ctx) return;
    const dis = 30;
    const lineColor = "#333";
    for (let i = dis; i < width; i += dis) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let i = dis; i < height; i += dis) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  };
  useEffect(() => {
    drawGrid();
  }, [width, height, ctx]);

  return (
    <div className="fixed -z-10 opacity-50">
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        className="absolute top-0 left-0 w-screen h-screen bg-rosePine-base"
      ></canvas>
    </div>
  );
}
