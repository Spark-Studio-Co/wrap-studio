import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { usePopupStore } from '@/shared/model/open-popup-store';
import { Form } from '../form/form';

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

export const FormPopup = () => {
    const { close, isOpen } = usePopupStore('formPopup');
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
                        className="bg-[#080808] relative p-8 max-w-md flex flex-col items-center text-center border border-secondary-dark rounded-[12px] w-full"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <span
                            className="absolute inset-0 flex justify-center items-center text-[128px] font-walk-da-walk font-[400] text-secondary opacity-5 z-0"
                            style={{ fontFamily: "Walk Da Walk One, sans-serif" }}
                        >
                            WRAP STUDIO
                        </span>
                        <button
                            onClick={close}
                            className="text-primary transition-colors absolute right-4 top-4"
                            aria-label='button close'
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className='relative z-10 w-full'>
                            <Form isFull />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};