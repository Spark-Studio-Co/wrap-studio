import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMenuStore } from "../../model/menu-store";
import { useBurgerMenuStore } from "../../model/burger-menu-store";

import { links } from "../../model/links";
import InstagramIcon from "/public/images/instagram-icon-darker.svg";

const Menu = () => {
    const menuRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);
    const isOpen = useMenuStore((state) => state.isOpen);
    const closeMenu = useMenuStore((state) => state.close);
    const toggleBurgerMenu = useBurgerMenuStore((state) => state.toggleMenu);


    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        closeMenu();
        toggleBurgerMenu();

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });

        if (!menuRef.current) return;

        timeline.current
            .to(menuRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power3.out",
            })
            .from(
                ".menu-item",
                {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: "power2.out",
                },
                "-=0.2"
            );

        return () => {
            if (timeline.current) {
                timeline.current.kill();
            }
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (timeline.current) {
                timeline.current.play();
            }
        } else {
            if (timeline.current) {
                timeline.current.reverse();
            }
        }
    }, [isOpen]);

    return (
        <div
            ref={menuRef}
            className={`absolute inset-0 bg-[#080808] flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 ${isOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
                } z-40`}
        >
            <nav className="text-center flex flex-col mt-16">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="menu-item font-gotham block text-2xl font-medium mb-8 text-primary"
                        onClick={handleLinkClick}
                    >
                        {link.label.toUpperCase()}
                    </a>
                ))}
            </nav>
            <div className="menu-item flex flex-col items-center">
                <a
                    href="tel:+7 702 898 83 58"
                    className="font-mont-alter font-[400] text-[20px] sm:text-[24px] md:text-[28px] text-center text-primary-dark mt-8"
                >
                    +7 702 898 83 58
                </a>
                <a
                    href="https://2gis.kz/pavlodar/search/%D0%A3%D0%BB.%20%D0%BD%D1%83%D1%80%D0%BA%D0%B8%D0%BD%D0%B0%20104%2F1/geo/15622496862608837/76.963775%2C52.250869?m=76.963813%2C52.250887%2F17.59"
                    target="_blank"
                    className="font-mont-alter font-[400] text-[20px] sm:text-[24px] md:text-[28px] text-center text-primary-dark uppercase mt-4"
                >
                    Ул. нуркина 104/1
                </a>
                <a href="https://www.instagram.com/wrap_studio.pvl" target="_blank" className="mt-4">
                    <img src={InstagramIcon.src} alt="Instagram Icon" loading="lazy" />
                </a>
            </div>
        </div>
    );
};

export default Menu;