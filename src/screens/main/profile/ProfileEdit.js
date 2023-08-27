import React, { useContext, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../colors";
import DefaultImage from '../../../assets/QnA-Profile.png';
import {FaUserCheck} from "react-icons/fa";
import {TbPhotoEdit} from "react-icons/tb";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../../AuthContext";

const ProfileEdit = ({profileUser, userData, setEdit, edit}) => {
    const {currentUser} = useContext(AuthContext);
    const [editName, setEditName] = useState(""); 
    const [selectedImage, setSelectedImage] = useState(null);

    const onChange = (event) => {
        const {target : {name, value}} = event; 
        if (name === "name") {
            setEditName(value);
        }
    }; 

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const attachmentRef = ref(storage, `images/${currentUser.uid + uuidv4()}`);
            
            try {
                await uploadBytes(attachmentRef, imageFile);
                const imageUrl = await getDownloadURL(attachmentRef);
                setSelectedImage(imageUrl);
                // console.log("이미지 업로드 완료:", imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    
    const onEditComplete = async () => {
        try {
            if (selectedImage) {
                await updateDoc(doc(db, "Users", `${currentUser.email}`, "UsersData", "URL"), {
                    profileImgURL: selectedImage,
                });
                console.log("Firestore 이미지 URL 업데이트 완료:", selectedImage);
                window.location.reload();
            }
            if (editName) {
                await updateDoc(doc(db, "Users", `${currentUser.email}`), {
                    name: editName 
                });
                window.location.reload();
            }
            setEdit(!edit)
        } catch (error) {
            console.error('Error updating Firestore:', error);
        }
    };

    return (
        <ContentsBox>
            <ProfileBox>
                <ProfileEditButton onClick={onEditComplete}>
                    <FaUserCheck size={18} color={colors.headerColor}/>
                    <EditTitle> 완료 </EditTitle>
                </ProfileEditButton>
                <ProfileImgBox>
                    <SelectImg type="file"
                        id="inputFile"
                        onChange={handleImageUpload}
                        required />
                    <label htmlFor="inputFile">
                        {selectedImage ? 
                            <ProfileSelectImg src={selectedImage} alt="" style={{cursor: "pointer"}}/> 
                            : 
                            <ProfileImage src={profileUser ? profileUser.profileImgURL : DefaultImage}/>}
                    </label>
                    <EditIcon />
                </ProfileImgBox>
                <Empty />
                <ProfileTextBox>
                    <Input type="text"
                        name="name"
                        placeholder={userData && userData.name}
                        required
                        maxLength={10}
                        value={editName}
                        onChange={onChange}
                    />
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
    padding: 10px 10px;
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

const SelectImg = styled.input`
    background-color: yellowgreen;
    opacity: 0; /* 투명하게 설정 */
    cursor: pointer;
    position: absolute;
    z-index: 10;
    width: 100px;
    height: 100px;
    left: 50%; /* 컨테이너의 가운데로 이동 */
    top: 50%; /* 컨테이너의 가운데로 이동 */
    transform: translate(-50%, -50%); /* 중앙 정렬 */
`;

const EditIcon = styled(TbPhotoEdit)`
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%; /* 컨테이너의 가운데로 이동 */
    top: 50%; /* 컨테이너의 가운데로 이동 */
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    color: white;
    transition: color 0.3s ease; /* 스타일 변화를 부드럽게 표시 */
`;

const ProfileImgBox = styled.div`
    position: relative;
    cursor: pointer;
    display: inline-block; /* 부모 요소 크기에 맞게 표시 */

    &:hover {
        ${EditIcon} {
            color: rgba(45, 68, 33, 0.8);
        }
    }
`;

const ProfileImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 40px;
    transition: width 0.6s;
    opacity: 0.6;

    @media (max-width: 1000px) {
        width: 100px;
        height: 100px;
    }
`;

const ProfileSelectImg = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 40px;
    transition: width 0.6s;
    opacity: 0.6;

    @media (max-width: 1000px) {
        width: 100px;
        height: 100px;
    }
`;

const Empty = styled.div`
    width: 30px;
`;

const EditTitle = styled.h1`
    font-size: 13px;
    color: ${colors.headerColor};
    padding-top: 3px;
`;

const ProfileTextBox = styled.div`
    margin: 10% 0px;
`;

const Input = styled.input`
    color: ${colors.headerColor};
    font-size: 17px;
    font-weight: bold;
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    border-bottom: solid 1px black;
`;

export default ProfileEdit; 