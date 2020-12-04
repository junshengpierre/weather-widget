import React from "react";
import logo from "./logo.png";
import tw, { GlobalStyles, styled } from "twin.macro";
import { keyframes, createGlobalStyle } from "styled-components";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <GlobalStyle />
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
      </AppHeader>
      <Form>
        <TextInput data-testid="search-input" type="text" />
        <SubmitButton type="submit" value="Search" />
      </Form>
    </AppContainer>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
  }

  ol,
  ul {
    list-style: none;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  ${tw`px-4`}
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const AppLogo = styled.img`
  animation: ${float} infinite 3s ease-in-out;
  pointer-events: none;
  ${tw``}
`;

const AppHeader = styled.header`
  ${tw`flex justify-center pt-4 pb-12`}
`;

const Form = styled.form`
  ${tw`flex w-full`}
`;

const TextInput = styled.input`
  ${tw`border rounded border-gray-400 px-2.5 py-1 w-full`}
`;

const SubmitButton = styled.input`
  ${tw`border rounded border-gray-400 px-4 py-1 ml-4`}
`;
