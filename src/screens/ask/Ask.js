import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {TbMessageCircleQuestion} from "react-icons/tb";
import { colors } from "../../colors";
import { useLocation } from "react-router-dom";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import AskList from "./AskList";
import {BsArrowRightCircleFill} from "react-icons/bs";

const Ask = () => {
    const location = useLocation();
    const pathname = location.pathname; 
    const [getQuestion, setGetQuestion] = useState([]);
    const [profileUser, setProfileUser] = useState([]);
    const [ask, setAsk] = useState("");
    const pathUID = pathname.split('/')[2];

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if(name === "ask") {
            setAsk(value) ; 
        }
    };

    useEffect(() => {
        const getLoginUserData = async() => {
            if(pathUID) {
                const q = query(
                    collection(db, "Users", `${pathUID}`, "UsersData"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setProfileUser(doc.data());
                });     
            }
        };
        getLoginUserData();
    }, [pathUID]); 

    useEffect(() => {
            const FeedCollection = query(
                collection(db, "Users", `${pathUID}`, "QnA-Collection"), orderBy('orderBy', 'asc'));
                onSnapshot(FeedCollection, (querySnapshot) => {
                    let feedArray = []
                    querySnapshot.forEach((doc) => {
                        feedArray.push({
                            DocID: doc.id, 
                            Data: doc.data(),
                        })
                        // console.log(doc.data())
                    });
                setGetQuestion(feedArray);
                // console.log(feedArray)
            });
    }, [pathUID, pathname]); 

    const onAsk = async() => {
        if(ask) {
            await addDoc(collection(db, 'Users', `${pathUID}`, 'QnA-Collection'), {
                Question: ask,
                orderBy: new Date(),
                Favorites: false,
            }); 
            setAsk('');
        }
    };

    return(
        <Container>
            <Header>
                <QuestionIcon />
                <Text> Ask </Text>
            </Header>
            <ScrollableContent>
                {getQuestion.map((a, i) => (
                    <AskList key={i} getQuestion={a} profileUser={profileUser}/>
                ))}
            </ScrollableContent>
            <InputContainer>
                <TextInput type="text"
                    name="ask"
                    placeholder="ask"
                    maxLength={300}
                    required 
                    value={ask}
                    onChange={onChange} 
                />
                <TextSaveBtn onClick={onAsk}>
                    <SaveBtn />
                </TextSaveBtn>
            </InputContainer>
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

const QuestionIcon = styled(TbMessageCircleQuestion)`
    color: ${colors.headerColor};
    font-size: 27px;
`;

const ScrollableContent = styled.div`
    overflow-y: auto;
    flex: 1; /* 채워지지 않은 공간을 채우기 위해 flex: 1 설정 */

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const InputContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.1);
`;

const TextInput = styled.textarea`
    border: solid 1px ${colors.headerColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin: 0px 10px;
    color: black;
    font-size: 14px;
    border-width: 1px;
    width: 75%;
    outline: none; /* 포커스된 상태일 때 아웃라인 제거 */
    resize: vertical; /* 세로 방향으로만 조절 가능하도록 설정 */
    min-height: 50px; /* 초기 높이 설정 */
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        padding: 10px;
        font-size: 12px;
    }
`;

const TextSaveBtn = styled.div`
    cursor: pointer;
`;

const SaveBtn = styled(BsArrowRightCircleFill)`
    width: 34px;
    height: 34px;
    color: ${colors.headerColor};
`;

export default Ask