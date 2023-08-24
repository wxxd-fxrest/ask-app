import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../colors";
import {IoChatbubbleEllipsesOutline, IoSettingsOutline} from "react-icons/io5";
import {BsBookmarkStar} from "react-icons/bs";
// IoSettingsSharp
// BsFillBookmarkStarFill
// IoChatbubbleEllipsesSharp

const SideBar = () => {
    return (
        <SideBarContainer>
            <MenuContainer>
                <ComponentBox>
                    <AnswerIcon/>
                    <Text> Answer </Text>
                </ComponentBox>

                <ComponentBox>
                    <FavoritesIcon/>
                    <Text> Favorites </Text>
                </ComponentBox>

                <ComponentBox>
                    <SetupIcon/>
                    <Text> Setup </Text>
                </ComponentBox>
            </MenuContainer>
        </SideBarContainer>
    )
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
    &:hover {
        background-color: rgba(45, 68, 33, 0.3);
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
    font-size: 1.6rem; /* 조정된 아이콘 크기 설정 */

    @media (max-width: 1100px) {
        display: none;
    }
    @media (max-width: 768px) {
        display: flex;
    }
`;

const AnswerIcon = styled(IoChatbubbleEllipsesOutline)`
    ${IconCommonStyle}
`;

const FavoritesIcon = styled(BsBookmarkStar)`
    ${IconCommonStyle}
`;

const SetupIcon = styled(IoSettingsOutline)`
    ${IconCommonStyle}
`;

const Text = styled.h1`
    margin: 0px 10px;
    padding-top: 5px;
    font-size: 1.2rem; /* 조정된 텍스트 크기 설정 */
    color: ${colors.headerColor};
    font-weight: bold;

    @media (max-width: 768px) {
        display: none;
    }
`;

export default SideBar;