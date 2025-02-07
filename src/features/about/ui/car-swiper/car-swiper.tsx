import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { CarSwiperButton } from "./car-swiper-button";
import "swiper/css";
import "swiper/css/pagination";
import { carImages } from "../../lib/car-swiper";

export default function CarSwiper() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (animating) {
            setTimeout(() => {
                setAnimating(false);
            }, 600);
        }
    }, [animating]);

    return (
        <div className="relative w-full mt-[64px]">
            <Swiper
                onSwiper={setSwiperInstance}
                spaceBetween={10}
                slidesPerView={1.2}
                centeredSlides={true}
                pagination={{ clickable: true }}
                loop={false}
                onSlideChange={(swiper) => {
                    setAnimating(true);
                    setCurrentIndex(swiper.activeIndex);
                }}
                className="h-auto overflow-visible"
            >
                {carImages.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className={`relative flex items-center justify-center transition-all duration-[900ms] ease-in-out ${index === currentIndex
                            ? "opacity-100 brightness-100 scale-100"
                            : "opacity-40 brightness-75 scale-90"
                            }`}
                        style={{
                            transition: animating ? "opacity 0.9s ease, transform 0.9s ease" : "none",
                            willChange: "opacity, transform",
                            boxShadow: '0px 4px 128px -32px #50C87840'
                        }}
                        onTransitionEnd={() => setAnimating(false)}
                    >
                        <img
                            src={src.src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto min-h-[500px] object-cover aspect-[4/3] transition-all duration-[900ms] ease-in-out"
                            style={{ boxShadow: '0px 0px 128px -32px #50C87840' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="relative flex gap-x-8 justify-center mt-8">
                <CarSwiperButton
                    onClick={() => swiperInstance?.slidePrev()}
                    variant="prev"
                />
                <CarSwiperButton
                    onClick={() => swiperInstance?.slideNext()}
                    variant="next"
                />
            </div>

            {/* Счетчик */}
            <span className="relative text-white font-gotham text-center text-[32px] font-[400] flex items-center justify-center mt-12">
                {String(currentIndex + 1).padStart(2, "0")}/{String(carImages.length).padStart(2, "0")}
            </span>
        </div>
    );
}