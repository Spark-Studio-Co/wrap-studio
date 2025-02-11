import { create, type StoreApi, type UseBoundStore } from "zustand";

interface IOpenPopupStore {
    isOpen: boolean;
    open: (service?: string, contentTitle?: string, contentText?: string) => void;
    close: () => void;
    selectedService: string | null;
    contentTitlePopup: string | null;
    contentTextPopup: string | null;
}

const popupStorage: Record<string, UseBoundStore<StoreApi<IOpenPopupStore>>> = {};

export const usePopupStore = (storeKey: string) => {
    if (!popupStorage[storeKey]) {
        popupStorage[storeKey] = create<IOpenPopupStore>((set) => ({
            isOpen: false,
            open: (service?: string, contentTitle?: string, contentText?: string) => set({ isOpen: true, selectedService: service, contentTitlePopup: contentTitle, contentTextPopup: contentText }),
            close: () => set({ isOpen: false }),
            selectedService: null,
            contentTitlePopup: null,
            contentTextPopup: null,
        }));
    }

    return popupStorage[storeKey]();
}