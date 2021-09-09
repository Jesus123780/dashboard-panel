import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BGColor } from '../../assets/colors';

export const Content = styled.div`
@media only screen and (min-width: 960px){
    position: relative;
    width: 100%;
    display: grid;
    margin: auto;
    width: 100%;
    margin: auto;
    grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
}

`
export const ContentSvg = styled.div`
position:  relative;
    @media (max-width:  768px) {
       display: none;

    }
`
export const Form = styled.form`
    @media (min-width: 768px) {
        padding: 36px 50px;
        z-index: 99;
        margin: auto 0px auto  auto ;
        transition: all 0.6s ease;
        height: min-content;
        display: flex;
    justify-content: right;
    }
    `
export const Card = styled.div`    
    padding: 36px 50px;
    width: 70%;
    border-radius: 5px;
    background-color: ${ BGColor };
    border: 1px solid #00000014;

`
export const Text = styled.h3` 
    font-size: 20px;
    text-align: ${ ({ align })=> align ? align : 'center' };
    width: 100%;
    margin: 5px 0px;
    font-weight: 400;
    font-family: PFont-Light;
    word-break: break-word;
`
export const Enlace = styled(Link)`
    position: absolute;
    transform: translateX(0);
    left: 44px;
    display: block;
    z-index: 99999;
`