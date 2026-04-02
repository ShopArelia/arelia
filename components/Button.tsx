import React from "react";
import clsx from "clsx";
import { DMSans400 } from "@/app/fonts";

type ButtonProps = {
    variant?: 'primary' | 'ghost' | 'danger';
    disabled?: boolean;
    className?: string;
    link: string;
    text: string;
};

export default function Button({text, variant = 'primary', disabled = false, className, link}: ButtonProps) {
    return (
        <a 
            href={link}
            className={clsx(
                'btn text-body-sm font-DMSans-500',
                {
                    'btn-primary': variant === 'primary',
                    'btn-ghost': variant === 'ghost',
                    'btn-danger': variant === 'danger',
                    'btn-disabled': disabled
                },
                className
            )}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </a>
    );
}