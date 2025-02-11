import React from "react";
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
}

const Button: React.FC<Props> = ({
    text,
    className = "",
    variant = "default",
    width = "w-[210px] sm:w-[240px] lg:w-[190px] xl:w-[220px]",
    height = "h-[50px] sm:h-[55px] lg:h-[45px] xl:h-[55px]",
    onClick,
    type = "button",
    fontSize,
}) => {
    const { open } = usePopupStore("formPopup");
    const classes = [
        width,
        height,
        "font-mont-alter flex items-center justify-center rounded-[32px] uppercase transition-colors duration-300",
        variant === "default"
            ? "bg-primary font-medium text-white text-[16px] sm:text-[18px] hover:bg-transparent hover:border hover:border-primary "
            : variant === "outline"
                ? "bg-transparent border border-primary font-medium text-primary text-[16px] sm:text-[18px] hover:bg-primary hover:text-white"
                : "font-medium text-secondary text-[16px] sm:text-[18px]",
        className,
        fontSize ? fontSize : "",
    ].join(" ");

    return (
        <button className={classes} onClick={onClick ? onClick : () => open()} type={type}>
            {text}
        </button>
    );
};

export default Button;
