import React from 'react';
import {  useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchCasesByArea } from '../cases/CasesSlice';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Button = styled.button`
  appearance: none;
  background: none;
  font-size: 32px;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  border: 2px solid transparent;
  color: rgb(112, 76, 182);
  padding-bottom: 4px;
  cursor: pointer;
  background-color: rgba(112, 76, 182, 0.1);
  border-radius: 2px;
  transition: all 0.15s;

  :hover, :focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }

  :active {
    background-color: rgba(112, 76, 182, 0.2);
  }


`;


export function CasesLoader() {
  const dispatch = useDispatch();

  return (
    <div>
      <Row>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(fetchCasesByArea())}
        >
          Load
        </Button>
      </Row>
    </div>
  );
}
