import { useState, useEffect, useRef } from "react";
import { SwiperButton } from "@/shared/ui/swiper-button/swiper-button";

import TablerWheelIcon from "/public/images/tabler-wheel-icon.svg";


interface ImageSliderProps {
    images: ImageMetadata[];
    title: string;
    descriptors?: string[];
    description?: string;
    isExtended?: boolean;
}

export default function ImageSlider({ images, title, descriptors, isExtended }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isLgScreen = typeof window !== "undefined" ? window.matchMedia("(min-width: 1280px)").matches : false;

    useEffect(() => {
        if (isLgScreen || isDragging) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000) as unknown as number;

        return () => clearInterval(interval);
    }, [images.length, isLgScreen, isDragging]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div ref={sliderRef} className={`w-full flex flex-col items-start relative`}>
            <div
                className="relative w-full group overflow-hidden rounded-[12px]"
                onTouchStart={(e) => {
                    setTouchStart(e.touches[0].clientX);
                    setIsDragging(true);
                }}
                onTouchMove={(e) => {
                    setTouchEnd(e.touches[0].clientX);
                }}
                onTouchEnd={() => {
                    setIsDragging(false);
                    const swipeDistance = touchStart - touchEnd;

                    if (Math.abs(swipeDistance) > 50) {
                        if (swipeDistance > 0) {
                            handleNext();
                        } else {
                            handlePrev();
                        }
                    }
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="absolute w-full h-full transition-all duration-300 ease-out"
                        style={{
                            transform: `translate3d(${(index - currentIndex) * 100}%, 0, 0)`,
                            opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0
                        }}
                    >
                        <img
                            src={image.src}
                            alt={title}
                            className="w-full h-full object-cover"
                            loading='lazy'
                        />
                    </div>
                ))}
                <div
                    className="relative w-full pb-[120%] lg:pb-[100%]"
                />
                <div className="hidden xl:flex absolute top-1/2 left-0 right-0 justify-between px-4 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10">
                    <SwiperButton variant="prev" onClick={handlePrev} isFull />
                    <SwiperButton variant="next" onClick={handleNext} isFull />
                </div>
            </div>
            <span className="text-primary font-gotham font-[400] text-[28px] sm:text-[32px] md:text-[48px] lg:text-[32px] 2xl:text-[48px] mt-4 sm:mt-6 lg:mt-8 mb-6">
                {title}
            </span>
            <div className={`${isExtended ? "sm:grid sm:grid-cols-2 xl:grid-cols-3 w-full gap-4 flex-grow flex flex-col" : "flex-grow flex flex-col gap-4"}`}>
                {descriptors?.map((descriptor, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <img src={TablerWheelIcon.src} alt="Tabler Wheel Icon" className="self-start shrink-0" loading="lazy" />
                        <span className={`text-white font-mont-alter font-[600] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[16px] 2xl:text-[20px] leading-[24px] -mt-0.5`}>
                            {descriptor}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}