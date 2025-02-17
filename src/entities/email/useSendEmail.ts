import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import { usePopupStore } from "@/shared/model/open-popup-store";

export interface SendFormData {
    full_name: string;
    phone_number: string;
    brand: string;
    services: string;
}

export function useSendEmail() {
    const {
        register,
        handleSubmit: hookHandleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm<SendFormData>({
        mode: "onBlur",
        defaultValues: {
            services: ''
        },
        resolver: (values) => {
            const errors: Record<string, { type: string; message: string }> = {};

            if (!values.full_name?.trim()) {
                errors.full_name = {
                    type: 'required',
                    message: 'Имя обязательно'
                };
            } else if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(values.full_name)) {
                errors.full_name = {
                    type: 'pattern',
                    message: 'Имя может содержать только буквы'
                };
            }

            if (!values.phone_number?.trim()) {
                errors.phone_number = {
                    type: 'required',
                    message: 'Телефон обязателен'
                };
            } else if (!/^[0-9+]+$/.test(values.phone_number)) {
                errors.phone_number = {
                    type: 'pattern',
                    message: 'Телефон может содержать только цифры'
                };
            }

            if (!values.brand?.trim()) {
                errors.brand = {
                    type: 'required',
                    message: 'Укажите марку автомобиля'
                };
            }

            if (!values.services) {
                errors.services = {
                    type: 'required',
                    message: 'Выберите хотя бы одну услугу'
                };
            }

            return {
                values,
                errors
            };
        }
    });

    const successPopup = usePopupStore('success');
    const formPopup = usePopupStore('formPopup');

    const onSubmit = async (data: SendFormData, event?: React.BaseSyntheticEvent) => {
        console.log('Form submission started with data:', data);
        if (!event) return;

        event.preventDefault();

        // Validate services
        if (!data.services) {
            return;
        }

        try {
            console.log('🚀 Sending email via EmailJS...');
            const tempForm = document.createElement('form');
            Object.entries(data).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.name = key;
                input.value = value as string;
                tempForm.appendChild(input);
            });

            await emailjs.sendForm(
                "service_wgozz1s",
                "template_4z4xskx",
                tempForm,
                "hAy6SBRUFNQjMv_2f"
            );
            console.log('✅ Email sent successfully!');

            // Close form popup immediately
            formPopup.close();
            
            // Reset form and show success popup
            reset();
            successPopup.open();

            console.log('🔄 Form reset complete');
        } catch (error) {
            console.error('❌ Error sending email:', error);
            throw new Error('Failed to send email');
        }
    };

    return {
        register,
        handleSubmit: hookHandleSubmit(onSubmit),
        formState: { errors, isSubmitting },
        setValue,
        watch
    };
}