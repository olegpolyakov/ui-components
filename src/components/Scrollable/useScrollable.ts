import { useEffect, useRef } from 'react';

export default function useScrollable<T extends HTMLElement>(element: T | null = null) {
    const ref = useRef<T>(element);

    useEffect(() => {
        if (!ref.current) return;
 
        const element = ref.current;
            
        function observe() {
            const hasScrollbar = element.scrollHeight > element.clientHeight;
            element.toggleAttribute('data-scrolling', hasScrollbar);
        }
            
        observe();
            
        const resizeObserver = new ResizeObserver(observe);
        resizeObserver.observe(element);
            
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return ref;
}