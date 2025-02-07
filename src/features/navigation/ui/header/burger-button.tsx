import { useRef } from "react";
import { useMenuStore } from "../../model/menu-store";
import { useBurgerAnimation } from "../../lib/animations/burger-animation";

export const BurgerButton = () => {
    const { toggle } = useMenuStore();

    const lineRef1 = useRef<HTMLSpanElement>(null);
    const lineRef2 = useRef<HTMLSpanElement>(null);
    const lineRef3 = useRef<HTMLSpanElement>(null);

    const { toggleMenu } = useBurgerAnimation(lineRef1, lineRef2, lineRef3);

    const handleClick = () => {
        toggle();
        toggleMenu();
    };

    return (
        <div
            className="h-14 w-14 flex items-center justify-center relative cursor-pointer"
            onClick={handleClick}
        >
            <span
                ref={lineRef1}
                className="absolute h-[2px] w-[32px] bg-primary rounded-md transition-all duration-300 ease-in-out"
                style={{ top: "calc(50% - 8px)" }}
            />
            <span
                ref={lineRef2}
                className="absolute h-[2px] w-[32px] bg-primary rounded-md transition-all duration-300 ease-in-out"
                style={{ top: "50%" }}
            />
            <span
                ref={lineRef3}
                className="absolute h-[2px] w-[32px] bg-primary rounded-md transition-all duration-300 ease-in-out"
                style={{ top: "calc(50% + 8px)" }}
            />
        </div>
    );
};