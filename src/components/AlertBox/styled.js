import styled, { keyframes } from 'styled-components'
import { BColor, BGColor, PColor } from '../../assets/colors'

const bounceInDown = keyframes`
    from {
    top: -50%;

  }

  to {
    top: 0%;
  }
`
const bounceOutUp = keyframes`
    20% {
    }

    to {
        top: 0%;
    }
`
export const ContainerText = styled.span`
    width: 100%;
    margin: auto;
    transition: 400ms;
    font-family: PFont-Light;
    color: ${ ({ color }) => color === 'success' ? '#FFF' : color === 'error' ? '#dd4b39' : color === 'warning' ? `${ BColor }` : `${ BGColor }` };
    `
export const ContainerToast = styled.div`
    animation: ${ ({ error, closed }) => error && (closed ? bounceOutUp : bounceInDown) } 1s forwards;
    height: ${ props => props.error ? '89px' : 0 };
    padding: ${ props => props.error ? '15px' : 0 };
    background-color: ${ ({ theme })=> theme.BGAColor };
    display: flex;
    justify-content: space-between;
    position: fixed;
    align-items: center;
    width: 100%;
    margin: auto;
    z-index: 9999999999;
    transition: 400ms;
    cursor: pointer;
    box-shadow: 0px 0px 6px #00000052;
    color: ${ ({ color }) => color === 'success' ? '#FFF' : color === 'error' ? '#dd4b39' : color === 'warning' ? `${ BColor }` : `${ BGColor }` };
    background-color: ${ ({ color }) => color === 'success' ? '#50a773' : color === 'error' ? `${ PColor };` : color === 'warning' ? '#ebbc26' : 'rgba(0, 0, 0, 0.9)' };
`
export const ContentIcon = styled.div`
    ${ ({ closed }) => closed && (!closed ? 'block' : 'none') };
`
export const ContentToast = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px !important;
    margin: auto;
    padding: 0 30px
`