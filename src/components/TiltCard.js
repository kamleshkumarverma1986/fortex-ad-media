import { useRef, useEffect } from "react";

export function TiltCard({ children }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    let floating = true;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / 15) * -1;
      const rotateY = (x - centerX) / 15;

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 80%)`;
    };

    const handleMouseEnter = () => {
      floating = false;
      card.style.transition = "transform 0.1s ease-out";
    };

    const handleMouseLeave = () => {
      floating = true;
      card.style.transition = "transform 0.6s ease-out";
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      shine.style.background = "none";
    };

    // Idle floating animation
    let angle = 0;
    const float = () => {
      if (floating) {
        angle += 0.03;
        const y = Math.sin(angle) * 4;
        card.style.transform = `translateY(${y}px)`;
      }
      requestAnimationFrame(float);
    };
    float();

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
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
        hover:scale-[1.03] bg-transparent border-none shadow-none
      "
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
        outline: "none",
      }}
    >
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
