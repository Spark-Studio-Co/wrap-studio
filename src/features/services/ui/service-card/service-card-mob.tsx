"use client";

import React from "react";
import { usePopupStore } from "@/shared/model/open-popup-store";
import Button from "@/shared/ui/button/button";
import { ChevronRight } from "lucide-react";

interface IServiceCard {
    title: string;
    description: string;
    image: ImageMetadata;
    index: number;
    className?: string;
    contentPopup?: string;
}

export const ServiceCardMob: React.FC<IServiceCard> = ({ title, description, image, index, className, contentPopup }) => {
    const { open } = usePopupStore('servicePopup');
    const { open: openPopup } = usePopupStore("contentPopup");


    return (
        <div className={`relative w-full min-h-[380px] p-[20px] sm:p-[24px] md:p-[28px] flex items-start flex-col border border-secondary-dark rounded-[12px] overflow-hidden ${className}`}>
            <span className="absolute inset-0 flex justify-center items-center text-[300px] lg:text-[280px] font-walk-da-walk font-[400] text-secondary opacity-10 z-0">
                {index < 9 ? `0${index + 1}` : index + 1}
            </span>

            <span className="text-white font-gotham font-[400] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[22px] xl:text-[28px] 2xl:text-[32px] leading-6 relative z-10">
                {title.toUpperCase()}
            </span>

            <p className="text-secondary text-left font-mont-alter font-[400] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[22px] xl:leading-[26px] 2xl:leading-[30px] mt-3 max-w-[282px] sm:max-w-[382px] md:max-w-[482px] lg:w-full xl:max-w-[382px] relative z-10">
                {description}
            </p>

            <div className="lg:flex-grow"></div>
            <div className="flex flex-row items-center justify-between w-full mx-auto mt-5">
                <span
                    className="uppercase text-primary text-[14px] sm:text-[16px] md:text-[18px] font-mont-alter font-[400] flex flex-row items-center gap-0.5 cursor-pointer relative z-10 hover:gap-2 transition-all duration-300 ease-in-out"
                    onClick={() => openPopup(title, title, contentPopup)}
                >
                    подробнее <ChevronRight
                        className="w-[14px] h-[14px] text-primary"
                    />
                </span>

                <Button
                    onClick={() => open(title)}
                    variant="outline"
                    text="ЗАКАЗАТЬ"
                    width="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[150px] xl:w-[180px] 2xl:w-[200px]"
                    height="h-[40px] sm:h-[45px] md:h-[50px] lg:h-[40px] xl:h-[45px] 2xl:h-[50px]"
                    className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] relative z-10 lg:justify-self-end"
                />
            </div>
        </div>
    );
};