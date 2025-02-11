import { ChevronLeft, ChevronRight } from "lucide-react";


interface ISwiperButton {
    onClick: () => void;
    variant?: "prev" | "next";
    isFull?: boolean
}

export const SwiperButton = ({ onClick, variant = "prev", isFull = false }: ISwiperButton) => {
    return (
        <button
            onClick={onClick}
            className={`w-[64px] h-[64px] flex items-center justify-center text-primary rounded-full border border-primary ${isFull && "bg-primary text-secondary-dark w-[52px] h-[52px]"} `}
        >
            {variant === "prev" ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
        </button>
    )
}
