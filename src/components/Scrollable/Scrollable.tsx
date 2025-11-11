import type { PropsWithChildren } from '../../types';
import useScrollable from './useScrollable';

export type ScrollerProps = {
    height?: string | number;
};

export default function Scrollable({
    children,
    className,

    height,
    ...props
}: PropsWithChildren<ScrollerProps>) {
    const ref = useScrollable<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={className}
            style={height ?
                { height: `${height}px` }
                : undefined
            }
            data-scrollable
            {...props}
        >   
            {children}
        </div>
    );
}