import { useEffect } from "react";
import { gsap } from "gsap";

export const HeroAnimation = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        tl.to("#heroContent", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
        });

        tl.from(
            "#heroContent h1",
            {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
            },
            "-=1",
        );

        tl.from(
            "#heroContent p",
            {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.8",
        );

        tl.from(
            "#heroContent button",
            {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.8",
        );
    }, []);

    return null; // Этот компонент ничего не рендерит, он просто запускает анимацию
};