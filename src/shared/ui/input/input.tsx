import React from 'react'

export const Input = ({ placeholder, type, name, value, onChange, isPopup = false }: { placeholder: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, isPopup?: boolean }) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full bg-transparent border border-secondary-dark py-3.5 px-4 text-white font-mont-alter font-[400] focus:outline-none placeholder:text-white ${isPopup ? 'text-[12px] sm:text-[13px] md:text-[14px]' : 'text-[14px] sm:text-[16px] md:text-[18px]'}`}
        />
    )
}
