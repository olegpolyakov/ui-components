import { isValidElement, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionClassNames, CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { classnames as cn } from '../../utils';

import styles from './Transition.module.scss';

Transition.displayName = 'Transition';

export type TransitionProps = CSSTransitionProps<HTMLDivElement> & {
    children: ReactElement;
    type?:
        | 'blur'
        | 'collapse'
        | 'fade'
        | 'scale'
        | 'slide-left'
        | 'slide-right'
        | 'slide-top'
        | 'slide-bottom'
        | 'zoom';
    disabled?: boolean;
};

const blurClassNames = createTransitionClassNames('blur');
const collapseClassNames = createTransitionClassNames('collapse');
const fadeClassNames = createTransitionClassNames('fade');
const scaleClassNames = createTransitionClassNames('scale');
const slideLeftClassNames = createTransitionClassNames('slideLeft');
const slideRightClassNames = createTransitionClassNames('slideRight');
const slideTopClassNames = createTransitionClassNames('slideTop');
const slideBottomClassNames = createTransitionClassNames('slideBottom');
const zoomClassNames = createTransitionClassNames('zoom');

const typeToClassNames: Record<string, CSSTransitionClassNames> = {
    blur: blurClassNames,
    collapse: collapseClassNames,
    fade: fadeClassNames,
    scale: scaleClassNames,
    ['slide-left']: slideLeftClassNames,
    ['slide-right']: slideRightClassNames,
    ['slide-top']: slideTopClassNames,
    ['slide-bottom']: slideBottomClassNames,
    zoom: zoomClassNames
};

export default function Transition({
    className,
    children,

    type,
    disabled,
    ...props
}: TransitionProps) {
    if (disabled) {
        return children;
    }

    const childClassNames = cn(
        className,
        isValidElement<{className: string}>(children)
            ? children.props.className
            : undefined,
        type && styles[type]
    );
    const transitionClassNames = type 
        ? typeToClassNames[type]
        : undefined;

    return (
        <CSSTransition
            className={childClassNames}
            classNames={transitionClassNames}
            {...props}
        >
            {children}
        </CSSTransition>
    );
}

function createTransitionClassNames(prefix: string): CSSTransitionClassNames {
    return {
        appear: styles[`${prefix}Appear`],
        appearActive: styles[`${prefix}AppearActive`],
        appearDone: styles[`${prefix}AppearDone`],
        enter: styles[`${prefix}Enter`],
        enterActive: styles[`${prefix}EnterActive`],
        enterDone: styles[`${prefix}EnterDone`],
        exit: styles[`${prefix}Exit`],
        exitActive: styles[`${prefix}ExitActive`],
        exitDone: styles[`${prefix}ExitDone`]
    };
}