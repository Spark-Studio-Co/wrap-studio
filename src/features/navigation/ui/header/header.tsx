import { BurgerButton } from "./burger-button";
import { useEffect } from "react";
import Button from '../../../../shared/ui/button/button'


import { links } from "../../model/links";
import logo from '/public/images/logo.svg'

export const Header = () => {

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");

        setTimeout(() => {
            const element = document.querySelector(href as string);
            element?.scrollIntoView({ behavior: "smooth" });
        }, 500);
    };

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return (
        <header className="max-w-[90%] lg:max-w-[80%] 3xl:max-w-[1560px] 4xl:max-w-[1800px] mx-auto flex justify-between items-center mt-8 lg:mt-12 absolute top-0 left-0 right-0 z-50 ">
            <img src={logo.src} alt="Logo" className="w-[100px] sm:w-[120px] md:w-[140px]" />
            <div className="lg:hidden">
                <BurgerButton />
            </div>
            <nav className="text-center flex-row hidden items-center lg:flex gap-4 xl:gap-8">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="font-gotham block text-[13px] xl:text-[16px] font-medium text-secondary hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                        onClick={handleLinkClick}
                    >
                        {link.label.toUpperCase()}
                    </a>
                ))}
                <Button
                    text={"Связаться с нами".toUpperCase()}
                    variant="link"
                    href="#contacts"
                />
            </nav>
        </header>
    );
};
