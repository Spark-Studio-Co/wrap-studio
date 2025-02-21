import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    autocomplete?: string;
    isPopup?: boolean;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
    { placeholder, type, name, value, onChange, onBlur, autocomplete = "off", isPopup = false, error, ...props },
    ref
) => {
    return (
        <input
            ref={ref}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autocomplete}
            className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-secondary-dark'} py-3.5 px-4 text-white font-mont-alter font-[400] focus:outline-none placeholder:text-white ${isPopup ? 'text-[12px] sm:text-[13px] md:text-[14px]' : 'text-[14px] sm:text-[16px] md:text-[18px]'}`}
            {...props}
        />
    )
});
