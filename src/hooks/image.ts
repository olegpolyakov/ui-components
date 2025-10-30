import { useEffect, useRef, useState } from 'react';

export function useImage(src?: string) {
    const ref = useRef<HTMLImageElement>(null);
    
    const [isLoading, setLoading] = useState(true);
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if (!src || !ref.current) return;
    
        setLoading(true);
        setLoaded(false);
    
        const image = ref.current;
    
        function handleLoad() {
            setLoading(false);
            setLoaded(true);
        }
    
        function handleError() {
            setLoading(false);
            setLoaded(false);
        }
    
        if (image.complete && image.naturalHeight !== 0) {
            setLoaded(true);
        } else {
            image.addEventListener('load', handleLoad);
            image.addEventListener('error', handleError);
    
            return () => {
                image.removeEventListener('load', handleLoad);
                image.removeEventListener('error', handleError);
            };
        }
    }, [src]);

    return {
        ref,
        isLoading,
        isLoaded
    };
}