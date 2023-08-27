import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {TbChartBubble} from "react-icons/tb";
import { colors } from "../../../colors";
import { AuthContext } from "../../../AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import FavoritesList from "./FavoritesList";

const Favorites = () => {
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
            });
            setGetQuestion(feedArray);
        });
    }, [currentUser.email]);

    return (
        <Container>
            <Header>
                <FavoritesIcon/>
                <Text> 즐겨찾기 </Text>
            </Header>
            <ScrollableContent>
                {getQuestion.map((a, i) => (
                    <FavoritesList key={i} getQuestion={a} currentUser={currentUser}/>
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

const FavoritesIcon = styled(TbChartBubble)`
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



export default Favorites;