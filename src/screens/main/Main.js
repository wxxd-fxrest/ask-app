import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import styled from "styled-components";
import Answer from "./answers/Answer";
import Favorites from "./answers/Favorites";
import Setup from "../../screens/main/Setup";
import { AuthContext } from "../../AuthContext";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const Main = () => {
    const {currentUser} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [profileUser, setProfileUser] = useState([]);

    useEffect(() => {
        const getLoginUserData = async () => {
            if (currentUser) {
                const q = query(
                    collection(db, "Users", `${currentUser.email}`, "UsersData")
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setProfileUser(doc.data());
                    console.log(doc.data());
                });
            }
        };
        getLoginUserData();
    }, [currentUser, profileUser.profileImgURL]); 

    useEffect(() => {
        const getLoginUserData = async () => {
            const docRef = doc(db, "Users", `${currentUser.email}`);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserData(userData); // 상태 업데이트
                console.log("Document data:", userData); // 새로운 상태값 콘솔 출력
            } else {
                console.log("No such document!");
            }
        };
        getLoginUserData();
    }, [currentUser]);

    return (
        <Container>
            <SideBarContainer>
                <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
            </SideBarContainer>
            {selectedTab === 0 && 
                <Content>
                    <Answer />
                </Content>
            }
            {selectedTab === 1 && 
                <Content>
                    <Favorites />
                </Content>
            } 
            {selectedTab === 2 && 
                <Content>
                    <Setup profileUser={profileUser} userData={userData}/>
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

export default Main;