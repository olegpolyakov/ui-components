import { type Modifier, detectOverflow } from '@popperjs/core';

export const maxHeight: Modifier<'maxHeight', object> = {
    name: 'maxHeight',
    enabled: true,
    phase: 'write',
    requiresIfExists: ['offset', 'preventOverflow', 'flip'],
    fn() {
        // const PADDING = 16;
        // const { x = 0, y = 0, height = 0, width = 0 } = menuRef.current?.getBoundingClientRect() || {};

        // if (y === 0) return;

        // const delta = (y + height + PADDING) - window.innerHeight;

        // if (delta > 0) {
        //     const maxHeight = height - delta;
        //     menuRef.current.style.maxHeight = maxHeight + 'px';
        // }
    }
};

export const maxSizeModifier: Modifier<'maxSize', object> = {
    name: 'maxSize',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['offset', 'preventOverflow', 'flip'],
    fn({ state, instance, name }) {
        const overflow = detectOverflow(state);
        const { x, y } = state.modifiersData.preventOverflow || { x: 0, y: 0 };
        const { width, height } = state.rects.popper;
        const [basePlacement] = state.placement.split('-');

        const widthProp = basePlacement === 'left' ? 'left' : 'right';
        const heightProp = basePlacement === 'top' ? 'top' : 'bottom';
        const maxWidth = width - overflow[widthProp] - x;
        const maxHeight = height - overflow[heightProp] - y;

        // state.elements.popper.style.maxWidth = `${maxWidth}px`;
        // state.elements.popper.style.height = `${maxHeight}px`;
    }
};

export const arrowPosition: Modifier<'arrowPosition', object> = {
    name: 'arrowPosition',
    enabled: true,
    phase: 'write',
    fn({ state }) {
        const basePlacement = state.placement.split('-')[0];

        switch (basePlacement) {
            case 'bottom':
                state.styles.arrow.top = '-4px'; break;
            case 'top':
                state.styles.arrow.bottom = '-4px'; break;
            case 'left':
                state.styles.arrow.right = '-4px'; break;
            case 'right':
                state.styles.arrow.left = '-4px'; break;
        }
    }
};