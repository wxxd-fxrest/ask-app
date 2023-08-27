import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Join from "./Join";
import Login from "./Login";

const Auth = () => {
    const [open, setOpen] = useState(false); 

    const toggleForm = () => {
      setOpen(!open);
    };

    return(
        <Container>
            <Content>
                { open ? <Join /> : <Login /> }

                <ToggleFormButton onClick={toggleForm}>
                    {open ? '이미 계정이 있으신가요?' : '계정이 없다면 회원가입을 진행해주세요.'}
                </ToggleFormButton>
            </Content>
        </Container>
    )
};

const blinkAnimation = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
`;

const Container = styled.div`
    height: 100vh;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    transition: width 0.3s;

    @media (max-width: 568px) {
        width: 100%;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToggleFormButton = styled.button`
    margin-top: 20px;
    background-color: transparent;
    border: none;
    color: rgba(45, 68, 33, 0.8);
    cursor: pointer;
    animation: ${blinkAnimation} 2.5s infinite;
`;

export default Auth; 