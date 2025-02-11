"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../3d-card/3d-card";
import Button from "@/shared/ui/button/button";

import { usePopupStore } from "@/shared/model/open-popup-store";

import { ChevronRight } from "lucide-react";

interface IServiceCard {
    title: string;
    description: string;
    image: ImageMetadata;
    index: number;
    className?: string;
    contentPopup?: string
}

export function ServiceCard3d({ title, description, image, index, className, contentPopup }: IServiceCard) {
    const { open } = usePopupStore("servicePopup");
    let { open: openPopup } = usePopupStore("contentPopup");


    return (
        <CardContainer className="xl:inter-var w-full">
            <CardBody className={`group xl:group/card lg:min-h-[390px] xl:min-h-[440px] 2xl:min-h-[490px] 3xl:min-h-[460px] 4xl:min-h-[480px] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] relative w-full lg:p-[20px] flex items-start flex-col border border-secondary-dark rounded-[12px]  ${className}`}>

                <span
                    className="absolute inset-0 flex justify-center items-center text-[300px] lg:text-[280px] font-walk-da-walk font-[400] text-secondary opacity-10 z-0"
                    style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
                >
                    {index < 9 ? `0${index + 1}` : index + 1}
                </span>

                <CardItem
                    translateZ="50"
                    className="text-white font-gotham font-[400] text-[28px] lg:text-[22px] xl:text-[28px] relative z-10"
                >
                    {`${title}`.toUpperCase()}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-secondary text-left font-mont-alter font-[300] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-[22px] 3xl:leading-[26px] lg:w-full xl:max-w-[382px] relative z-10"
                >
                    {description}
                </CardItem>
                <CardItem
                    translateZ="100"
                    className="w-full mt-4 group-hover:shadow-[0px_4px_128px_0px_#50C87840]"
                >
                    <div
                        className="relative w-full h-auto bg-cover bg-center rounded-[12px]"
                        style={{ backgroundImage: `url(${image.src})`, paddingBottom: "56.25%" }}
                    >
                    </div>
                </CardItem>
                <div className="lg:flex-grow"></div>
                <div className="flex flex-row items-center justify-between lg:w-full xl:w-[95%] mx-auto mt-[20px]">
                    <CardItem
                        translateZ={10}
                        translateX={-10}
                        as="button"
                        className="uppercase text-primary lg:text-[12px] xl:text-[14px] font-mont-alter font-[400] flex flex-row items-center gap-0.5 cursor-pointer relative z-10 hover:gap-2 transition-all duration-300 ease-in-out"
                        onClick={() => openPopup(title, title, contentPopup)}
                    >
                        подробнее <ChevronRight
                            className="w-[14px] h-[14px] text-primary"
                        />
                    </CardItem>
                    <CardItem translateZ={10}
                        translateX={10}>
                        <Button
                            variant="outline"
                            text={`заказать`.toUpperCase()}
                            width="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[110px] xl:w-[150px]"
                            height="h-[40px] sm:h-[45px] md:h-[50px] lg:h-[30px] xl:h-[40px]"
                            className="lg:text-[12px] xl:text-[14px] relative z-10 lg:justify-self-end"
                            onClick={() => open(title)}
                        />
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer >
    );
}
