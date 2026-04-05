import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
    variant?: 'primary' | 'ghost' | 'danger';
    disabled?: boolean;
    classN?: string;
    link: string;
    text: string;
    newTab?: boolean;
};

export default function Button({text, variant = 'primary', disabled = false, newTab = false, classN = "", link}: ButtonProps) {
    return (
        <Link 
            href={link}
            className={clsx(
                'btn text-body-sm font-DMSans-500',
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
        >
            {text}
        </Link>
    );
}