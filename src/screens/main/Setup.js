import React from "react";
import styled from "styled-components";
import {IoSettingsOutline} from "react-icons/io5";
import { colors } from "../../colors";

const Setup = () => {
    return (
        <Container>
            <SetupIcon/>
            <Text> Setup </Text>
        </Container>
    )
};

const Container = styled.div`
    /* background-color: wheat; */
    flex-direction: row;
    justify-content: center;
    display: inline-flex;
    align-items: flex-end;
`;

const Text = styled.h1`
    margin: 0px 10px;
    font-size: 18px;
    color: ${colors.headerColor};
    font-weight: bold;
`;

const SetupIcon = styled(IoSettingsOutline)`
    color: ${colors.headerColor};
    font-size: 27px;
`;


export default Setup;