import { FormContainer, TaskInput, MinutesAmountInput } from "./style"
import { useContext } from "react"
import { CyclesContext } from "../../../contexts/Cyclescontexts"
import { useFormContext } from "react-hook-form"




export function NewCycleform() {

    const {activeCycle}= useContext(CyclesContext)
    const {register}=useFormContext()

    return (<FormContainer>
        <label htmlFor="">Vou trabalhar em</label>
        <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Nome para seu projeto"
            required
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })} />


        <span>minutos.</span>
    </FormContainer>
    )
}