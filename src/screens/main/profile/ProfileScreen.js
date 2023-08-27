import React from "react";
import styled from "styled-components";
import { colors } from "../../../colors";
import DefaultImage from '../../../assets/QnA-Profile.png';
import {RiEdit2Line} from "react-icons/ri";

const ProfileScreen = ({profileUser, userData, setEdit}) => {
    return (
        <ContentsBox>
            <ProfileBox>
                <ProfileEditButton onClick={() => setEdit(true)}>
                    <RiEdit2Line size={18} color={colors.headerColor}/>
                    <EditTitle> 수정 </EditTitle>
                </ProfileEditButton>
                <ProfileImgBox>
                    <ProfileImage src={profileUser ? profileUser.profileImgURL : DefaultImage}/>
                </ProfileImgBox>
                <Empty />
                <ProfileTextBox>
                    <ProfileName> {userData.name} </ProfileName>
                </ProfileTextBox>
            </ProfileBox>
        </ContentsBox>
    )
};

const ContentsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    padding-bottom: 10px;
`;

const ProfileBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 30px;
    width: 100%;
    border-bottom: solid 1px rgba(45, 68, 33, 0.8);
    position: relative;
`;

const ProfileEditButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 20px;
    border: solid 1px rgba(45, 68, 33, 0.8);
    padding: 5px 10px;
    width: 50px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    display: flex;

    &:hover {
        background-color: rgba(45, 68, 33, 0.8);
    }
`;

const EditTitle = styled.h1`
    font-size: 13px;
    color: ${colors.headerColor};
    padding-top: 3px;
`;


const ProfileTextBox = styled.div`
    margin: 10% 0px;
`;

const ProfileImgBox = styled.div`
    position: relative;
    display: inline-block; /* 부모 요소 크기에 맞게 표시 */
`;

const ProfileImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 40px;
    transition: width 0.6s;

    @media (max-width: 1000px) {
        width: 100px;
        height: 100px;
    }
`;

const Empty = styled.div`
    width: 30px;
`;

const ProfileName = styled.h1`
    font-size: 19px;
    font-weight: bold;
    color: ${colors.headerColor};
`;

export default ProfileScreen;