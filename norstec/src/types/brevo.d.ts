export {};

declare global {
    interface Window {
        REQUIRED_CODE_ERROR_MESSAGE?: string;
        LOCALE?: string;
        EMAIL_INVALID_MESSAGE?: string;
        SMS_INVALID_MESSAGE?: string;
        REQUIRED_ERROR_MESSAGE?: string;
        GENERIC_INVALID_MESSAGE?: string;
        translation?: {
            common: {
                selectedList: string;
                selectedLists: string;
                selectedOption: string;
                selectedOptions: string;
            };
        };
        AUTOHIDE?: boolean;
    }
}
