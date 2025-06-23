import { useReducer, useRef, useState } from 'react';
import './App.css';
import InputCounter, { InputCounterRef } from './components/InputCouter';
import styled from 'styled-components';
import adrenalina from "./assets/Adrenalina.png";
import atadura from "./assets/Atadura.png";
import medkit from "./assets/KitMed.png";
import bandagem from "./assets/Bandagem.png";
import analgesico from "./assets/Analgesico.png";
import sinkalm from "./assets/Sinkalmy.png";
import ritmoneury from "./assets/Ritmoneury.png";
import logo from "./assets/logo.png";
import ursinho from "./assets/Ursinho.png"; // Adicione a imagem se existir
import tratamento from "./assets/Tratamento.png"; // Adicione a imagem se existir

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
  const initialState: number[] = Array(18).fill(0);

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

  // Criar referências estáticas para os InputCounters
  const refs = [
    useRef<InputCounterRef>(null), // 0 Adrenalina
    useRef<InputCounterRef>(null), // 1 Atadura
    useRef<InputCounterRef>(null), // 2 KitMed
    useRef<InputCounterRef>(null), // 3 Bandagem
    useRef<InputCounterRef>(null), // 4 Analgésico
    useRef<InputCounterRef>(null), // 5 Sincalmy
    useRef<InputCounterRef>(null), // 6 Ritmoneury
    useRef<InputCounterRef>(null), // 7 Tratamento Norte
    useRef<InputCounterRef>(null), // 8 Tratamento Sul
    useRef<InputCounterRef>(null), // 9 Deslocamento Norte
    useRef<InputCounterRef>(null), // 10 Deslocamento Sul
    useRef<InputCounterRef>(null), // 11 Tratamento
    useRef<InputCounterRef>(null), // 12 Gesso
    useRef<InputCounterRef>(null), // 13 Raio-X
    useRef<InputCounterRef>(null), // 14 Ressonância
    useRef<InputCounterRef>(null), // 15 Ursinho
    useRef<InputCounterRef>(null), // 16 Consultas
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

  // Atualize calculateGrandTotal para somar todos os itens
  const calculateGrandTotal = () =>
    totals.reduce((acc, curr) => acc + curr, 0);

  const [withDiscount, setWithDiscount] = useState(false);
  return (
    <>
      <Header style={{ display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <img src={logo} alt="Hospital São Rafael" />
      </Header>
      <GridWrapper>
        {/* Itens com imagem */}
        <InputCounter
          label="Atadura"
          price={withDiscount ? 200 : 250}
          maxCount={10}
          handleChange={(value: number) => handleCounterChange(0, value)}
          ref={refs[0]}
          image={atadura}
        />
        <InputCounter
          label="Bandagem"
          price={withDiscount ? 300 : 400}
          maxCount={5}
          handleChange={(value: number) => handleCounterChange(1, value)}
          ref={refs[1]}
          image={bandagem}
        />
        <InputCounter
          label="KitMed"
          price={withDiscount ? 1500 : 2000}
          maxCount={2}
          handleChange={(value: number) => handleCounterChange(2, value)}
          ref={refs[2]}
          image={medkit}
        />
        <InputCounter
          label="Analgésico"
          price={withDiscount ? 350 : 500}
          maxCount={10}
          handleChange={(value: number) => handleCounterChange(3, value)}
          ref={refs[3]}
          image={analgesico}
        />
        <InputCounter
          label="Adrenalina"
          price={withDiscount ? 9000 : 11000}
          maxCount={3}
          handleChange={(value: number) => handleCounterChange(4, value)}
          ref={refs[4]}
          image={adrenalina}
        />
        <InputCounter
          label="Sinkalmy"
          price={withDiscount ? 500 : 700}
          maxCount={5}
          handleChange={(value: number) => handleCounterChange(5, value)}
          ref={refs[5]}
          image={sinkalm}
        />
        <InputCounter
          label="Ritmoneury"
          price={withDiscount ? 500 : 700}
          maxCount={5}
          handleChange={(value: number) => handleCounterChange(6, value)}
          ref={refs[6]}
          image={ritmoneury}
        />
        {/* // tem imagem */}
        <InputCounter
          label="Ursinho"
          price={withDiscount ? 5000 : 8000}
          maxCount={5}
          handleChange={(value: number) => handleCounterChange(7, value)}
          ref={refs[7]}
          image={ursinho}
        />
        {/* // tem imagem */}
        <InputCounter
          label="Tratamento"
          price={withDiscount ? 1000 : 1500}
          maxCount={5}
          handleChange={(value: number) => handleCounterChange(8, value)}
          ref={refs[8]}
          image={tratamento}
        />


        {/* Itens sem imagem, após Tratamento Sul */}
        <CardContainer>
          <InputCounter
            label="Desl. Norte"
            price={withDiscount ? 500 : 1000}
            handleChange={(value: number) => handleCounterChange(9, value)}
            ref={refs[9]}
          />
          <InputCounter
            label="Desl. Sul"
            price={withDiscount ? 1000 : 1500}
            handleChange={(value: number) => handleCounterChange(10, value)}
            ref={refs[10]}
          />
          <InputCounter
            label="Ressonância"
            price={withDiscount ? 2500 : 3500}
            handleChange={(value: number) => handleCounterChange(11, value)}
            ref={refs[11]}
          />
        </CardContainer>
        <CardContainer>
          <InputCounter
            label="Exame"
            price={withDiscount ? 2000 : 2500}
            handleChange={(value: number) => handleCounterChange(12, value)}
            ref={refs[12]}
          />
          <InputCounter
            label="Gesso"
            price={withDiscount ? 2000 : 2500}
            handleChange={(value: number) => handleCounterChange(13, value)}
            ref={refs[13]}
          />
          <InputCounter
            label="Raio-X"
            price={withDiscount ? 2000 : 2500}
            handleChange={(value: number) => handleCounterChange(14, value)}
            ref={refs[14]}
          />
        </CardContainer>
        <CardContainer>
          <InputCounter
            label="Consultas"
            price={withDiscount ? 8000 : 10000}
            handleChange={(value: number) => handleCounterChange(15, value)}
            ref={refs[15]}
          />
          <InputCounter
            label="Cirurgias"
            price={withDiscount ? 150000 : 200000}
            handleChange={(value: number) => handleCounterChange(16, value)}
            ref={refs[16]}
          />
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
