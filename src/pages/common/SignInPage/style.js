import styled from "styled-components";

export const WrapperContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgba(0,0,0,0.53)
`

export const WrapperContainerLeft = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;

`

export const WrapperContainerRight = styled.div`
    border-radius: 10px;
    width: 300px;
    height: 100%;
    background-color: rgb(219,238,255);
    align-content: center;
    text-align: center;
`

export const WrapperTextLight = styled.span`
  color: var(--blue);
`