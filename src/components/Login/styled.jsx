import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BGColor, PColor } from '../../assets/colors';

export const Content = styled.div`
@media only screen and (min-width: 960px){
    width: 100%;
    display: flex;
    margin: auto;
    flex: wrap;
    padding: 0 30px;
    grid-template-rows: unset;
    width: 100%;
    max-width: 1366px !important;
    margin: auto;
    padding: 0 30px;
    grid-template-rows: unset;
}

`
export const Form = styled.div`
box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    border-radius: 8px;
    padding: 36px   ;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    align-self: center;
`
export const ContainerSliderForm = styled.form`
    @media (min-width: 768px) {
        position: absolute;
        width: 100%;
        top: 0;
        padding: 36px 50px;
        margin: auto;
        height: 100%;
        background-color: ${ BGColor };
        left: 0;
        transform: ${ props => props.activeLogin ? 'translateX(0px)' : 'translateX(900px)' };
        transition: all 0.6s ease;
    }
`
export const GoBack = styled.button`
    background-color: transparent;
    cursor: pointer; 
`
export const Iconos = styled.div`
    color: ${ ({ color, theme }) => (color ? color : theme.PLColor) };
    margin: ${ ({ margin }) => (margin ? margin : '0px 7px') };
    ${ ({ size }) => size &&
        css`
            font-size: ${ size };
        ` }
`
export const ButtonSubmit = styled.button`
    background-color: ${ ({ color, theme }) => color === '1'
        ? ' #4065b4'
        : color === '2'
            ? `${ BGColor }`
            : theme.SFAColor };
    outline: none;
    border: none;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    font-family:  PFont-Regular;
    cursor: pointer;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: ${ ({ content }) => content ? content : 'space-between' };
    font-size: ${ ({ size }) => (size ? size : '1rem') };
    color: ${ ({ colorFont }) => (colorFont ? colorFont : `${ BGColor }`) };
    line-height: 1.5;
    border-radius: 0.3rem;
    text-align: center;
    width: 100%;
    margin: 10px 7px;
    ${ props => props.hoverColor &&
        css`
            &:hover {
                color: ${ BGColor };
                background-color:${ PColor };
            }
        ` };
    ${ props => props.colorPrimary &&
        css`
            {
                color: ${ BGColor };
                background-color:${ PColor };
            }
        ` };
`
export const Enlace = styled(Link)`
    position: absolute;
    transform: translateX(0);
    left: 44px;
    display: block;
`
export const Card = styled.div`
    right: 0;
    bottom: unset;
    left: auto;
    width: 80vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
`
export const Text = styled.h2`
@media only screen and (min-width: 960px){
    margin: 0 0 42px;
    text-align: center;
    font-size: ${ ({ size }) => size ? size : '1.5rem' };
}
    font-weight: initial;
    font-family: PFont-Regular;
    color: ${ ({ color }) => color ? color : '#717171' };
    margin: 0 0 22px;
    ${ props=> props.cursor && css`cursor: pointer;` }
`