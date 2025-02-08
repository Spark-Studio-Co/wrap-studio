import { useState, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

export const CountUpComponent = ({ value, title, isRow = false }: { value: number; title: string; isRow?: boolean }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const countUpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1;
          const start = count;
          const end = value;
          const range = end - start;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.round(start + range * progress));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }

    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, [controls, value]);

  return (
    <div ref={countUpRef} className={`flex items-center mb-10 ${isRow ? "flex-row gap-4" : "flex-col"}`}>
      <div className="text-primary font-gotham text-[64px] lg:text-[48px] xl:text-[64px] 2xl:text-[80px] font-[500]">
        {Math.round(count)}+
      </div>
      <span className={`text-white font-mont-alter text-[20px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px] leading-[40px] lg:leading-[24px] xl:leading-[32px] 2xl:leading-[40px] font-[500] italic ${isRow ? "text-left" : "text-center"}`}>
        {title.split(" ").map((word, index) => (
          <span key={index} className="block break-words">{word}</span>
        ))}
      </span>
    </div>
  );
};
