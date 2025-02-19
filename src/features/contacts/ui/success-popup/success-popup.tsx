import { usePopupStore } from '@/shared/model/open-popup-store';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import PcLogoIcon from '/public/images/logo-icon-pc.svg';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const contentVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0.3
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: {
            duration: 0.3
        }
    }
};

export const SuccessPopup = () => {
    const { close, isOpen } = usePopupStore('success');
    const popupRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            close();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleClick}
                >
                    <motion.div
                        ref={popupRef}
                        className="bg-[#080808] relative p-8 max-w-md w-full flex flex-col items-center text-center border border-secondary-dark rounded-[12px]"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <button
                            onClick={close}
                            className=" text-primary transition-colors absolute right-4 top-4"
                            aria-label='button close'
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <>
                            <img src={PcLogoIcon.src} alt="Logo" className="mt-8 mb-6 lg:flex hidden" />
                            <img src={PcLogoIcon.src} alt="Logo" className="mt-8 mb-6 lg:hidden flex w-[260px]" />
                        </>
                        <span className="text-2xl font-bold mb-4 text-primary font-gotham">
                            Сообщение отправлено!
                        </span>
                        <p className="text-secondary text-center font-mont-alter">
                            Мы свяжемся с вами в ближайшее время.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};