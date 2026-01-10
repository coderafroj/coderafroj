import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={twMerge(
                "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-dim-text focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-mono",
                className
            )}
            {...props}
        />
    );
};

export const Textarea = ({ className, ...props }) => {
    return (
        <textarea
            className={twMerge(
                "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-dim-text focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-mono min-h-[100px]",
                className
            )}
            {...props}
        />
    );
};
