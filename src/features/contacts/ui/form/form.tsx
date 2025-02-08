import { Input } from '../../../../shared/ui/input/input';
import { useState } from 'react';


export const Form = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [car, setCar] = useState('');
    const [booking, setBooking] = useState('');

    const formFields = [
        { placeholder: 'Имя', type: 'text', name: 'name', value: name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) },
        { placeholder: 'Телефон', type: 'tel', name: 'phone', value: phone, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value) },
        { placeholder: 'Марка автомобиля (название и модель)', type: 'text', name: 'car', value: car, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCar(e.target.value) },
        { placeholder: 'Что вы хотите забронировать?', type: 'text', name: 'booking', value: booking, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBooking(e.target.value) },
    ];

    return (
        <form className="flex flex-col w-full gap-4 mt-8 items-center ">
            {formFields.map(({ placeholder, type, name, value, onChange }, index) => (
                <Input
                    key={index}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            ))}
            <button type="submit" className="w-[210px] sm:w-[240px] h-[50px] sm:h-[55px] bg-primary rounded-[32px] text-white text-[16px] sm:text-[18px] font-mont-alter font-[500] mt-4 sm:mt-6 md:mt-8 uppercase">Отправить</button>
        </form>
    );
};