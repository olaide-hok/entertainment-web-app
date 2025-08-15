'use client';

import {cn} from '@/lib/utils';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    name: string;
    className?: string;
}

const variants = {
    primary:
        'bg-(--clr-white) text-(--clr-blue-900) hover:bg-(--clr-red-500) hover:text-white text-(length:--fs-15) py-[0.875rem] rounded-[0.375rem]',
    secondary:
        'bg-(--clr-red-500) text-(--clr-white) hover:bg-(--clr-white) hover:text-(--clr-blue-900) text-(length:--fs-15) py-[0.875rem] rounded-[0.375rem]',
};

const Button = ({
    variant = 'primary',
    name,
    className,
    ...props
}: React.ComponentProps<'button'> & ButtonProps) => {
    return (
        <button
            type="button"
            className={cn(`${variants[variant]} ${className} font-light`)}
            {...props}>
            {name}
        </button>
    );
};

export default Button;
