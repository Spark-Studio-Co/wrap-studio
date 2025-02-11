import React, { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectInputProps {
    options: string[];
    name: string;
    value: string[];
    onChange: (value: string[]) => void;
    isPopup?: boolean;
}

export const SelectInput = ({ options, name, value, onChange, isPopup = false }: SelectInputProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
        if (value.includes(option)) {
            onChange(value.filter((item) => item !== option));
        } else {
            onChange([...value, option]);
        }
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                className={`w-full bg-transparent border border-secondary-dark py-3.5 px-4 text-white font-mont-alter font-[400] focus:outline-none flex justify-between items-center ${isPopup ? "text-[12px] sm:text-[13px] md:text-[14px]" : "text-[14px] sm:text-[16px] md:text-[18px]"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value.length > 0 ? value.join(", ") : "Что вы хотите забронировать?"}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-white" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 top-full w-full mt-1 bg-black border border-secondary-dark overflow-hidden max-h-32 sm:max-h-40 lg:max-h-36 overflow-y-auto"
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                className={`${isPopup ? "text-[12px] sm:text-[13px] md:text-[14px]" : "text-[14px] sm:text-[16px] md:text-[18px]"} px-4 py-3 flex items-start gap-2 cursor-pointer transition font-mont-alter  ${value.includes(option) ? " text-primary" : "hover:bg-secondary-dark text-white"} `}
                                onClick={() => toggleOption(option)}
                            >
                                <CheckCircle className={`w-5 h-5 ${value.includes(option) ? "text-primary" : "text-gray-500"}`} />
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};