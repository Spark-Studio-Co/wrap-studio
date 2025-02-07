import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { CarSwiperButton } from "./car-swiper-button";

import "swiper/css";
import "swiper/css/pagination";

import { carImages } from "../../model/car-swiper";


export default function CarSwiper() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

    return (
        <div className="w-full">
            <Swiper
                onSwiper={setSwiperInstance}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)}
                loop={false}
                className="rounded-lg h-auto"
            >
                {carImages.map((src, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center w-full">
                        <img
                            src={src.src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto min-h-[500px] object-cover aspect-[4/3]"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex mt-8 gap-x-8 items-center justify-center">
                <CarSwiperButton
                    onClick={() => swiperInstance?.slidePrev()}
                    variant="prev"
                />
                <CarSwiperButton
                    onClick={() => swiperInstance?.slideNext()}
                    variant="next"
                />
            </div>

            <span className="text-white font-gotham text-center mt-12 text-[32px] font-[400] flex items-center justify-center">
                {String(currentIndex).padStart(2, "0")}/{String(carImages.length).padStart(2, "0")}
            </span>
        </div>
    );
}