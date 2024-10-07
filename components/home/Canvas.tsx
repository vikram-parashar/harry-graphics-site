'use client'
import useWindowDimensions from "@/hooks/useWindowDimension";
import { useEffect, useRef } from "react";

const genCircles = (width: number, height: number, num: number) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const genRadius = () => Math.random() * 2 + 4;

  const circles = [];
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
  const { width, height } = useWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  const circlesCount = width > 768 ? 50 : 20;
  const circles = genCircles(width, height, circlesCount);

  const drawGrid = () => {
    if (!canvas || !ctx) return;
    const dis = 200;
    const lineColor = "#26233a";
    for (let i = dis; i < width; i += dis) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    }
    for (let i = dis; i < height; i += dis) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    }
  };

  const drawCircles = () => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    for (let i = 0; i < circlesCount; i++) {
      ctx.beginPath();
      ctx.arc(
        circles[i].x,
        circles[i].y,
        circles[i].radius,
        0,
        Math.PI * 2,
        false,
      );
      ctx.fillStyle = circles[i].col;
      ctx.fill();
    }
  };

  const drawWeb = (e: MouseEvent) => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, width, height);
    drawCircles();
    const mouse = {
      x: e.clientX,
      y: e.clientY,
    };

    for (let i = 0; i < circlesCount; i++) {
      const distance =
        (mouse.x - circles[i].x) ** 2 + (mouse.y - circles[i].y) ** 2;
      if (distance < 70000) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(circles[i].x, circles[i].y);
        ctx.strokeStyle = circles[i].col;
        ctx.stroke();
      }
    }
  };

  const removeWeb = () => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, width, height);
    drawCircles();
  };

  useEffect(() => {
    drawCircles();
    // draw lines on desktop only
    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", drawWeb);
      document.addEventListener("mouseout", removeWeb);
      console.log("Canvas mounted");
      return () => {
        document.removeEventListener("mousemove", drawWeb);
        document.removeEventListener("mouseout", removeWeb);
      };
    }
  });

  return (
    <div className="fixed -z-10">
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        className="absolute top-0 left-0 w-screen h-screen bg-rosePine-base"
      ></canvas>
    </div>
  );
}
