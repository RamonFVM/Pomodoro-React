import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomerContainer, MinutesAmountInput, Seperator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData=zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { register, handleSubmit, watch , reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
         task:'',
         minutesAmount:0


        },
    })

    function handleCreateNewCycle(data: NewCycleFormData){

        console.log(data);
        reset()


    }
      
     const task = watch('task')

    return (
        <HomerContainer>

            <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Nome para seu projeto"
                        required
                        {...register('task')}

                    />

                    <datalist id="task-suggestions">
                        <option value="projeto 1" />
                        <option value="projeto 2" />
                        <option value="projeto 3" />
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        required
                        step={5}
                        max={60}
                        min={5}
                        {...register('minutesAmount', {valueAsNumber:true})} />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Seperator>:</Seperator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>
                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar</StartCountdownButton>
            </form>
        </HomerContainer>


    );
}