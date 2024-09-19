import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer, } from "../reducers/cycles";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleasFinishedAction } from "../reducers/actions";


interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    interruptCurrentCycle: () => void;
    createNewCycle: (data: CreateCycleData) => void;
    cycles: Cycle[];
}



interface CycleContextProviderProps {
    children: ReactNode;
}




export function CyclesContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    });

    const { cycles, activeCycleId } = cyclesState;
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleasFinishedAction());
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch( interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            cycles,
        }}>
            {children}
        </CyclesContext.Provider>
    );
}