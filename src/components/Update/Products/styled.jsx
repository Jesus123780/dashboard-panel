import styled, { css } from 'styled-components';
import { BGColor } from '../../../assets/colors';

export const Button = styled.button` 
    position: absolute;
    z-index: 9999;
`
export const FormProducts = styled.form`
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
    }
`

export const Container = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${ BGColor };
    transition:  6s ease;
    `
export const Card = styled.div` 
    position: relative;
    width: ${ props => props.state ? '100%' : '70%' };
    background-color: ${ ({ bgColor }) => bgColor ? bgColor : `${ BGColor }` };
`
export const TextareaDescription = styled.textarea` 
    position: relative;
    min-width: 100%;
    max-width: 370px;
    min-height: 470px;
    border: 1px solid #eee;
    outline: none;
    font-size: 19px;
    font-family: PFont-Light;
`
export const Label = styled.span` 
    outline: none;
    font-size: 17px;
    width: 100%;
    margin: 20px 5px;
    font-family: PFont-Light;
`
export const CardOne = styled(Card)` 
    ${ props => props.state ? css`width: 0%` : css`width: 30%` };
    transition:  .6s ease;
`