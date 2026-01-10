import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={twMerge(
                'relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed',
                variant === 'primary' && 'bg-primary text-white hover:bg-primary-glow shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]',
                variant === 'outline' && 'border border-gray-700 bg-transparent text-white hover:bg-white/5 hover:border-white/20',
                variant === 'ghost' && 'text-text-muted hover:text-white hover:bg-white/5',
                variant === 'danger' && 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20',
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
            )}
        </motion.button>
    );
};
