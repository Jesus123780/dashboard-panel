import styled, { css } from 'styled-components'
import { BGColor } from '../../assets/colors'

export const BoxInput = styled.div`
    position: relative;
    display: flex;
    border-left: 1px solid #0000000f;
    width: ${ ({ width }) => width ? width : '100%' };
    background-color: ${ BGColor };
`
export const ButtonHook = styled.div`
`
export const ButtonFocus = styled.button`
    background-color: transparent;
`
export const Tooltip = styled.div`
    position: absolute;
    display: none;
    right: 5px;
    bottom: 100%;
    border: 1px solid #0de0fe;
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 13px;
    color: #121319;
    &::after, &::before {
        top: 100%;
        left: 90%;
        border: solid transparent;
        content: "";
        position: absolute;
        pointer-events: none;
    }
    &::after {
        border-top-color: '#35a8df';
        border-width: 4px;
    }
    &::before {
        border-top-color: '#35a8df';
        border-width: 5px;
        margin-left: -1px;
    }
`
export const InputV = styled.input`
    color: ${ props => (props.type === 'date' && !props.value) ? '#CCC' : '#272323' };
    padding: ${ props => props.padding ? props.padding : '20px 10px' };
    outline: 0;
    background-color: ${ ({ theme }) => theme.TColor };
    border: none;
    font-weight: 600;
    font-size: ${ ({ size }) => size ? size : '13px' };
    width: ${ ({ width }) => width ? width : '100%' };
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    ${ ({ minWidth }) => minWidth && css`min-width: ${ minWidth };` }
    &:focus { border: 1px solid '#35a8df'; }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${ Tooltip } { display: block; }
    ${ ({ error }) => error && css`background-color: #FBCACA;` }
    & > button {
        ${ props => props.value && css`display:none;` };
    }
`