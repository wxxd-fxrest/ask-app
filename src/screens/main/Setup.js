import React, { useState } from "react";
import styled from "styled-components";
import {IoSettingsOutline} from "react-icons/io5";
import {BiShareAlt} from "react-icons/bi";
import { colors } from "../../colors";
import ProfileScreen from "./profile/ProfileScreen";
import ProfileEdit from "./profile/ProfileEdit";

const Setup = ({profileUser, userData}) => {
    const [edit, setEdit] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        const textToCopy = `https://wxxd-fxrest.github.io/ask-app/profile/${userData.email}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000); // 알림창 표시 시간 (2초)
        });
    };


    return (
        <Container>
            <Header>
                <SetupIcon/>
                <Text> 설정 </Text>    
            </Header>
            <ScrollableContent>
                {edit === false ? 
                    <ProfileScreen profileUser={profileUser} userData={userData} setEdit={setEdit} />
                : 
                    <ProfileEdit profileUser={profileUser} userData={userData} setEdit={setEdit} edit={edit}/>
                }
               <ProfileShareBox  onClick={handleCopyClick}>
                    <ShareText> 페이지 공유하기 </ShareText>
                    <ShareIcon size={20} />
                </ProfileShareBox>
                {isCopied && <CopyAlertBox> 
                    <CopyAlertText>  복사 완료! </CopyAlertText>
                </CopyAlertBox>}
            </ScrollableContent>
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

const ScrollableContent = styled.div`
    overflow-y: auto;
    padding: 10px 10px;
    
    /* 스크롤바 숨기기 */
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ProfileShareBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    cursor: pointer;
    
    &:hover {
        border-radius: 20px;
        background-color: rgba(45, 68, 33, 0.3);
    }
`;

const ShareText = styled.h1`
    font-size: 14px;
    color: ${colors.headerColor};
`;

const ShareIcon = styled(BiShareAlt)`
    color: ${colors.headerColor};
`;

const CopyAlertBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 60%;
    transform: translate(-80%, -20%);
    background-color: rgba(45, 68, 33, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 999;
`;

const CopyAlertText = styled.h1`
    font-size: 16px;
`;


export default Setup;