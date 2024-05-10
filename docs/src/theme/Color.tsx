import React, { ReactNode } from 'react';

import './Color.css';

export default function Color({
    ...props
}: {
    style?: Record<string, string>,
    children?: ReactNode | ReactNode[];
}) {
    return (
        <div
            className="Color"
            {...props}
        />
    );
}