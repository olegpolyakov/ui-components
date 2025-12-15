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

const blurClassNames: CSSTransitionClassNames = {
    enter: styles.blurEnter,
    enterActive: styles.blurEnterActive,
    enterDone: styles.blurEnterDone,
    exit: styles.blurExit,
    exitActive: styles.blurExitActive,
    exitDone: styles.blurExitDone
};

const collapseClassNames: CSSTransitionClassNames = {
    enter: styles.collapseEnter,
    enterActive: styles.collapseEnterActive,
    enterDone: styles.collapseEnterDone,
    exit: styles.collapseExit,
    exitActive: styles.collapseExitActive,
    exitDone: styles.collapseExitDone
};

const fadeClassNames: CSSTransitionClassNames = {
    appear: styles.fadeAppear,
    appearActive: styles.fadeAppearActive,
    appearDone: styles.fadeAppearDone,
    enter: styles.fadeEnter,
    enterActive: styles.fadeEnterActive,
    enterDone: styles.fadeEnterDone,
    exit: styles.fadeExit,
    exitActive: styles.fadeExitActive,
    exitDone: styles.fadeExitDone
};

const scaleClassNames: CSSTransitionClassNames = {
    appear: styles.scaleAppear,
    appearActive: styles.scaleAppearActive,
    appearDone: styles.scaleAppearDone,
    enter: styles.scaleEnter,
    enterActive: styles.scaleEnterActive,
    enterDone: styles.scaleEnterDone,
    exit: styles.scaleExit,
    exitActive: styles.scaleExitActive,
    exitDone: styles.scaleExitDone
};

const slideLeftClassNames: CSSTransitionClassNames = {
    appear: styles.slideLeftAppear,
    appearActive: styles.slideLeftAppearActive,
    appearDone: styles.slideLeftAppearDone,
    enter: styles.slideLeftEnter,
    enterActive: styles.slideLeftEnterActive,
    enterDone: styles.slideLeftEnterDone,
    exit: styles.slideLeftExit,
    exitActive: styles.slideLeftExitActive,
    exitDone: styles.slideLeftExitDone
};

const slideRightClassNames: CSSTransitionClassNames = {
    appear: styles.slideRightAppear,
    appearActive: styles.slideRightAppearActive,
    appearDone: styles.slideRightAppearDone,
    enter: styles.slideRightEnter,
    enterActive: styles.slideRightEnterActive,
    enterDone: styles.slideRightEnterDone,
    exit: styles.slideRightExit,
    exitActive: styles.slideRightExitActive,
    exitDone: styles.slideRightExitDone
};

const slideTopClassNames: CSSTransitionClassNames = {
    appear: styles.slideTopAppear,
    appearActive: styles.slideTopAppearActive,
    appearDone: styles.slideTopAppearDone,
    enter: styles.slideTopEnter,
    enterActive: styles.slideTopEnterActive,
    enterDone: styles.slideTopEnterDone,
    exit: styles.slideTopExit,
    exitActive: styles.slideTopExitActive,
    exitDone: styles.slideTopExitDone
};

const slideBottomClassNames: CSSTransitionClassNames = {
    appear: styles.slideBottomAppear,
    appearActive: styles.slideBottomAppearActive,
    appearDone: styles.slideBottomAppearDone,
    enter: styles.slideBottomEnter,
    enterActive: styles.slideBottomEnterActive,
    enterDone: styles.slideBottomEnterDone,
    exit: styles.slideBottomExit,
    exitActive: styles.slideBottomExitActive,
    exitDone: styles.slideBottomExitDone
};

const zoomClassNames: CSSTransitionClassNames = {
    enter: styles.zoomEnter,
    enterActive: styles.zoomEnterActive,
    exit: styles.zoomExit,
    exitActive: styles.zoomExitActive
};

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