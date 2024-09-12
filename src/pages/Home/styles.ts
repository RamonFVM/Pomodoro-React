import styled from "styled-components";

export const  HomerContainer = styled.main`
display: flex;
flex: 1;
flex-direction: column;
align-items: center;
justify-content: center;

form{

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
}
`;
export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${(props)=>  props.theme["gray-100"]};
font-size: 1.125rem;
font-weight: bold;
flex-wrap:wrap;
`

export const CountDownContainer = styled.div`
font-size: 'Roboto Mono', monospace;
font-size: 10rem;
display: flex;
gap: 1rem;
line-height: 8rem;
color: ${(props)=>  props.theme["gray-100"]};

span{
    background-color:${(props)=>  props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
}
`
export const Seperator = styled.div`
padding: 2rem 0;
width: 4rem;
color:${(props)=>  props.theme["green-500"]}; 
overflow: hidden;
display: flex;
justify-content: center;
`;