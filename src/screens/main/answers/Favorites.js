import React from "react";
import styled from "styled-components";
import {TbChartBubble} from "react-icons/tb";
import { colors } from "../../../colors";

const Favorites = () => {
    return (
        <Container>
            <FavoritesIcon/>
            <Text> Favorites </Text>
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

const FavoritesIcon = styled(TbChartBubble)`
    color: ${colors.headerColor};
    font-size: 27px;
`;


export default Favorites;