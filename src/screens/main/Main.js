import React from "react";
import SideBar from "./SideBar";
import styled from "styled-components";
import Answer from "./answers/Answer";

const Main = () => {
    return (
        <Container>
            <SideBarContainer>
                <SideBar />
            </SideBarContainer>
            <Content>
                <Answer />
            </Content>
        </Container>
    )
};

const Container = styled.div`
    background-color: yellowgreen;
    width: 60%; /* 초기 너비 설정 */
    height: 100vh;
    display: flex;
    margin: auto;
    transition: width 0.3s; /* 너비 변화 애니메이션 설정 */

    @media (max-width: 568px) {
        /* 화면 너비가 568px 이하일 때의 스타일 */
        width: 100%;
    }
`;

const SideBarContainer = styled.div`
    width: 30%; /* 초기 너비 설정 */
    min-width: 70px; /* 최소 너비 */
    max-width: 200px; /* 최대 너비 */
    background-color: lightgray;
    transition: width 0.3s; /* 너비 변화 애니메이션 설정 */

    @media (max-width: 768px) {
        /* 화면 크기가 768px 이하일 때의 스타일 */
        width: 70px;
    }
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Main;