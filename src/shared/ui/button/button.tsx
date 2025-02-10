import React from "react";

interface Props {
    text: string;
    href?: string;
    className?: string;
    variant?: "default" | "outline" | "link";
    width?: string;
    height?: string;
    onClick?: () => void;
    type?: string;
}

const Button: React.FC<Props> = ({
    text,
    href,
    className = "",
    variant = "default",
    width = "w-[210px] sm:w-[240px] lg:w-[190px] xl:w-[220px]",
    height = "h-[50px] sm:h-[55px] lg:h-[45px] xl:h-[55px]",
    onClick,
}) => {
    const classes = [
        width,
        height,
        "font-mont-alter flex items-center justify-center rounded-[32px]",
        variant === "default"
            ? "bg-primary font-medium text-white text-[16px] sm:text-[18px] hover:bg-transparent hover:border hover:border-primary uppercase transition-colors duration-300"
            : variant === "outline"
                ? "bg-transparent border border-primary font-medium text-primary text-[16px] sm:text-[18px]"
                : "font-medium text-secondary text-[16px] sm:text-[18px]",
        className,
    ].join(" ");

    return variant === "link" ? (
        <a href={href} className={`${width} ${height} ${className} bg-primary hover:bg-transparent hover:text-primary transition-colors duration-300 hover:border-primary hover:border font-medium text-white text-[16px] sm:text-[18px] lg:text-[14px] xl:text-[16px] font-mont-alter flex items-center justify-center rounded-[32px]`}>
            {text}
        </a>
    ) : (
        <button className={classes} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
