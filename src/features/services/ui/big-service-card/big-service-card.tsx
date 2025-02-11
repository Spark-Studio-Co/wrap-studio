"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import Button from "@/shared/ui/button/button";
import services06 from "/public/images/services06.webp";
import { usePopupStore } from "@/shared/model/open-popup-store";


export const BigServiceCard = () => {
    const { open } = usePopupStore("servicePopup");
    const { open: openPopup } = usePopupStore("contentPopup");

    const title = "Бронепленка";
    const contentPopup = "Оклейка полиуретановой бронепленкой";

    const cardRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const car = carRef.current;

        if (card && car) {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.fromTo(
                car,
                { x: "100%" }, // Машина находится за пределами экрана
                {
                    x: "0%",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full h-[350px] flex flex-col border border-secondary-dark rounded-[12px] justify-between p-[32px] mt-5 relative overflow-hidden group transition-shadow duration-300 ease-in-out hover:shadow-[0px_4px_128px_0px_#50C87840] hover:border-primary"
        >
            {/* Фоновый текст */}
            <span
                className="absolute inset-0 flex justify-center items-center text-[256px] font-walk-da-walk font-[400] text-[#FFFFFF20] opacity-10 z-0"
                style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
            >
                WRAP STUDIO
            </span>

            {/* Заголовок */}
            <span
                className="uppercase text-white text-[48px] font-gotham font-[500] leading-[55px] w-[856px] transition-colors duration-300 ease-in-out group-hover:text-primary"
            >
                Оклейка полиуретановой бронепленкой
            </span>

            <div className="flex flex-row items-center justify-between w-full">
                {/* Кнопка "Подробнее" */}
                <span
                    className="uppercase text-primary text-[18px] font-mont-alter font-[400] flex flex-row items-center gap-1 cursor-pointer relative z-10 transition-all duration-300 ease-in-out hover:gap-3"
                    onClick={() => openPopup(title, title, contentPopup)}
                >
                    подробнее <ChevronRight className="w-[18px] h-[18px] text-primary" />
                </span>

                {/* Кнопка "Заказать" */}
                <Button
                    variant="outline"
                    text={`заказать`.toUpperCase()}
                    width="w-[210px]"
                    height="h-[50px]"
                    className="relative z-10"
                    onClick={() => open(title)}
                />

                {/* Машина с анимацией въезда */}
                <div ref={carRef} className="w-[732px] absolute -right-32 -bottom-4">
                    <img src={services06.src} alt="Gelik" className="brightness-50" />
                </div>
            </div>
        </div>
    );
};