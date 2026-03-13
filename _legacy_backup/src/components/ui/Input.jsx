import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={twMerge(
                "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-dim-text focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-mono",
                className
            )}
            {...props}
        />
    );
});
Input.displayName = 'Input';

export const Textarea = forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={twMerge(
                "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-dim-text focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-mono min-h-[100px]",
                className
            )}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';
