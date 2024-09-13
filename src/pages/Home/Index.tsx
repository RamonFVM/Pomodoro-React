import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomerContainer, MinutesAmountInput, Seperator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {

    return (
        <HomerContainer>

            <form action="">
                <FormContainer>
                <label htmlFor="">Vou trabalhar em</label>
                <TaskInput  id="task" list="task-suggestions" placeholder="Nome para seu projeto" required/>
                <datalist id="task-suggestions">
                    <option value="projeto 1"/>
                    <option value="projeto 2"/>
                    <option value="projeto 3"/>
                </datalist>

                <label htmlFor="">durante</label>
                <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" required step={5} max={60} min={5}/>

                <span>minutos.</span>
                </FormContainer>

            <CountDownContainer>
                <span>0</span>
                <span>0</span>
                <Seperator>:</Seperator>
                <span>0</span>
                <span>0</span>
            </CountDownContainer>
            <StartCountdownButton disabled type="submit">
                <Play size={24}/>
                Começar</StartCountdownButton>
            </form>
        </HomerContainer>


    );
}