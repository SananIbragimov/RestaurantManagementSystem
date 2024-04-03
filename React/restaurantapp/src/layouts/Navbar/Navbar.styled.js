import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavbar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 12%;
    background-color: #0f4645;
    padding: 5px;
    ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        li{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 5px;
        }
    }
    &>div{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        padding-top: 100px;
        padding-left: 5px;
    }
`
export const StyledLink = styled(Link)`
    padding-top: 3px;
    font-size: 15px;
    color: #def2f1;
    text-decoration: none;
    &:hover{
        color: red;
        transition: all .4s ease-in;
    }
`