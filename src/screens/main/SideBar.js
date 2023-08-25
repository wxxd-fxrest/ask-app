import React from "react";
import styled, { css, StyleSheetManager } from "styled-components";
import { colors } from "../../colors";
import {IoChatbubbleEllipsesOutline, IoSettingsOutline} from "react-icons/io5";
import {BsBookmarkStar} from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";

// IoSettingsSharp
// BsFillBookmarkStarFill
// IoChatbubbleEllipsesSharp

const SideBar = ({ selectedTab, setSelectedTab }) => {
    const navigate = useNavigate();

    return (
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isSelected'}>
            <SideBarContainer>
                <MenuContainer>
                    <ComponentBox onClick={() => setSelectedTab(0)} isSelected={selectedTab === 0}>
                        <AnswerIcon isSelected={selectedTab === 0} />
                        <Text isSelected={selectedTab === 0}> Answer </Text>
                    </ComponentBox>

                    <ComponentBox onClick={() => setSelectedTab(1)} isSelected={selectedTab === 1}>
                        <FavoritesIcon isSelected={selectedTab === 1} />
                        <Text isSelected={selectedTab === 1}> Favorites </Text>
                    </ComponentBox>

                    <ComponentBox onClick={() => setSelectedTab(2)} isSelected={selectedTab === 2}>
                        <SetupIcon isSelected={selectedTab === 2} />
                        <Text isSelected={selectedTab === 2}> Setup </Text>
                    </ComponentBox>
                    <ComponentBox onClick={() => {
                        signOut(auth) 
                        navigate("/")
                        alert("로그아웃 되었습니다.")
                        console.log("로그아웃 완료")}}>
                        <LogOutIcon />
                        <Text> 로그아웃 </Text>
                    </ComponentBox>
                </MenuContainer>
            </SideBarContainer>
        </StyleSheetManager>
    );
};

const SideBarContainer = styled.div`
    color: black;
    height: 100vh;
`;

const MenuContainer = styled.div`
    padding: 80px 10px;

    @media (max-width: 768px) {
        padding: 80px 0px;
    }
`;

const ComponentBox = styled.div`
    border: solid 1px rgba(45, 68, 33, 0.8);
    border-radius: 30px;
    padding: 10px 20px;
    margin: 15px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    ${(props) => 
        (props.isSelected && css`
            background-color: rgb(45, 68, 33);
        `)
    }

    &:hover {
        background-color: rgba(45, 68, 33, 0.8);
    }

    @media (max-width: 1100px) {
        justify-content: center;
    }

    @media (max-width: 768px) {
        border: none;
        padding: 10px 10px;
        margin: 15px 10px;
    }
`;

const IconCommonStyle = css`
    color: ${colors.headerColor};
    font-size: 1.6rem;

    @media (max-width: 1100px) {
        display: none;
    }
    @media (max-width: 768px) {
        display: flex;
    }
`;

const AnswerIcon = styled(IoChatbubbleEllipsesOutline)`
    ${IconCommonStyle}
    ${(props) => 
        (props.isSelected && css`
            color: white;
        `)
    }
`;

const FavoritesIcon = styled(BsBookmarkStar)`
    ${IconCommonStyle}
    ${(props) => 
        (props.isSelected && css`
            color: white;
        `)
    }
`;

const SetupIcon = styled(IoSettingsOutline)`
    ${IconCommonStyle}
    ${(props) => 
        (props.isSelected && css`
            color: white;
        `)
    }
`;

const LogOutIcon = styled(AiOutlineLogout)`
    ${IconCommonStyle}
    ${(props) => 
        (props.isSelected && css`
            color: white;
        `)
    }
`;

const Text = styled.h1`
    margin: 0px 10px;
    padding-top: 5px;
    font-size: 1.2rem;
    color: ${colors.headerColor};
    font-weight: bold;
    ${(props) => 
        (props.isSelected && css`
            color: white;
        `)
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export default SideBar;