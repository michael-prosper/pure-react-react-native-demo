export type ButtonSize = "small" | "large";

export interface ButtonProps {
    label: string;
    size?: ButtonSize;
    onClick: () => void;
    disabled?: boolean;
}
