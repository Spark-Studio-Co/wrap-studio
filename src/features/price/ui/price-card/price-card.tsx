"use client";

import React from "react";
import Button from "@/shared/ui/button/button";
import { usePopupStore } from "@/shared/model/open-popup-store";

import TablerWheelIcon from "/public/images/tabler-wheel-icon.svg";

interface PriceCardProps {
    title: string;
    price: string;
    descriptors: string[];
    isExtended?: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({ title, price, descriptors, isExtended = false }) => {
    const { open } = usePopupStore('servicePopup');

    return (
        <div
            className={`group hover:shadow-[0px_4px_128px_0px_#50C87840] transition-all duration-300 ease-in-out hover:border-primary relative w-full ${isExtended ? "flex flex-row items-start justify-between h-full" : "flex-col flex items-start lg:h-full min-h-[610px]"} 
            p-[20px] lg:p-[20px] xl:p-[24px] 2xl:p-[28px] border border-secondary-dark rounded-[12px] overflow-hidden `}
        >
            <span
                className={`absolute inset-0 flex items-center justify-center select-none text-[#50C87808] z-0 text-center 
                ${isExtended ? "xl:text-[188px] 2xl:text-[208px]" : "text-[128px] sm:text-[148px] md:text-[148px] lg:text-[128px] 2xl:text-[168px] leading-[128px] sm:leading-[148px] md:leading-[168px] lg:leading-[128px] 2xl:leading-[168px]"}`}
                style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
            >
                WRAP STUDIO
            </span>

            <div>
                <span
                    className={`text-white font-gotham font-[500] group-hover:text-primary transition-colors duration-300 ease-in-out 
                    ${isExtended ? "xl:text-[38px] 2xl:text-[48px]" : "text-[22px] sm:text-[28px] md:text-[32px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px]"} leading-[37px] mb-4`}
                >
                    {title.toUpperCase()}
                </span>

                {/* Список преимуществ */}
                <div className={`${isExtended ? "mt-8 grid grid-cols-3 xl:gap-x-4 2xl:gap-x-8 gap-y-4" : "flex-grow flex flex-col gap-4 mt-6 mb-4"}`}>
                    {descriptors.map((descriptor, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img src={TablerWheelIcon.src} alt="Tabler Wheel Icon" className="self-start shrink-0" loading="lazy" />
                            <span className="text-white font-mont-alter font-[600] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[16px] 2xl:text-[20px] leading-[37px] -mt-2 whitespace-pre-line">
                                {descriptor}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`flex ${isExtended ? "flex-col items-end justify-between" : "flex-row flex-wrap justify-between w-full mt-auto gap-3 xl:gap-4 items-center"} z-20`}>
                <span
                    className={`text-primary font-[400] text-[50px] sm:text-[64px] md:text-[72px] lg:text-[50px] ${isExtended ? "xl:text-[54px] 2xl:text-[64px]" : ""} 2xl:text-[72px]`}
                    style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
                >
                    {price}
                </span>
                <div className={`${isExtended && "absolute bottom-[24px] 2xl:bottom-[28px]"}`}>
                    <Button
                        variant="outline"
                        text="ЗАКАЗАТЬ"
                        width={`${isExtended ? "xl:w-[210px] 2xl:w-[220px]" : "w-[150px] sm:w-[180px] md:w-[200px] lg:w-[150px]"}`}
                        height={`${isExtended ? "xl:h-[50px] 2xl:h-[55px]" : "h-[40px] sm:h-[45px] md:h-[50px] lg:h-[40px]"}`}
                        fontSize={`${isExtended ? "xl:text-[16px]" : "lg:text-[14px]"}`}
                        onClick={() => open(title)}
                    />
                </div>
            </div>
        </div>
    );
};
