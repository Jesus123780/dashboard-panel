import styled, { css } from 'styled-components'

export const BoxInput = styled.div`
    position: relative;
    padding: ${ ({ padding }) => padding ? padding : '10px 5px' };
    width: ${ ({ width }) => width ? width : '100%' };
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
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value, type }) => (value || type === 'date') ? '11px' : '17px' };
    top: ${ ({ value, type }) => (value || type === 'date') ? '15px' : '28px' };
    left: ${ ({ left }) => left ? left : '17px' };
    color: ${ ({ value, labelColor, error }) => value ? (labelColor ? labelColor : '#272323') : (error ? '#fff' : '#CCC') };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`
export const InputV = styled.input`
    color: ${ props => (props.type === 'date' && !props.value) ? '#CCC' : '#272323' };
    padding: ${ props => props.padding ? props.padding : '20px 10px' };
    outline: 0;
    background-color: ${ ({ theme }) => theme.TColor };
    border: 1px solid ${ ({ theme }) => theme.InpBorColor };
    font-weight: 600;
    font-size: ${ ({ size }) => size ? size : '13px' };
    width: ${ ({ width }) => width ? width : '100%' };
    border-radius: ${ ({ radius }) => radius ? radius : '5px' };
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    ${ ({ minWidth }) => minWidth && css`min-width: ${ minWidth };` }
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` }
    &:focus ~ ${ LabelInput } {
        top: 15px;
        font-size: 13px;
        color: #CCC;
    }
    &:focus { border: 1px solid '#35a8df'; }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${ Tooltip } { display: block; }
    ${ ({ error }) => error && css`background-color: #FBCACA;` }
`