import React from 'react';
import styled from 'styled-components';
import { CasesList } from './features/cases/CasesList';

const StyledApp = styled.div`
  text-align: center;
`;

function App() {
  return (
    <StyledApp>
      <CasesList />
    </StyledApp>
  );
}

export default App;
