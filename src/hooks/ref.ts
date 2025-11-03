import { Ref, RefObject, useCallback, useRef } from 'react';

export default function useComposedRef<T extends HTMLElement>(
    libRef: RefObject<T | null>,
    userRef: Ref<T>
) {
    const prevUserRef = useRef<Ref<T> | null>(null);

    return useCallback(
        (instance: T | null) => {
            libRef.current = instance;

            if (prevUserRef.current) {
                updateRef(prevUserRef.current, null);
            }

            prevUserRef.current = userRef;

            if (!userRef) {
                return;
            }

            updateRef(userRef, instance);
        },
        [libRef, userRef]
    );
};

function updateRef<T>(ref: NonNullable<Ref<T>>, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
        return;
    }

    ref.current = value;
}