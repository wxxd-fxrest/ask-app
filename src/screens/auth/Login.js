import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../colors";
import { auth } from "../../firebase";

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
            alert(error.message);
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