import { useRef, useEffect, useState } from "react";

interface TextCarouselProps {
  text: string;
}

export default function TextCarousel({ text }: TextCarouselProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const gap = "\u00A0\u00A0\u00A0\u00A0\u00A0"; // 5 non-breaking spaces

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.scrollWidth);
    }
  }, [text]);

  // Repeat text enough times to fill more than 2x screen width for seamless loop
  const repetitions = 6;

  return (
    <div className="w-full overflow-hidden py-8 flex items-center justify-center">
      <div
        className="whitespace-nowrap animate-carousel-seamless"
        style={{
          // Start the scroll from center: offset by 50vw so first text begins at center
          // Then animate by one "block" width to create seamless loop
          animationDuration: "18s",
          // Use CSS custom property for the scroll distance
          ["--scroll-distance" as string]: textWidth > 0 ? `-${textWidth}px` : "-100vw",
        }}
      >
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : undefined}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white drop-shadow-lg inline-block"
          >
            {text}{gap}
          </span>
        ))}
      </div>
    </div>
  );
}
