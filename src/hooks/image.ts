import { useEffect, useRef, useState } from 'react';

export function useImage(src?: string) {
    const ref = useRef<HTMLImageElement>(null);
    
    const [isLoading, setLoading] = useState(true);
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if (!src || !ref.current) return;
    
        const image = ref.current;

        function handleLoadStart() {
            setLoading(true);
            setLoaded(false);
        }
    
        function handleLoad() {
            setLoading(false);
            setLoaded(true);
        }
    
        function handleError() {
            setLoading(false);
            setLoaded(false);
        }
    
        image.addEventListener('loadstart', handleLoadStart);
        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);
    
        return () => {
            image.removeEventListener('loadstart', handleLoadStart);
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
        };
    }, [src]);

    return {
        ref,
        isLoading,
        isLoaded
    };
}