import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {  useContext} from "react";
import { NewCycleform } from "./NewCycleForm";
import { CountDown } from "./CountDown/Index";
import { CyclesContext } from "../../contexts/Cyclescontexts";





const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>



export function Home() {

    const {activeCycle,createNewCycle,interruptCurrentCycle}= useContext(CyclesContext)

   

    const newCycleForm= useForm<NewCycleFormData>({


        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
    
    
        },
    })
     const {  handleSubmit, watch, reset } = newCycleForm

     function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
     }


    

    


    const task = watch('task')

    return (
        <HomeContainer>

            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
              
                    <FormProvider {...newCycleForm}>
                    <NewCycleform />
                    </FormProvider>
                    <CountDown />
               
                {activeCycle ? (

                    <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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