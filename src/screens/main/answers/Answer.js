import React from "react";
import styled from "styled-components";
import {IoChatbubbleEllipsesOutline} from "react-icons/io5";
import { colors } from "../../../colors";

const Answer = () => {
    return (
        <Container>
            <Header>
                <AnswerIcon/>
                <Text> Answer </Text>
            </Header>
        </Container>
    )
};

const Container = styled.div`
    background-color: wheat;
    display: flex;
    width: 100%; /* 가로 폭을 100%로 설정하여 화면 가로폭에 꽉 차게 */
    height: 100vh;
    flex: 1;
    flex-direction: column; /* 세로로 배치 */
`;

const Header = styled.div`
    background-color: yellowgreen;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; /* 내용 좌우 정렬 */
    display: flex;
    padding: 10px; /* 상하 좌우 여백 추가 */
`;

const Text = styled.h1`
    margin: 0px 10px;
    font-size: 18px;
    color: ${colors.headerColor};
    font-weight: bold;
`;

const AnswerIcon = styled(IoChatbubbleEllipsesOutline)`
    color: ${colors.headerColor};
    font-size: 27px;
`;


export default Answer;