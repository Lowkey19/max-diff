import React, { FunctionComponent, useState, ChangeEvent } from "react"
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

const Container = styled.div``;

const Label = styled.label`
  font-size: 24px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  > button {
    color: black;
    background-color: gray;
    margin-left: 30px;
    width: 120px;
    height: 30px;
    border: 1px solid;
  }
`;

const StyledTextField = styled(TextField)`
  > div {
    height: 40px;
  }
`;

const AnswerContainer = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;

const MainView: FunctionComponent = () => {
  const [answer, setAnswer] = useState<number>(NaN);
  const [param, setParam] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
  }

  const handleSolve = () => {
    let ans = 0;
    const stringArray = param.split(',');
    const numArray = stringArray.map(s => {
      return parseInt(s);
    })

    if (numArray.length < 2) {
      setAnswer(ans);
      return;
    }

    numArray.sort((a, b) => {  return a - b;  });

    for (let i = 0; i < numArray.length - 1; i++) {
      const maxDiff = Math.abs(numArray[i] - numArray[i + 1]);
      if (maxDiff > ans) ans = maxDiff;
    }

    setAnswer(ans);
  }

  const handleClear = () => {
    setParam('');
    setAnswer(NaN);
  }

  return (
    <Container>
      <Label>Input Comma-separated numbers:</Label>
      <ContentContainer>
        <StyledTextField value={param} onChange={handleChange} />
        <Button onClick={handleSolve}>Solve</Button>
        <Button onClick={handleClear}>Clear</Button>
      </ContentContainer>
      {!isNaN(answer) && <AnswerContainer>Answer: {answer}</AnswerContainer>}
    </Container>
  )
}

export default MainView