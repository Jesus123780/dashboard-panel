import styled from 'styled-components';
import { BGColor } from '../../assets/colors';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 0px;
`
export const HeroBanner = styled.div`
    width: 100%;
    height: 350px;
    overflow: hidden;
    background-color: red;
`
export const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;

`
export const Form = styled.form`
    width: 45%;
    min-width: 45%;
    min-height: 100%;
    background-color: ${ BGColor };
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 5px;
    margin: 0px 10px;
    padding: 20px;
    `
export const Card = styled.div`
    width: 45%;
    min-width: 45%;
    min-height: 100%;
    background-color: ${ BGColor };
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 5px;
    margin: 0px 10px;
    padding: 20px;
`
export const Text = styled.h3` 
    font-size: ${ ({ size })=> size ? size : '15px' };
    text-align: ${ ({ align })=> align ? align : 'center' };
    width: 100%;
    margin: 5px 0px;
    font-weight: 400;
    font-family: PFont-Light;
    word-break: break-word;
`