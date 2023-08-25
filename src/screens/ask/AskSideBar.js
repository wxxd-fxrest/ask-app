import React from "react";
import styled, { css, StyleSheetManager } from "styled-components";
import { colors } from "../../colors";
import {IoSettingsOutline} from "react-icons/io5";
import {TbMessageCircleQuestion} from "react-icons/tb";
// IoSettingsSharp
// BsFillBookmarkStarFill
// IoChatbubbleEllipsesSharp

const AskSideBar = ({ selectedTab, setSelectedTab }) => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isSelected'}>
        <SideBarContainer>
            <MenuContainer>
                <ComponentBox onClick={() => setSelectedTab(0)} isSelected={selectedTab === 0}>
                    <QuestionIcon isSelected={selectedTab === 0} />
                    <Text isSelected={selectedTab === 0}> Ask </Text>
                </ComponentBox>
                <ComponentBox onClick={() => setSelectedTab(1)} isSelected={selectedTab === 1}>
                    <SetupIcon isSelected={selectedTab === 1} />
                    <Text isSelected={selectedTab === 1}> Login </Text>
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

const QuestionIcon = styled(TbMessageCircleQuestion)`
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

export default AskSideBar;