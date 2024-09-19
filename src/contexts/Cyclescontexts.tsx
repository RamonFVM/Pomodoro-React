import { createContext, ReactNode, useReducer, useState } from "react";

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

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptDate?: Date;
    finishedDate?: Date;
}

interface CycleContextProviderProps {
    children: ReactNode;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

const cyclesReducer = (state: CyclesState, action: any): CyclesState => {
    switch (action.type) {
        case 'ADD_NEW_CYCLE':
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            };
        case 'INTERRUPT_CURRENT_CYCLE':
            return {
                ...state,
                cycles: state.cycles.map(cycle => 
                    cycle.id === state.activeCycleId
                        ? { ...cycle, interruptDate: new Date() }
                        : cycle
                ),
                activeCycleId: null,
            };
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
            return {
                ...state,
                cycles: state.cycles.map(cycle =>
                    cycle.id === state.activeCycleId
                        ? { ...cycle, finishedDate: new Date() }
                        : cycle
                ),
                activeCycleId: null,
            };
        default:
            return state;
    }
};

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
        dispatch({ type: 'MARK_CURRENT_CYCLE_AS_FINISHED', payload: { activeCycleId } });
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch({ type: 'ADD_NEW_CYCLE', payload: { newCycle } });
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch({ type: 'INTERRUPT_CURRENT_CYCLE', payload: { activeCycleId } });
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