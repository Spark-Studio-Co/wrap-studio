import Button from "@/shared/ui/button/button";
import { useEffect, useRef, useState, type JSX } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { SelectInput } from "../../../../shared/ui/selector/selector";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const Form = ({
  isFull = false,
  selectedService,
}: {
  isFull?: boolean;
  selectedService?: string | null;
}): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [booking, setBooking] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (selectedService) {
      setBooking([selectedService]);
    } else {
      setBooking([]);
    }
  }, [selectedService]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll(".form-item");

      const isMobile = window.innerWidth < 1024; // lg breakpoint

      gsap.fromTo(
        formElements,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }, // На мобилках - fadeUp, на ПК - слева направо
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2, // Последовательное появление
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const formFields = [
    {
      placeholder: "Имя",
      type: "text",
      name: "name",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
    },
    {
      placeholder: "Телефон",
      type: "tel",
      name: "phone",
      value: phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhone(e.target.value),
    },
    {
      placeholder: "Марка автомобиля (название и модель)",
      type: "text",
      name: "car",
      value: car,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCar(e.target.value),
    },
  ];

  return (
    <form
      ref={formRef}
      className={`flex flex-col w-full gap-4 mt-8 items-center ${isFull
        ? "w-full items-center"
        : "lg:items-start lg:max-w-[55%] 3xl:max-w-[45%] relative"
        }`}
    >
      {formFields.map(({ placeholder, type, name, value, onChange }, index) => (
        <Input
          key={index}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          isPopup={isFull}
        />
      ))}
      <SelectInput
        options={[
          "Шумоизоляция",
          "Химчистка",
          "Антихром",
          "EVA-Коврики",
          "Покраска",
          "Бронепленка",
          "Бронирование салонного пластика",
          "Полное бронирование автомобиля",
          "Standart-пакет",
          "Lux-пакет",
        ]}
        value={booking}
        onChange={setBooking}
        isPopup={isFull}
      />
      <Button
        text="Отправить"
        type="submit"
        className="mt-4 sm:mt-6 md:mt-8 form-item opacity-0"
        width="w-[210px] sm:w-[240px]"
        height="h-[50px] sm:h-[55px]"
        fontSize="text-[16px] sm:text-[18px]"
      />
    </form>
  );
};
