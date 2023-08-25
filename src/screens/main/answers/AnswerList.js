import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../colors";
import {IoArrowUndoOutline} from "react-icons/io5";
import {FaTimes} from "react-icons/fa";
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../../firebase";
import {BsArrowRightCircleFill} from "react-icons/bs";

const AnswerList = ({getQuestion, currentUser}) => {
    const [ask, setAsk] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if(name === "ask") {
            setAsk(value) ; 
        }
    };

    const onDelete = async() => {
        console.log(getQuestion.DocID)
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`)); 
        }
    };

    const onAnswer = async() => {
        setModalVisible(true);

        if(ask) {
            await updateDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`), {
                Answer: ask,
            }); 
            setAsk('');
            setModalVisible(false);
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

    const handleRightClick = async(e) => {
        e.preventDefault();
        if(getQuestion.Data.Favorites === true) {
            const ok = window.confirm("즐겨찾기에 삭제하시겠습니까?")
            if(ok) {
                await updateDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`), {
                    Favorites: false,
                }); 
            }
        } else if(getQuestion.Data.Favorites === false) {
            const ok = window.confirm("즐겨찾기에 추가하시겠습니까?")
            if(ok) {
                await updateDoc(doc(db, 'Users', `${currentUser.email}`, 'QnA-Collection', `${getQuestion.DocID}`), {
                    Favorites: true,
                }); 
            }
        }
    };

    return(
        <>
            {getQuestion && <>
                <ContentsBox>
                    <QuestionBox onContextMenu={handleRightClick}>
                        <Question>
                            {getQuestion.Data.Question}
                        </Question>
                    </QuestionBox>

                    <IconContainer>
                        {!getQuestion.Data.Answer &&
                            <ReactionBox onClick={onAnswer}>
                                <IoArrowUndoOutline />
                            </ReactionBox>
                        }
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

            {isModalVisible ? 
                <TextInputContainer>
                    <CancleBox onClick={() => {
                        setModalVisible(false)
                    }}>
                        <CancleText> 취소 </CancleText>
                    </CancleBox>
                    <TextInput type="text"
                        name="ask"
                        placeholder="ask"
                        maxLength={300}
                        required 
                        value={ask}
                        onChange={onChange}
                    />
                    <TextSaveBtn onClick={onAnswer}>
                        <SaveBtn />
                    </TextSaveBtn>
                </TextInputContainer> 
            : null}
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
    /* margin: 5px 0px; */
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

const ReactionBox = styled.div`
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
    /* margin: 5px 0px; */
`;

const AnswerText = styled.h1`
    color: black; /* 변경된 부분 */
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

const TextInputContainer = styled.div`
    display: flex; /* 가로 중앙 정렬을 위한 flex 컨테이너 */
    justify-content: space-between; /* 가로 방향 가운데 정렬 */
    align-items: flex-start; /* 세로 방향 가운데 정렬 */
    border-top-width: 1px;
    border-top-color: #EAEAEA;
    padding: 15px;
    border-radius: 10px;
    margin: 0px 10px;
    background-color: rgba(45, 68, 33, 0.1);
`;

const CancleBox = styled.div`
    /* margin-right: 3%; */
    cursor: pointer;
`;

const CancleText = styled.h1`
    font-size: 15px;
`;

const TextSaveBtn = styled.div``;

const SaveBtn = styled(BsArrowRightCircleFill)`
    width: 34px;
    height: 34px;
    color: ${colors.headerColor};
`;

const TextInput = styled.textarea`
    border: solid 1px ${colors.headerColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin: 0px 10px;
    color: black;
    font-size: 14px;
    border-width: 1px;
    width: 70%;
    outline: none; /* 포커스된 상태일 때 아웃라인 제거 */
    resize: vertical; /* 세로 방향으로만 조절 가능하도록 설정 */
    min-height: 100px; /* 초기 높이 설정 */
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

export default AnswerList;