import { useReducer, useRef, useState } from 'react';
import './App.css';
import InputCounter, { InputCounterRef } from './components/InputCouter';
import styled from 'styled-components';
import adrenalina from "./assets/adrenalina.png";
import atadura from "./assets/atadura.png";
import medkit from "./assets/kitmed.png";
import bandagem from "./assets/bandagem.png";
import analgesico from "./assets/analgesico.png";
import sinkalm from "./assets/sincalm.png";
import ritmoneury from "./assets/ritmoneury.png";
import logo from "./assets/logo.png";

interface Action {
  type: 'SET_TOTAL' | 'RESET_TOTALS';
  payload?: {
    index?: number;
    value?: number;
  };
}
export const Header = styled.header`
  padding: 6px 0;
  display: flex;
  align-items: center;
  height: 92px;
  margin: 0 -2rem;
  background-color: #e8ba9c;
  @media screen and (max-width: 762px) {
    margin: 0 -8px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  } 
`;
export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 0;
  gap: 6px;
  flex-shrink: 0;
  > * {
    flex-grow: 1;
    max-width: calc(33% - 3px);
    @media screen and (min-width: 762px) {
      max-width: unset;
    }
  }
`;
export const TotalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
  width: 100%;
  flex-grow: 1;
  > h4 {
    font-weight: bolder;
    padding: 6px 0;
    font-size: 1.5rem;
    background-color: #e8ba9c;
    width: 100%;
    color: #69422a;
  }
  > h3 {
    display: inline-flex;
    background-color: white;
    font-weight: bolder;
    color: black;
    font-size: 1.7rem;
    flex-grow: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
  > div {
    max-width: 100%;
    flex-grow: 1;
  }
  > label {
    display: flex;
    height: 42px;
    align-items: center;
    background-color: #f8ebe3;
    color: #69422a;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 1rem;
  }
`;
const ResetButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  background-color: #69422a;
  color: white;
  border: none;
  font-weight: bolder;
  text-transform: uppercase;
  flex-shrink: 0;
  margin: 8px 0;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #9f7b64;
  }

  &:disabled {
    background-color: #858585;
    cursor: not-allowed;
  }
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
      <Header style={{ display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <img src={logo} alt="Hospital São Rafael" />
      </Header>
      <GridWrapper>
      <InputCounter
          label="Atadura"
          price={170 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(1, value)}
          maxCount={10}
          ref={refs[1]}
          image={atadura}
        />
        <InputCounter
          label="Bandagem"
          price={250 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(3, value)}
          maxCount={5}
          ref={refs[3]}
          image={bandagem}
        />
        <InputCounter
          label="Medkit"
          price={1400 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(2, value)}
          maxCount={2}
          ref={refs[2]}
          image={medkit}
        />
        <InputCounter
          label="Analgésico"
          price={200 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(4, value)}
          maxCount={10}
          ref={refs[4]}
          image={analgesico}
        />
        <InputCounter
          label="Adrenalina"
          price={7500 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(0, value)}
          maxCount={3}
          ref={refs[0]}
          image={adrenalina}
        />
        <InputCounter
          label="Sinkalm"
          price={450 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(5, value)}
          maxCount={5}
          ref={refs[5]}
          image={sinkalm}
        />
        <InputCounter
          label="Ritmoneury"
          price={450 * (withDiscount ? 0.8 : 1)}
          handleChange={(value: number) => handleCounterChange(6, value)}
          maxCount={5}
          ref={refs[6]}
          image={ritmoneury}
        />

        <CardContainer>
          <InputCounter
            label="Tratamento Norte"
            price={800}
            handleChange={(value: number) => setTreatmentN(value)}
            ref={refs[7]}
          />
          <InputCounter
            label="Tratamento Sul"
            price={1200}
            handleChange={(value: number) => setTreatmentS(value)}
            ref={refs[8]}
          />
        </CardContainer>
        <CardContainer>
          <label>
            <input
              type="checkbox"
              checked={withDiscount}
              onChange={(e) => setWithDiscount(e.target.checked)}
              style={{ marginRight: '3px' }}
            />
            CONVÊNIO
          </label>
          <ResetButton onClick={resetCounters}>
            Zerar
          </ResetButton>
          <TotalWrapper>
            <h4>TOTAL</h4>
            <h3>{calculateGrandTotal()}</h3>
          </TotalWrapper>
        </CardContainer>
      </GridWrapper>
    </>
  );
}

export default App;
