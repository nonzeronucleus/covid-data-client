import React from 'react';
import { useSelector } from 'react-redux';

import {selectCases} from './CasesSlice';

export const CasesList = () => {
    const cases = useSelector(selectCases);

    return (
        <div>{JSON.stringify(cases)}</div>
    )
}

