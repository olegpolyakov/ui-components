import { forwardRef } from 'react';

import { Gender, HTMLDivProps, Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Avatar from '../Avatar';
import Pill from '../Pill';

import cssClasses from './Persona.scss';

export type PersonaProps = Props<{
  as?: 'span';
  name: string;
  imageUrl?: string;
  age?: number | string;
  relation?: string;
  gender?: Gender;
  size?: Size;
}, HTMLDivProps>;

const displayName = 'Persona';
const elementClassNames = getElementClassNames(displayName, ['avatar', 'content', 'meta', 'name', 'age', 'relation']);

const Persona = forwardRef<HTMLDivElement, PersonaProps>(({
    name,
    imageUrl,
    age,
    relation,
    gender,
    size = 'medium',

    className
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        size && cssClasses[size]
    );

    return (
        <div
            ref={ref}
            className={classNames}
        >
            <Avatar
                className={cn(elementClassNames.avatar, cssClasses.avatar)}
                content={name?.at(0)}
                src={imageUrl}
                gender={gender}
                shape="rounded"
                size={size}
            />

            <div className={cn(elementClassNames.content, cssClasses.content)}>
                <span className={cn(elementClassNames.name, cssClasses.name)}>
                    {name}
                </span>

                {(age || relation) &&
                    <div className={cn(elementClassNames.meta, cssClasses.meta)}>
                        {age &&
                            <span className={cn(elementClassNames.age, cssClasses.age)}>
                                {age}
                            </span>
                        }
                        
                        {relation &&
                            <span className={cn(elementClassNames.relation, cssClasses.relation)}>
                                {relation}
                            </span>
                        }
                    </div>
                }
            </div>
        </div>
    );
});

Persona.displayName = displayName;

export default Persona;