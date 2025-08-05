'use client';

interface ButtonProps {
    variant: 'primary';
    name: string;
    styles?: string;
}

const variants = {
    primary:
        'bg-(--clr-white) text-(--clr-blue-900) hover:bg-(--clr-red-500) hover:text-white text-(length:--fs-15) py-[0.875rem] rounded-[0.375rem]',
};

const Button = ({
    variant = 'primary',
    name,
    styles,
    ...props
}: React.ComponentProps<'button'> & ButtonProps) => {
    return (
        <button
            type="button"
            className={`${variants[variant]}  font-light cursor-pointer ${styles}`}
            {...props}>
            {name}
        </button>
    );
};

export default Button;
