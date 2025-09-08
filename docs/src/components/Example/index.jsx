import { Children, isValidElement, useState } from 'react';
import { Card, IconButton } from 'mdc-react';

export default function Example({ controls, children }) {
    const [isCodeOpen, setCodeOpen] = useState(false);

    return (
        <section className="example">
            <Card outlined>
                <Card.Header
                    overline="Example"
                    actions={
                        <IconButton
                            icon={isCodeOpen ? 'code_off' : 'code'}
                            onClick={() => setCodeOpen(v => !v)}
                        />
                    }
                />

                <Card.Section primary>
                    {children}
                </Card.Section>

                {isCodeOpen &&
                    <Card.Section primary>
                        <pre>
                            <code>
                                {Children.toArray(children)
                                    .map(component => printComponent(component))
                                    .join('\n')
                                }
                            </code>
                        </pre>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}