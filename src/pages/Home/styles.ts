
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

`;
export const Seperator = styled.div`
padding: 2rem 0;
width: 4rem;
color:${(props)=>  props.theme["green-500"]}; 
overflow: hidden;
display: flex;
justify-content: center;
`;

const Baseinput= styled.input`
background-color:transparent;
height: 2.5rem;
border: 0;
border-bottom: 2px solid ${(props)=>  props.theme["gray-500"]};
font-weight: bold;
font-size: 1.125rem;
padding:  0 0.5rem;
color:${(props)=>  props.theme["gray-100"]}; 



&::Placeholder{

color: ${(props)=>  props.theme["gray-500"]}; 
}

&:focus{
    box-shadow: none;
    border-color: ${(props)=>  props.theme["green-500"]};  

}

`;


export const TaskInput= styled(Baseinput)`
flex:1;
&::-webkit-calendar-picker-indicator{
    display: none !important;
}

`;

export const MinutesAmountInput= styled(Baseinput)`
width: 4rem;


`;


export const StartCountdownButton =styled.button`

width: 100%;
padding: 16px;
border: 0;
padding: 1rem;
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
gap: 0.5rem;
cursor: pointer;
background-color:${(props)=>  props.theme["green-500"]};  
color:${(props)=>  props.theme["gray-100"]}; 

&:disabled{
    opacity: 0.7;
    cursor: not-allowed;
}

&:not(:disabled):hover{
    background-color:${(props)=>  props.theme["green-700"]};  
};`