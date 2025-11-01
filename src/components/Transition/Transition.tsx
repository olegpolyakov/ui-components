import { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

Transition.displayName = 'Transition';

export type TransitionProps = CSSTransitionProps<HTMLDivElement> & {
    children: ReactNode;
};

export default function Transition({
    children,
    ...props
}: TransitionProps) {
    return (
        <CSSTransition {...props}>
            {children}
        </CSSTransition>
    );
}