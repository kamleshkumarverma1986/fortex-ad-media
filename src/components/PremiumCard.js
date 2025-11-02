import { useRef, useEffect, useState } from "react";

export function PremiumCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const borderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const border = borderRef.current;

    if (!card || !glow || !border) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = Math.max(
        -12,
        Math.min(12, ((targetY - centerY) / 20) * -1)
      );
      const rotateY = Math.max(-12, Math.min(12, (targetX - centerX) / 20));

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
        translateZ(10px)
      `;

      // Animate border gradient position
      const angle =
        Math.atan2(targetY - centerY, targetX - centerX) * (180 / Math.PI);
      border.style.background = `conic-gradient(from ${angle}deg at 50% 50%, 
        rgba(139, 92, 246, 0.8) 0deg,
        rgba(59, 130, 246, 0.8) 90deg,
        rgba(16, 185, 129, 0.8) 180deg,
        rgba(59, 130, 246, 0.8) 270deg,
        rgba(139, 92, 246, 0.8) 360deg)`;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.transition = "transform 0.15s ease-out";
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transition =
        "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)";
      glow.style.opacity = "0";
    };

    // Smooth glow animation
    const animate = () => {
      if (isHovered) {
        currentX = lerp(currentX, targetX, 0.1);
        currentY = lerp(currentY, targetY, 0.1);

        if (glow) {
          glow.style.opacity = "1";
          glow.style.background = `
            radial-gradient(
              600px circle at ${currentX}px ${currentY}px,
              rgba(139, 92, 246, 0.15),
              rgba(59, 130, 246, 0.1) 30%,
              transparent 60%
            )
          `;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      card?.removeEventListener("mousemove", handleMouseMove);
      card?.removeEventListener("mouseenter", handleMouseEnter);
      card?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div className="relative group p-[2px] rounded-2xl">
      {/* Animated rotating border */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            rgba(139, 92, 246, 0.8) 0deg,
            rgba(59, 130, 246, 0.8) 90deg,
            rgba(16, 185, 129, 0.8) 180deg,
            rgba(59, 130, 246, 0.8) 270deg,
            rgba(139, 92, 246, 0.8) 360deg)`,
        }}
      />

      <div
        ref={cardRef}
        className={`
          relative rounded-2xl overflow-hidden
          bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95
          backdrop-blur-xl
          border border-white/10
          shadow-2xl
          ${className}
        `}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Dynamic glow effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{ zIndex: 1 }}
        />

        {/* Noise texture overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            zIndex: 1,
          }}
        />

        {/* Top highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ zIndex: 2 }}
        />

        {/* Content with depth */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </div>

        {/* Corner accents */}
        <div
          className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-blue-500/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ zIndex: 2 }}
        />
      </div>
    </div>
  );
}
