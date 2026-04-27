import Link from "next/link";
import clsx from "clsx";
import type { MouseEventHandler } from "react";

export const buttonClass = "btn whitespace-nowrap text-body-sm font-DMSans-500";

type ButtonProps = {
    variant?: 'primary' | 'ghost' | 'danger';
    disabled?: boolean;
    classN?: string;
    link: string;
    text: string;
    newTab?: boolean;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function Button({text, variant = 'primary', disabled = false, newTab = false, classN = "", link, onClick}: ButtonProps) {
    return (
        <Link 
            href={link}
            className={clsx(
                buttonClass,
                {
                    'btn-primary': variant === 'primary',
                    'btn-ghost': variant === 'ghost',
                    'btn-danger': variant === 'danger',
                    'btn-disabled': disabled
                },
                classN
            )}
            target={newTab ? "_blank" : ""}
            rel={newTab ? "noopener noreferrer" : ""}
            onClick={onClick}
        >
            {text}
        </Link>
    );
}
