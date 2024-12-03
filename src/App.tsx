import { useReducer, useRef, useState } from 'react';
import './App.css';
import InputCounter, { InputCounterRef } from './components/InputCouter';
import styled from 'styled-components';

interface Action {
  type: 'SET_TOTAL' | 'RESET_TOTALS';
  payload?: {
    index?: number;
    value?: number;
  };
}
export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  > * {
    flex-grow: 1;
    max-width: calc(33%);
    @media screen and (min-width: 762px) {
      max-width: unset;
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
`;

function App() {
  const initialState: number[] = Array(7).fill(0);

  const totalsReducer = (state: number[], action: Action): number[] => {
    switch (action.type) {
      case 'SET_TOTAL': {
        if (!action.payload) {
          throw new Error('Action payload is required for SET_TOTAL');
        }
        const { index, value } = action.payload;
        return state.map((item, i) => (i === index ? value : item)) as number[];
      }
      case 'RESET_TOTALS': {
        return initialState;
      }
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [totals, dispatch] = useReducer(totalsReducer, initialState);
  const [treatmentN, setTreatmentN] = useState(0);
  const [treatmentS, setTreatmentS] = useState(0);

  // Criar referências estáticas para os InputCounters
  const refs = [
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
    useRef<InputCounterRef>(null),
  ];

  const handleCounterChange = (index: number, value: number) => {
    dispatch({
      type: 'SET_TOTAL',
      payload: { index, value },
    });
  };

  const resetCounters = () => {
    refs.forEach((ref) => ref.current?.reset()); // Chama a função reset de cada InputCounter
    dispatch({ type: 'RESET_TOTALS' });
  };

  const calculateGrandTotal = () => totals.reduce((acc, curr) => acc + curr, 0) + treatmentN + treatmentS;
  const [withDiscount, setWithDiscount] = useState(false);
  return (
    <>
      <header style={{ display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{ fontSize: '24px' }} >Calculadora de Preço</h1>
      </header>
      <GridWrapper>
        <InputCounter
          label="Adrenalina"
          price={7500 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(0, value)}
          maxCount={3}
          ref={refs[0]}
        />
        <InputCounter
          label="Atadura"
          price={170 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(1, value)}
          maxCount={10}
          ref={refs[1]}
        />
        <InputCounter
          label="Medkit"
          price={1400 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(2, value)}
          maxCount={2}
          ref={refs[2]}
        />
        <InputCounter
          label="Bandagem"
          price={250 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(3, value)}
          maxCount={5}
          ref={refs[3]}
        />
        <InputCounter
          label="Analgésico"
          price={350 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(4, value)}
          maxCount={10}
          ref={refs[4]}
        />
        <InputCounter
          label="Sinkalm"
          price={450 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(5, value)}
          maxCount={5}
          ref={refs[5]}
        />
        <InputCounter
          label="Ritmoneury"
          price={450 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(6, value)}
          maxCount={3}
          ref={refs[6]}
        />

        <CardContainer>
          <InputCounter
            label="Tratamento Norte"
            price={800}
            handleChange={(value: number) => setTreatmentN(value)}
            maxCount={100}
            ref={refs[7]}
          />
          <InputCounter
            label="Tratamento Sul"
            price={1200}
            handleChange={(value: number) => setTreatmentS(value)}
            maxCount={100}
            ref={refs[8]}
          />
        </CardContainer>
        <CardContainer>
          <button onClick={resetCounters} style={{ padding: '6px 16px', fontSize: '16px' }}>
            Resetar
          </button>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={withDiscount}
              onChange={(e) => setWithDiscount(e.target.checked)}
              style={{ marginRight: '3px' }}
            />
            CONVÊNIO
          </label>
          <h3 style={{ fontSize: '18px' }} >Total: {calculateGrandTotal()}</h3>
        </CardContainer>
      </GridWrapper>
    </>
  );
}

export default App;
