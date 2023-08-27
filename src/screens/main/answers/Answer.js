import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase.js";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import styled from "styled-components";
import {IoChatbubbleEllipsesOutline} from "react-icons/io5";
import { colors } from "../../../colors";
import { AuthContext } from "../../../../src/AuthContext.js";
import AnswerList from "./AnswerList";

const Answer = () => {
    const {currentUser} = useContext(AuthContext);
    const [getQuestion, setGetQuestion] = useState([]);

    useEffect(() => {
        const FeedCollection = query(
            collection(db, "Users", `${currentUser.email}`, "QnA-Collection"), orderBy('orderBy', 'asc'));
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
    }, [currentUser.email]);

    return (
        <Container>
            <Header>
                <AnswerIcon/>
                <Text> Answer </Text>
            </Header>
            <ScrollableContent>
                {getQuestion.map((a, i) => (
                    <AnswerList key={i} getQuestion={a} currentUser={currentUser}/>
                ))}
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

const AnswerIcon = styled(IoChatbubbleEllipsesOutline)`
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

export default Answer;