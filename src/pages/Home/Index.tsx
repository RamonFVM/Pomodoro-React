import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomerContainer, Seperator } from "./styles";

export function Home() {

    return (
        <HomerContainer>

            <form action="">
                <FormContainer>
                <label htmlFor="">Vou trabalhar em</label>
                <input id="task" />

                <label htmlFor="">Durante</label>
                <input type="number" id="minutesAmount" />

                <span>minutos.</span>
                </FormContainer>

            <CountDownContainer>
                <span>0</span>
                <span>0</span>
                <Seperator>:</Seperator>
                <span>0</span>
                <span>0</span>
            </CountDownContainer>
            <button type="submit">
                <Play size={24}/>
                Começar</button>
            </form>
        </HomerContainer>


    );
}