import React from 'react'

export const Input = ({ placeholder, type, name, value, onChange }: { placeholder: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border border-secondary-dark py-3.5 px-4 text-white text-[14px] font-mont-alter font-[400] focus:outline-none placeholder:text-white"
        />
    )
}
