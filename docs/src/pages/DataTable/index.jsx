import { useCallback, useState } from 'react';
import { DataTable } from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'data-table';
const title = 'Data Table';
const description = 'Data tables display sets of data across rows and columns.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-data-table',
    guide: 'https://material.io/components/data-tables'
};

const table = [
    ['Frozen yogurt', 24, 4.0, 'Super tasty'],
    ['Ice cream sandwich', 37, 4.33333333333, 'I like ice cream more'],
    ['Eclair', 24, 6.0, 'New filing flavor']
];

export default function DataTablePage() {
    const [data, setData] = useState(table);
    const [sort, setSort] = useState(0);

    const handleSort = useCallback(() => {
        setSort(sort => {
            if (sort === -1) {
                setData(data => data.slice().sort((a, b) => a[1] - b[1]));
                setSort(1);
            } else {
                setData(data => data.slice().sort((a, b) => b[1] - a[1]));
                setSort(-1);
            }
        });
    }, []);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Sortable data table">
                <DataTable>
                    <DataTable.Header>
                        <DataTable.HeaderRow>
                            <DataTable.HeaderCell>Dessert</DataTable.HeaderCell>
                            <DataTable.HeaderCell numeric sort={sort} onSort={handleSort}>Carbs (g)</DataTable.HeaderCell>
                            <DataTable.HeaderCell numeric>Protein (g)</DataTable.HeaderCell>
                            <DataTable.HeaderCell>Comments</DataTable.HeaderCell>
                        </DataTable.HeaderRow>
                    </DataTable.Header>

                    <DataTable.Content>
                        {data.map((row, index) =>
                            <DataTable.Row key={index}>
                                {row.map((value, index) =>
                                    <DataTable.Cell key={index} scope={index === 0 ? 'row' : undefined} numeric={typeof value === 'number' || undefined}>
                                        {value}
                                    </DataTable.Cell>
                                )}
                            </DataTable.Row>
                        )}
                    </DataTable.Content>
                </DataTable>
            </Demo>
        </Page>
    );
}