import React from "react";
import styled from "styled-components";
import {IoSettingsOutline} from "react-icons/io5";
import { colors } from "../../colors";

const Setup = () => {
    return (
        <Container>
            <Header>
                <SetupIcon/>
                <Text> Setup </Text>    
            </Header>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    width: 100%; /* 가로 폭을 100%로 설정하여 화면 가로폭에 꽉 차게 */
    height: 100vh;
    flex: 1;
    flex-direction: column; /* 세로로 배치 */
`;

const Header = styled.div`
    background-color: rgba(45, 68, 33, 0.1);
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

const SetupIcon = styled(IoSettingsOutline)`
    color: ${colors.headerColor};
    font-size: 27px;
`;


export default Setup;