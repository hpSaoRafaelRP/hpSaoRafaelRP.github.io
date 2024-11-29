import { useReducer, useRef, useState } from 'react';
import './App.css';
import InputCounter, { InputCounterRef } from './components/InputCouter';

interface Action {
  type: 'SET_TOTAL' | 'RESET_TOTALS';
  payload?: {
    index?: number;
    value?: number;
  };
}

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
        <button onClick={resetCounters} style={{ padding: '6px 16px', fontSize: '16px' }}>
          Resetar
        </button>
      </header>
      <div>
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
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <label style={{ fontSize: '24px', display: 'flex' }}>
            <input
              type="checkbox"
              checked={withDiscount}
              onChange={(e) => setWithDiscount(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            Com parceria
          </label>
        </div>

        <InputCounter
          label="Tratamento Norte"
          price={1000}
          handleChange={(value: number) => setTreatmentN(value)}
          maxCount={100}
          ref={refs[7]}
        />
        <InputCounter
          label="Tratamento Sul"
          price={1500}
          handleChange={(value: number) => setTreatmentS(value)}
          maxCount={100}
          ref={refs[8]}
        />

        <h3 style={{ fontSize: '24px' }} >Total: R$ {calculateGrandTotal().toFixed(2)}</h3>
      </div>
    </>
  );
}

export default App;
