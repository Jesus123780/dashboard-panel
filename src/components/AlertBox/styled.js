import styled, { keyframes } from 'styled-components'

const bounceInDown = keyframes`
    from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`
const bounceOutUp = keyframes`
    20% {
        -webkit-transform: translate3d(0, -10px, 0) scaleY(0.985);
        transform: translate3d(0, -10px, 0) scaleY(0.985);
    }

    40%,
    45% {
        opacity: 1;
        -webkit-transform: translate3d(0, 20px, 0) scaleY(0.9);
        transform: translate3d(0, 20px, 0) scaleY(0.9);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, -2000px, 0) scaleY(3);
        transform: translate3d(0, -2000px, 0) scaleY(3);
    }
`
export const Container = styled.div`
    animation: ${ ({ error, closed }) => error && (closed ? bounceOutUp : bounceInDown) } 1s forwards;
    padding: ${ props => props.error ? '15px' : 0 };
    top: 0;
    background-color: ${ ({ theme })=> theme.BGAColor };
    position: fixed;
    margin: auto;
    text-align: center;
    width: 100%;
    font-size: 18px;
    z-index: 999999999;
    position: absolute;
    right: 0;
    width: 300px;
    top: 82px;
    border-radius: 4px;
    border-left: 5px solid rgb(0, 159, 251);
    box-shadow: 0px 0px 6px #00000052;
    color: ${ ({ color }) => color === 'success' ? '#00ff9ffc' : color === 'error' ? '#dd4b39' : color === 'warning' ? '#ebbc26' : '#000' };
`