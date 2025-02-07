
import gsap from "gsap";
import { useBurgerMenuStore } from "../../model/burger-menu-store";

import type { RefObject } from "react";
import { useEffect } from "react";

export const useBurgerAnimation = (
    lineRef1: RefObject<HTMLSpanElement | null>,
    lineRef2: RefObject<HTMLSpanElement | null>,
    lineRef3: RefObject<HTMLSpanElement | null>
) => {
    const { isOpen, toggleMenu } = useBurgerMenuStore();

    useEffect(() => {
        if (!lineRef1.current || !lineRef2.current || !lineRef3.current) return;

        if (isOpen) {
            gsap.to(lineRef1.current, {
                rotate: 45,
                y: 8,
                duration: 0.3,
                transformOrigin: "center center",
            });
            gsap.to(lineRef2.current, {
                opacity: 0,
                duration: 0.2,
            });
            gsap.to(lineRef3.current, {
                rotate: -45,
                y: -8,
                duration: 0.3,
                transformOrigin: "center center",
            });
        } else {
            gsap.to(lineRef1.current, {
                rotate: 0,
                y: 0,
                duration: 0.3,
                transformOrigin: "center center",
            });
            gsap.to(lineRef2.current, {
                opacity: 1,
                duration: 0.2,
            });
            gsap.to(lineRef3.current, {
                rotate: 0,
                y: 0,
                duration: 0.3,
                transformOrigin: "center center",
            });
        }
    }, [isOpen, lineRef1, lineRef2, lineRef3]);

    return { toggleMenu, isOpen };
};
