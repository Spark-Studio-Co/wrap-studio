"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Button from "@/shared/ui/button/button";

interface IServiceCard {
    title: string;
    description: string;
    image: ImageMetadata;
    index: number;
    className?: string;
}

export function ServiceCard3d({ title, description, image, index, className }: IServiceCard) {
    return (
        <CardContainer className="inter-var w-full">
            <CardBody className={`group/card lg:min-h-[420px] xl:min-h-[500px] 2xl:min-h-[540px] 3xl:min-h-[600px] 4xl:min-h-[640px] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] relative w-full lg:p-[20px] xl:p-[24px] 2xl:p-[28px] flex items-start flex-col border border-secondary-dark rounded-[12px]  ${className}`}>

                <span
                    className="absolute inset-0 flex justify-center items-center text-[300px] lg:text-[280px] font-walk-da-walk font-[400] text-secondary opacity-10 z-0"
                    style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
                >
                    {index < 9 ? `0${index + 1}` : index + 1}
                </span>

                <CardItem
                    translateZ="50"
                    className="text-white font-gotham font-[400] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[22px] xl:text-[28px] 2xl:text-[32px] leading-6 relative z-10"
                >
                    {`${title}`.toUpperCase()}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-secondary text-left font-mont-alter font-[400] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[22px] xl:leading-[26px] 2xl:leading-[30px] mt-3 max-w-[282px] sm:max-w-[382px] md:max-w-[482px] lg:w-full xl:max-w-[382px] relative z-10"
                >
                    {description}
                </CardItem>
                <CardItem
                    translateZ="100"
                    className="w-full mt-4"
                >
                    <div
                        className="relative w-full h-auto bg-cover bg-center rounded-[12px] mt-4"
                        style={{ backgroundImage: `url(${image.src})`, paddingBottom: "56.25%" }}
                    >
                    </div>
                </CardItem>
                <div className="lg:flex-grow"></div>
                <CardItem translateZ="80">
                    <Button
                        variant="outline"
                        text={`заказать`.toUpperCase()}
                        width="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[150px] xl:w-[180px] 2xl:w-[200px]"
                        height="h-[40px] sm:h-[45px] md:h-[50px] lg:h-[40px] xl:h-[45px] 2xl:h-[50px]"
                        className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] mt-5 relative z-10 lg:justify-self-end"
                    />
                </CardItem>
            </CardBody>
        </CardContainer >
    );
}
