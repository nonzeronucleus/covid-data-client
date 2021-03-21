import React from 'react';
import styled, {keyframes} from 'styled-components';
import logo from './logo.svg';
import { CasesList } from './features/cases/CasesList';

const StyledApp = styled.div`
  text-align: center;
`;

const LogoBounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px)
  }
  100% {
    transform: translateY(0px)
  }
`;


const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;
  animation: ${LogoBounce} infinite 3s ease-in-out;
`;

const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;


const StyledLink = styled.a`
  color: rgb(112, 76, 182);
`;

const AppLink = ({href, children}) =>
  <StyledLink href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </StyledLink>;


function App() {
  return (
    <StyledApp>
      <Header>
        <CasesList />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <AppLink href="https://reactjs.org/">
            Reactd
          </AppLink>
          <span>, </span>
          <AppLink href="https://redux.js.org/">
            Redux
          </AppLink>
          <span>, </span>
          <AppLink href="https://redux-toolkit.js.org/">
            Redux Toolkit
          </AppLink>
          ,<span> and </span>
          <AppLink href="https://react-redux.js.org/">
            React Redux
          </AppLink>
        </span>
      </Header>
    </StyledApp>
  );
}

export default App;
