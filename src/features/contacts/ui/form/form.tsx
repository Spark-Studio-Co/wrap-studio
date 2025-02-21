import Button from "@/shared/ui/button/button";
import { useEffect, type JSX } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { SelectInput } from "../../../../shared/ui/selector/selector";
import { useSendEmail, type SendFormData } from "@/entities/email/useSendEmail";

type FormField = {
  placeholder: string;
  type: string;
  name: keyof SendFormData;
  autocomplete?: string;
  validation: any;
};

export const Form = ({
  isFull = false,
  selectedService,
}: {
  isFull?: boolean;
  selectedService?: string | null;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useSendEmail();

  const services = watch('services') ? watch('services').split(',').map(s => s.trim()).filter(Boolean) : [];

  useEffect(() => {
    if (selectedService) {
      setValue('services', selectedService, { shouldValidate: true });
    }
  }, [selectedService, setValue]);

  const formFields: FormField[] = [
    {
      placeholder: "Имя",
      type: "text",
      name: "full_name",
      autocomplete: "name",
      validation: { required: "Имя обязательно" }
    },
    {
      placeholder: "Телефон",
      type: "tel",
      name: "phone_number",
      autocomplete: "tel",
      validation: {
        required: "Телефон обязателен",
        pattern: {
          value: /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
          message: "Неверный формат телефона"
        }
      }
    },
    {
      placeholder: "Марка автомобиля (название и модель)",
      type: "text",
      name: "brand",
      autocomplete: "off",
      validation: { required: "Укажите марку автомобиля" }
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col relative z-50 w-full gap-4 mt-8 items-center ${isFull
        ? "w-full items-center"
        : "lg:items-start lg:max-w-[55%] 3xl:max-w-[45%] relative"
        }`}
    >
      {formFields.map(({ placeholder, type, name, autocomplete, validation }) => {
        const { onChange, onBlur, name: fieldName, ref } = register(name, validation);
        return (
          <div key={name} className="w-full">
            <Input
              ref={ref}
              placeholder={placeholder}
              type={type}
              name={fieldName}
              onChange={onChange}
              onBlur={onBlur}
              autocomplete={autocomplete}
              isPopup={isFull}
              error={errors[name]?.message}
            />
            {errors[name] && (
              <span className="text-red-500 text-xs lg:text-sm mt-1 font-mont-alter">
                {errors[name]?.message}
              </span>
            )}
          </div>
        );
      })}
      <SelectInput
        options={[
          "Шумоизоляция",
          "Химчистка",
          "Антихром",
          "EVA-Коврики",
          "Покраска",
          "Бронепленка",
          "Standart-пакет",
          "Lux-пакет",
          'Mini-pack',
          'Front-pack',
          'Полная шумоизоляция',
          'Химчистка с разбором',
          "Полное бронирование авто"
        ]}
        value={services}
        onChange={(selected) => {
          const uniqueSelected = [...new Set(selected)];
          setValue('services', uniqueSelected.join(', '), { shouldValidate: true });
        }}
        isPopup={isFull}
        error={errors.services?.message}
      />
      <Button
        text={isSubmitting ? "Отправка..." : "Отправить"}
        type="submit"
        variant="default"
        onClick={() => { }}
        className={`mt-4 sm:mt-6 md:mt-8 ${isSubmitting ? 'opacity-70' : ''}`}
        width="w-[210px] sm:w-[240px]"
        height="h-[50px] sm:h-[55px]"
        fontSize="text-[16px] sm:text-[18px]"
      />
    </form>
  );
};
