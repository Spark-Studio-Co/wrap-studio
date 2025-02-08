import { BurgerButton } from "./burger-button";
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
        <header className="max-w-[90%] lg:max-w-[80%] 3xl:max-w-[1560px] 4xl:max-w-[1800px] mx-auto flex justify-between items-center mt-8 absolute top-0 left-0 right-0 z-50 ">            <img src={Logo.src} alt="Logo" className="w-[100px]" />
            <div className="lg:hidden">
                <BurgerButton />
            </div>
        </header>
    );
};