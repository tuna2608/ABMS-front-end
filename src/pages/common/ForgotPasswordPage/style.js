import styled from "styled-components";
// import imageLogin from '../../../assets/common/images/bg-login.jpeg'

export const WrapperContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 400px;
    height: 100%;
    align-content: center;
    background-image: linear-gradient(to right, white, var(--cbutton));
    text-align: center;
`

export const WrapperTextLight = styled.span`
  color: var(--chightlight);
`