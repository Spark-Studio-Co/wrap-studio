import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { usePopupStore } from '@/shared/model/open-popup-store';

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

export const ContentPopup = () => {
    const { close, isOpen, contentTitlePopup, contentTextPopup } = usePopupStore('contentPopup');
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
                        role="dialog" aria-labelledby="modal-title" aria-describedby="modal-content"
                        ref={popupRef}
                        className="bg-[#080808] relative p-6 max-w-md flex flex-col items-center text-center border border-secondary-dark rounded-[12px] w-full"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className='flex flex-col items-start relative'>
                            <span
                                className="absolute inset-0 flex justify-center items-center text-[70px] md:text-[80px] leading-none font-walk-da-walk font-[400] text-secondary opacity-5 -z-0"
                                style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
                            >
                                WRAP STUDIO
                            </span>
                            <h2 className="text-white font-gotham font-[400] text-[28px] lg:text-[22px] xl:text-[28px] relative z-10"
                            >{contentTitlePopup}</h2>
                            <p className="text-secondary text-left font-mont-alter font-[400] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-[22px] 3xl:leading-[26px] lg:w-full xl:max-w-[382px] relative z-10"
                            >{contentTextPopup}</p>
                            <button
                                onClick={close}
                                className="mt-6 px-6 py-2 bg-primary text-white font-gotham rounded-full font-montserrat hover:bg-primary/90 transition-colors relative z-10"
                            >
                                Закрыть
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
};