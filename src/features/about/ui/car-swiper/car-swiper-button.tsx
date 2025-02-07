import { ChevronLeft, ChevronRight } from "lucide-react";


interface ICarSwiperButton {
    onClick: () => void;
    variant?: "prev" | "next";
}

export const CarSwiperButton = ({ onClick, variant = "prev" }: ICarSwiperButton) => {
    return (
        <button
            onClick={onClick}
            className="w-[64px] h-[64px] flex items-center justify-center rounded-full border border-primary text-primary"
        >
            {variant === "prev" ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
        </button>
    )
}
