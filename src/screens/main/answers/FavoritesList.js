import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { db } from "../../../firebase";
import {FaTimes} from "react-icons/fa";

const FavoritesList = ({getQuestion, currentUser}) => {
    
    const handleRightClick = async(e) => {
        e.preventDefault();
        if(getQuestion.Data.Favorites === true) {
            const ok = window.confirm("즐겨찾기에 삭제하시겠습니까?")
            if(ok) {
                await updateDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`), {
                    Favorites: false,
                }); 
            }
        }
    };

    const onDelete = async() => {
        console.log(getQuestion.DocID)
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`)); 
        }
    };

    const onAnswerDelete = async() => {
        console.log(getQuestion.DocID)
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await updateDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`), {
                Answer: '',
            }); 
        }
    };

    return(
        <>
            {getQuestion && <>
                {getQuestion.Data.Favorites === true && <>
                    <ContentsBox>
                        <QuestionBox onContextMenu={handleRightClick}>
                            <Question>
                                {getQuestion.Data.Question}
                            </Question>
                        </QuestionBox>

                        <IconContainer>
                            <DeleteBox onClick={onDelete}>
                                <FaTimes />
                            </DeleteBox>
                        </IconContainer>
                    </ContentsBox>

                    {getQuestion.Data.Answer &&
                        <ContentsBox2>
                            <AnswerIconContainer>
                                <AnswerDeleteBox onClick={onAnswerDelete}>
                                    <FaTimes />
                                </AnswerDeleteBox>
                            </AnswerIconContainer>
                            <AnswerBox>
                                <AnswerText>
                                    {getQuestion.Data.Answer}
                                </AnswerText>
                            </AnswerBox>
                        </ContentsBox2> 
                    }
                </>}
            </>}
        </>
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

const QuestionBox = styled.div`
    background-color: rgba(45, 68, 33, 0.23);
    padding: 10px;
    border-radius: 0px 10px 10px 10px;
    max-width: 70%;
`;

const Question = styled.h1`
    color: black;
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const DeleteBox = styled.div`
    display: flex; /* 중앙 정렬을 위한 flex 컨테이너 */
    justify-content: center; /* 가로 방향 중앙 정렬 */
    align-items: center; /* 세로 방향 중앙 정렬 */
    background-color: rgba(45, 68, 33, 0.4);
    padding: 6px;
    border-radius: 10px;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(45, 68, 33, 0.8);
    }
`;

const ContentsBox2 = styled.div`
    display: flex;
    justify-content: flex-end; /* 변경된 부분 */
    align-items: flex-end; /* 변경된 부분 */
    flex-direction: row;
    padding: 0px 10px;
    padding-bottom: 10px;
`;

const AnswerIconContainer = styled.div`
    flex-direction: row;
    margin: 5px 8px;
`;

const AnswerDeleteBox = styled.div`
    display: flex; /* 중앙 정렬을 위한 flex 컨테이너 */
    justify-content: center; /* 가로 방향 중앙 정렬 */
    align-items: center; /* 세로 방향 중앙 정렬 */
    background-color: rgba(45, 68, 33, 0.4);
    padding: 6px;
    border-radius: 10px;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(45, 68, 33, 0.8);
    }
`;

const AnswerBox = styled.div`
    background-color: rgba(173, 189, 164, 0.25); /* 변경된 부분 */
    padding: 10px;
    border-radius: 10px 10px 0px 10px;
    max-width: 70%;
`;

const AnswerText = styled.h1`
    color: black; /* 변경된 부분 */
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

export default FavoritesList;