import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../AuthContext";
import AskSideBar from "./AskSideBar";
import Ask from "./Ask";
import Auth from "../auth/Auth";

const AskScreen = () => {
    const {currentUser} = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Container>
            <SideBarContainer>
                <AskSideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
            </SideBarContainer>
            {selectedTab === 0 && 
                <Content>
                    <Ask currentUser={currentUser}/>
                </Content>
            }
            {selectedTab === 1 && 
                <Content>
                    <Auth />
                </Content>
            } 
        </Container>
    )
};

const Container = styled.div`
    background-color: rgba(45, 68, 33, 0.1);
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
    transition: width 0.3s; /* 너비 변화 애니메이션 설정 */
    border-right: solid 1px rgba(45, 68, 33, 0.1);

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

export default AskScreen;