import { useState, useEffect } from "react";

interface ImageSliderProps {
    images: ImageMetadata[];
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
                style={{ backgroundImage: `url(${images[currentIndex].src})`, paddingBottom: '56.25%' }}
            />

            <span className="text-primary font-gotham font-[400] text-[24px] sm:text-[28px] md:text-[48px] lg:text-[36px] 2xl:text-[48px] leading-5 mt-4 sm:mt-6 md:mt-12 lg:mt-8">
                {title}
            </span>

            <p className="text-white font-mont-alter font-[300] text-[15px] sm:text-[18px] md:text-[20px] lg:text-[16px] 2xl:text-[18px] leading-[27px] sm:leading-[32px] md:leading-[36px] lg:leading-[22px] 2xl:leading-[27px] mt-4 sm:mt-6 md:mt-8 lg:mt-6 lg:w-[85%] xl:w-[80%] 2xl:w-[75%]">
                {description}
            </p>
        </div>
    );
}