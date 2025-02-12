import { BurgerButton } from "./burger-button";
import { useEffect } from "react";
import Button from '../../../../shared/ui/button/button'

import { usePopupStore } from "@/shared/model/open-popup-store";

import { links } from "../../model/links";
import logo from '/public/images/logo.svg'

export const Header = () => {

    const { open } = usePopupStore('formPopup');

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");

        if (!href) return;

        const isOnMainPage = window.location.pathname === "/";

        if (isOnMainPage) {
            // If already on the main page, just scroll
            const elementId = href.split("#")[1]; // Extract "services", "about", etc.
            const element = document.getElementById(elementId);
            element?.scrollIntoView({ behavior: "smooth" });
        } else {
            // If not on the main page, navigate first
            window.location.href = href;
        }
    };

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return (
        <header className="max-w-[90%] lg:max-w-[80%] 3xl:max-w-[1560px] 4xl:max-w-[1540px] mx-auto flex justify-between items-center mt-8 lg:mt-12 absolute top-0 left-0 right-0 z-50 ">
            <a href="/"><img src={logo.src} alt="Logo" className="w-[100px] sm:w-[120px] md:w-[140px]" loading="eager" />
            </a>
            <div className="lg:hidden">
                <BurgerButton />
            </div>
            <nav className="text-center flex-row hidden items-center lg:flex gap-4 xl:gap-8">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="font-gotham block text-[12px] xl:text-[16px] font-medium text-secondary hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                        onClick={handleLinkClick}
                    >
                        {link.label.toUpperCase()}
                    </a>
                ))}
                <Button
                    text={"Связаться с нами".toUpperCase()}
                    variant="default"
                    width="lg:w-[180px] xl:w-[220px]"
                    height="lg:h-[45px] xl:h-[55px]"
                    fontSize="lg:text-[13px] xl:text-[16px]"
                    onClick={open}
                />
            </nav>
        </header>
    );
};
