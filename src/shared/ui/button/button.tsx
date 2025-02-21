import React, { useEffect, useState } from "react";
import { usePopupStore } from "@/shared/model/open-popup-store";

interface Props {
    text: string;
    href?: string;
    className?: string;
    variant?: "default" | "outline" | "link";
    width?: string;
    height?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    fontSize?: string;
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
    text,
    className = "",
    variant = "default",
    width = "w-[210px] sm:w-[240px] lg:w-[190px] xl:w-[220px]",
    height = "h-[50px] sm:h-[55px] lg:h-[45px] xl:h-[55px]",
    onClick,
    type = "button",
    disabled
}) => {
    const { open } = usePopupStore("formPopup");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const baseClasses = [
        width,
        height,
        "font-mont-alter flex items-center justify-center rounded-[32px] uppercase transition-colors duration-300 flex items-center justify-center",
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        className
    ];

    const variantClasses = {
        default: "bg-primary font-medium text-white text-[16px] hover:bg-transparent hover:border hover:border-primary flex items-center justify-center",
        outline: "border border-primary font-medium text-white text-[16px] hover:bg-primary flex items-center justify-center",
        link: "text-primary hover:text-white flex items-center justify-center"
    };

    return (
        <button
            className={[...baseClasses, variantClasses[variant]].join(" ")}
            onClick={!disabled ? onClick ? onClick : () => open() : undefined}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;