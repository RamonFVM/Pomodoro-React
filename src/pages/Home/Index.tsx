import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomerContainer, MinutesAmountInput, Seperator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import {differenceInSeconds} from  'date-fns'

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date

}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({

          
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0


        },
    })

    const activeCycle = cycles.find((cycles => cycles.id == activeCycleId))

    useEffect(()=>{
        if(activeCycle){

            setInterval(() => {

                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
                
            }, 1000);
        }


    },[activeCycle])

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {

            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate:new Date(),


        }

        setCycles((state) => [...cycles, newCycle])
        setActiveCycleId(id)
        reset()


    }


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    const task = watch('task')

    return (
        <HomerContainer>

            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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
                        {...register('minutesAmount', { valueAsNumber: true })} />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Seperator>:</Seperator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>
                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar</StartCountdownButton>
            </form>
        </HomerContainer>


    );
}