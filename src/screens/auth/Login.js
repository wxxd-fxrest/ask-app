import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import { colors } from "../../colors";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const {target : {name, value}} = event; 
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value); 
        }
    }; 

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            console.log("로그인 완료"); 
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found" || "auth/wrong-password":
                  return alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
                case "auth/email-already-in-use":
                  return alert("이미 사용 중인 이메일입니다.");
                case "auth/weak-password":
                  return alert("비밀번호는 6글자 이상이어야 합니다.");
                case "auth/network-request-failed":
                  return alert("네트워크 연결에 실패 하였습니다.");
                case "auth/invalid-email":
                  return alert("잘못된 이메일 형식입니다.");
                case "auth/internal-error":
                  return alert("잘못된 요청입니다.");
                default:
                  return alert("로그인에 실패 하였습니다.");
            };
        }
    }; 

    return(
        <ComponentContainer>
            <Text> 로그인 </Text>
            <ComponentForm onSubmit={onSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    required
                    value={email}
                    onChange={onChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    required
                    value={password}
                    onChange={onChange}
                />
                <Button type="submit">로그인</Button>
            </ComponentForm>
        </ComponentContainer>
    )
};

const ComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 18px;
    margin-bottom: 20px;
    color: ${colors.headerColor};
`;

const ComponentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: rgba(45, 68, 33, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default Login; 