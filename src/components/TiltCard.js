import { useRef, useEffect } from "react";

export function TiltCard({ children }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const floatingRef = useRef(true);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    let angle = 0;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clamped rotation for smoother effect at edges
      const rotateX = Math.max(-15, Math.min(15, ((y - centerY) / 15) * -1));
      const rotateY = Math.max(-15, Math.min(15, (x - centerX) / 15));

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;

      // Reduced shine opacity from 0.25 to 0.12
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12), transparent 70%)`;
    };

    const handleMouseEnter = () => {
      floatingRef.current = false;
      card.style.transition = "transform 0.1s ease-out";
    };

    const handleMouseLeave = () => {
      floatingRef.current = true;
      card.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      shine.style.background = "none";
    };

    // Idle floating animation
    const float = () => {
      if (floatingRef.current && card) {
        angle += 0.02;
        const y = Math.sin(angle) * 4;
        card.style.transform = `translateY(${y}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(float);
    };

    float();

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
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        relative rounded-2xl overflow-hidden
        bg-gradient-to-b from-[#1E293B]/90 to-[#0F172A]/90 
        backdrop-blur-sm 
        border-none
        transition-all duration-500 
        hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]
        bg-transparent border-none shadow-none
      "
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
        outline: "none",
        willChange: "transform",
      }}
    >
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{ zIndex: 2 }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
