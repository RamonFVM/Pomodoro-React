import { createGlobalStyle } from "styled-components";

export const GlobalStyle=createGlobalStyle`

*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

:focus{
    outline: 0;
    box-shadow: 0 0 0 2px  ${props=> props.theme["green-500"]};
} 
body{

    background-color: ${props=> props.theme["gray-900"]};
    color: ${props=> props.theme["gray-300"]};
    -webkit-font-smooothing:antialiased;
}

body{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}
`;