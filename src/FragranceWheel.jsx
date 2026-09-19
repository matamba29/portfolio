import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { fragranceFamilies, globalConnections } from './data.js';

export const FragranceWheel = ({ onHoverFamily }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredFamilyState, setHoveredFamilyState] = useState(null);

  const isPlayingRef = useRef(isPlaying);
  const hoveredFamilyRef = useRef(hoveredFamilyState);
  const rotationRef = useRef(0);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    hoveredFamilyRef.current = hoveredFamilyState;
    if (onHoverFamily) onHoverFamily(hoveredFamilyState);
  }, [hoveredFamilyState, onHoverFamily]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let ctx;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      console.error('Failed to get 2d context', e);
      return;
    }

    let animationId;
    let observer;

    const drawWheel = () => {
      if (!canvas || !ctx) return;

      try {
        const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.scale(dpr, dpr);

        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          ctx.restore();
          return;
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.max(10, Math.min(centerX, centerY) * 0.75);

        ctx.translate(centerX, centerY);
        if (isPlayingRef.current) {
          rotationRef.current += 0.0015;
        }
        ctx.rotate(rotationRef.current);

        const numFamilies = fragranceFamilies.length;
        const angleStep = (Math.PI * 2) / numFamilies;
        const gap = 0.04;

        const segments = fragranceFamilies.map((family, index) => {
          const startAngle = index * angleStep + gap;
          const endAngle = (index + 1) * angleStep - gap;
          const midAngle = (startAngle + endAngle) / 2;
          return { ...family, startAngle, endAngle, midAngle, index };
        });

        const activeHover = hoveredFamilyRef.current;
        const highlightedConnections = activeHover
          ? globalConnections.filter(c => c.source === activeHover || c.target === activeHover)
          : globalConnections;

        ctx.globalCompositeOperation = 'screen';

        highlightedConnections.forEach(conn => {
          const sourceSeg = segments.find(s => s.id === conn.source);
          const targetSeg = segments.find(s => s.id === conn.target);
          if (!sourceSeg || !targetSeg) return;

          const isFaded = activeHover && conn.source !== activeHover && conn.target !== activeHover;

          for (let i = 0; i < conn.count; i++) {
            const sourceJitter = (Math.random() - 0.5) * (sourceSeg.endAngle - sourceSeg.startAngle) * 0.7;
            const targetJitter = (Math.random() - 0.5) * (targetSeg.endAngle - targetSeg.startAngle) * 0.7;

            const sAngle = sourceSeg.midAngle + sourceJitter;
            const tAngle = targetSeg.midAngle + targetJitter;

            const rLine = Math.max(0, radius - 15);
            const x1 = Math.cos(sAngle) * rLine;
            const y1 = Math.sin(sAngle) * rLine;
            const x2 = Math.cos(tAngle) * rLine;
            const y2 = Math.sin(tAngle) * rLine;

            const cpDistance = radius * 0.1;
            const cx1 = x1 * cpDistance / radius;
            const cy1 = y1 * cpDistance / radius;
            const cx2 = x2 * cpDistance / radius;
            const cy2 = y2 * cpDistance / radius;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);

            let strokeColor = sourceSeg.color;
            if (activeHover) {
              if (conn.source === activeHover) strokeColor = sourceSeg.color;
              else if (conn.target === activeHover) strokeColor = targetSeg.color;
            }

            ctx.strokeStyle = strokeColor;
            const baseOpacity = activeHover ? 0.7 : 0.15 + (conn.weight * 0.2);
            ctx.globalAlpha = isFaded ? 0.02 : baseOpacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;

        segments.forEach((seg) => {
          ctx.beginPath();
          ctx.arc(0, 0, radius, seg.startAngle, seg.endAngle);

          const isHovered = activeHover === seg.id;
          const isFaded = activeHover && activeHover !== seg.id;

          ctx.lineWidth = isHovered ? 16 : 10;
          ctx.strokeStyle = seg.color;
          ctx.globalAlpha = isFaded ? 0.2 : 1.0;
          ctx.stroke();

          ctx.save();
          ctx.globalAlpha = isFaded ? 0.2 : (isHovered ? 1.0 : 0.8);

          const textRadius = radius + 28;
          const textX = Math.cos(seg.midAngle) * textRadius;
          const textY = Math.sin(seg.midAngle) * textRadius;

          let rotationAngle = seg.midAngle;
          let align = 'left';
          if (seg.midAngle > Math.PI / 2 && seg.midAngle < (3 * Math.PI) / 2) {
            rotationAngle += Math.PI;
            align = 'right';
          }

          ctx.translate(textX, textY);
          ctx.rotate(rotationAngle);
          ctx.fillStyle = isHovered ? '#ffffff' : '#a1a1aa';
          ctx.font = isHovered ? 'bold 11px system-ui, sans-serif' : '10px system-ui, sans-serif';
          ctx.textAlign = align;
          ctx.textBaseline = 'middle';
          ctx.fillText(seg.name, 0, 0);
          ctx.restore();
        });

        ctx.restore();

        if (activeHover) {
          const familyData = fragranceFamilies.find(f => f.id === activeHover);
          if (familyData) {
            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.translate(rect.width / 2, rect.height / 2);
            ctx.fillStyle = '#ffffff';
            ctx.font = '500 22px system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(familyData.name.toLowerCase(), 0, -12);

            ctx.fillStyle = '#71717a';
            ctx.font = '11px monospace';
            const totalNotes = globalConnections
              .filter(c => c.source === activeHover || c.target === activeHover)
              .reduce((acc, curr) => acc + curr.count, 0);
            ctx.fillText(`${totalNotes} NOTES`, 0, 12);
            ctx.restore();
          }
        }
      } catch (err) {
        // Silently catch canvas render errors to prevent hard crash
      }
    };

    const renderLoop = () => {
      drawWheel();
      if (typeof window !== 'undefined') {
        animationId = window.requestAnimationFrame(renderLoop);
      }
    };

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          if (newWidth === 0 || newHeight === 0) continue;

          const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
          canvas.width = Math.max(1, newWidth * dpr);
          canvas.height = Math.max(1, newHeight * dpr);
          canvas.style.width = `${newWidth}px`;
          canvas.style.height = `${newHeight}px`;
        }
      });
      observer.observe(container);
    }

    renderLoop();

    return () => {
      if (typeof window !== 'undefined' && animationId) window.cancelAnimationFrame(animationId);
      if (observer && container) observer.unobserve(container);
    };
  }, []);

  const handleInteraction = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();

    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (clientX === undefined || clientY === undefined) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.max(1, Math.min(centerX, centerY) * 0.75);

    let angle = Math.atan2(dy, dx) - rotationRef.current;
    while (angle < 0) angle += Math.PI * 2;
    while (angle >= Math.PI * 2) angle -= Math.PI * 2;

    if (distance > radius - 30 && distance < radius + 50) {
      const numFamilies = fragranceFamilies.length;
      const angleStep = (Math.PI * 2) / numFamilies;
      let found = false;
      for (let i = 0; i < numFamilies; i++) {
        if (angle >= i * angleStep && angle < (i + 1) * angleStep) {
          setHoveredFamilyState(fragranceFamilies[i].id);
          found = true;
          break;
        }
      }
      if (!found) setHoveredFamilyState(null);
    } else {
      setHoveredFamilyState(null);
    }
  };

  const handleLeave = () => setHoveredFamilyState(null);

  return (
    <div ref={containerRef} className="relative w-full h-[420px] sm:h-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer touch-none"
        onMouseMove={handleInteraction}
        onMouseLeave={handleLeave}
        onTouchMove={handleInteraction}
        onTouchStart={handleInteraction}
        onTouchEnd={handleLeave}
      />
      <button
        onClick={() => setIsPlaying(p => !p)}
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors backdrop-blur"
        aria-label={isPlaying ? 'Pause rotation' : 'Play rotation'}
        title={isPlaying ? 'Pause rotation' : 'Play rotation'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
    </div>
  );
};
