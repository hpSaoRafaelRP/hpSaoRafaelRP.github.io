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
  align-items: flex-start;
  margin: 10px 0;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PriceText = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 50px;
  text-align: center;
  font-size: 1rem;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
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
        <Label>{label}</Label>
        <PriceText>Preço: R$ {price.toFixed(2)}</PriceText>
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
