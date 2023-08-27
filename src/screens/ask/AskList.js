import React from "react";
import styled from "styled-components";
import {LiaExclamationCircleSolid} from "react-icons/lia";
import DefaultImage from '../../assets/QnA-Profile.png';

const AskList = ({getQuestion, profileUser}) => {
    return(
        <>
            {getQuestion && getQuestion.Data.Answer ? <>
                <ContentsBox>
                    <QuestionBox>
                        <Question>
                            {getQuestion.Data.Question}
                        </Question>
                    </QuestionBox>
                </ContentsBox>

                <ContentsBox2>
                <ProfileImage src={profileUser ? profileUser.profileImgURL : DefaultImage} alt=""/>
                    <AnswerBox>
                        <Answer>
                            {getQuestion.Data.Answer}
                        </Answer>
                    </AnswerBox>
                </ContentsBox2> 
            </>
            : 
                <ContentsBox>
                    <UnansweredBox>
                        <UnansweredIcon size={20}/>
                        <Unanswered> 미답변 질문입니다. </Unanswered>
                    </UnansweredBox>
                </ContentsBox>
            }
        </>
    )
};

const ContentsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px 20px;
    padding-bottom: 10px;
`;

const QuestionBox = styled.div`
    background-color: rgba(173, 189, 164, 0.25); 
    padding: 10px;
    border-radius: 10px 10px 0px 10px;
    max-width: 80%;
    margin: 5px 0px;
`;

const UnansweredBox = styled.div`
    background-color: rgba(173, 189, 164, 0.25); 
    padding: 10px;
    border-radius: 10px 10px 0px 10px;
    margin: 5px 0px;
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const UnansweredIcon = styled(LiaExclamationCircleSolid)`
    margin-right: 5px;
    color: rgb(45, 68, 33); 
`;

const Unanswered = styled.h1`
    color: #5D5D5D;
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

const Question = styled.h1`
    color: black;
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

const ContentsBox2 = styled.div`
    display: flex;
    justify-content: flex-start; /* 변경된 부분 */
    align-items: flex-start;
    flex-direction: row;
    padding: 0px 10px;
    padding-bottom: 10px;
`;

const ProfileImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 30px;
    margin-right: 10px;
`;

const AnswerBox = styled.div`
    background-color: rgba(45, 68, 33, 0.23);
    padding: 10px;
    border-radius: 0px 10px 10px 10px;
    max-width: 80%;
    margin: 5px 0px;
`;

const Answer = styled.h1`
    color: black; /* 변경된 부분 */
    margin: 0;
    font-size: 13px;
    font-weight: 300;
    line-height: 18.5px;
`;

export default AskList;