import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';

interface InputCounterProps {
  label: string;
  price: number;
  maxCount: number;
  handleChange: (value: number) => void;
}

export interface InputCounterRef {
  reset: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
  background-color: #f8ebe3;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #59341e;
  background-color: #e8ba9c;
  gap: 4px;
  padding: 6px 0;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
`;

const PriceText = styled.span`
  font-size: 0.8rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 3px;
`;

const Button = styled.button`
  background-color: #69422a;
  color: #f0e5e1;
  border: none;
  width: 30px;
  height: 30px;
  font-weight: bold;
  
  margin-right: 0;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: #9f7b64;
  }

  &:disabled {
    background-color: #858585;
    cursor: not-allowed;
  }
`;

const MaxButton = styled.button`
  background-color: transparent;
  color: #69422a;
  border: none;
  font-weight: bold;
  
  margin-right: 0;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    color: #9f7b64;
  }

`;

const Input = styled.input`
  width: auto;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  border: 1px solid #ccc;
  padding: 5px;
  flex-grow: 1;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
`;

const InputCounter = forwardRef<InputCounterRef, InputCounterProps>(
  ({ label, price, maxCount, handleChange }, ref) => {
    const [count, setCount] = useState(0);

    const increment = () => {
      if (count < maxCount) {
        const newValue = count + 1;
        setCount(newValue);
      }
    };

    const decrement = () => {
      if (count > 0) {
        const newValue = count - 1;
        setCount(newValue);
      }
    };
    const setToMax = () => {
      setCount(maxCount);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, Math.min(maxCount, parseInt(e.target.value) || 0));
      setCount(value);
    };

    // Expor a função de reset para o componente pai
    useImperativeHandle(ref, () => ({
      reset: () => {
        setCount(0);
      },
    }));

    useEffect(() => {
      handleChange(count * price)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, price]);

    return (
      <Container>
        <Header>
          <Label>{label}</Label>
          <PriceText>Preço: {price}</PriceText>
        </Header>
        <MaxButton onClick={setToMax} disabled={count === maxCount}>
          MAX
        </MaxButton>
        <InputWrapper>
          <Button onClick={decrement} disabled={count === 0}>
            -
          </Button>
          <Input
            type="number"
            value={count}
            onChange={handleInputChange}
            min="0"
            max={maxCount}
          />
          <Button onClick={increment} disabled={count === maxCount}>
            +
          </Button>
        </InputWrapper>
      </Container>
    );
  }
);

export default InputCounter;
