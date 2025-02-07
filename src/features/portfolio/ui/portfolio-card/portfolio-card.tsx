import { useState, useEffect } from "react";

interface ImageSliderProps {
    images: string[];
    title: string;
    description: string;
}

export default function ImageSlider({ images, title, description }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full flex flex-col items-start">
            <div
                className="relative w-full h-auto bg-cover bg-center rounded-[12px] transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${images[currentIndex]})`, paddingBottom: '56.25%' }}
            />

            <span className="text-primary font-gotham font-[400] text-[24px] leading-5 mt-4">
                {title}
            </span>

            <p className="text-white font-[400] leading-[27px] mt-4">{description}</p>
        </div>
    );
}