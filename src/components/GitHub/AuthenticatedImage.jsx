import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

const AuthenticatedImage = ({ src, alt, className, token, apiUrl, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        // Reset state when props change
        setImageSrc(src);
        setIsLoading(true);
        setError(false);
        setIsRetrying(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
        setError(false);
        setIsRetrying(false);
    };

    const handleError = async () => {
        // If we are already displaying the blob URL and it failed, or if we don't have API credentials
        if (imageSrc !== src || !apiUrl || !token) {
            console.error('Image load failed permanently:', alt);
            setIsLoading(false);
            setError(true);
            return;
        }

        // Try fallback
        console.log('Image load failed, trying authenticated fetch:', alt);
        setIsRetrying(true);

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.raw'
                }
            });

            if (!response.ok) throw new Error('Fetch failed');

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
            // Don't set isLoading to false here, the img tag will fire onLoad when the blob is ready
        } catch (err) {
            console.error('Authenticated fetch failed:', err);
            setIsLoading(false);
            setError(true);
            setIsRetrying(false);
        }
    };

    // Cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (imageSrc && imageSrc.startsWith('blob:')) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!error ? (
                <img
                    src={imageSrc}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <ImageIcon className="w-1/3 h-1/3 text-white/20" />
                </div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}
        </div>
    );
};

export default AuthenticatedImage;
