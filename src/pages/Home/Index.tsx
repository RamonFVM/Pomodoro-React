import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useState } from "react";
import { NewCycleform } from "./NewCycleForm";
import { CountDown } from "./CountDown/Index";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date

}
interface CyclesContetexType {
    activeCycle: Cycle | undefined;
    activeCycleId:string | null
    amountSecondsPassed:number
    markCurrentCycleAsFinished:()=>void
    setSecondsPassed:( seconds: number)=>void
}



export const CyclesContext = createContext({} as CyclesContetexType)

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>



export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm= useForm<NewCycleFormData>({


        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
    
    
        },
    })
     const {  handleSubmit, watch, reset } = newCycleForm


    const activeCycle = cycles.find((cycles => cycles.id == activeCycleId))

    function setSecondsPassed(seconds:number){
        setAmountSecondsPassed (seconds)
    }

    function markCurrentCycleAsFinished(){

        setCycles( state=>state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle, 
                    finishedDate: new Date()  
                };
            } else {
                return cycle;
            }
        }));
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {

            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),


        }

        setCycles(( state ) => [...cycles, newCycle])
        setActiveCycleId(id)
        reset()
        setAmountSecondsPassed(0)


    }

    function handleInterruptCycle() {
        setCycles(state =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date()
                    };
                } else {
                    return cycle;
                }
            })
        );
        setActiveCycleId(null);
    }


   

    const task = watch('task')

    return (
        <HomeContainer>

            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId,markCurrentCycleAsFinished, amountSecondsPassed,setSecondsPassed}}>
                    <FormProvider {...newCycleForm}>
                    <NewCycleform />
                    </FormProvider>
                    <CountDown />
                </CyclesContext.Provider>
                {activeCycle ? (

                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        interromper
                    </StopCountDownButton>

                ) : (<StartCountDownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>)}


            </form>
        </HomeContainer>


    );
}