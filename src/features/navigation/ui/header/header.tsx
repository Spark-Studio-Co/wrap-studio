import { BurgerButton } from "./burger-button";
import { Image } from "astro:assets";
import { useEffect } from "react";


import Logo from '/public/images/logo.svg'



export const Header = () => {

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return (
        <header className="w-full flex justify-between items-center mt-8">
            <img src={Logo.src} alt="Logo" className="w-[100px]" />
            <div className="lg:hidden">
                <BurgerButton />
            </div>
        </header>
    );
};