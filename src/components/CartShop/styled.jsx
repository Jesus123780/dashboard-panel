import styled, { css } from 'styled-components';
import { BGColor } from '../../assets/colors';

export const Content = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    @media only screen and (min-width: 960px){
    }
`
export const Button = styled.button`
    margin: 0 0 0 30px;
    position: relative;
    cursor: pointer;
    z-index: 999;
    background-color:  transparent;
    ${ props => props.space &&css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        & > span {
            font-family: PFont-Light;
            font-size: 14px;
            color: ${ ({ theme }) => `${ theme.PColor }` };
        }
    ` }
    @media only screen and (min-width: 960px){
    }
`
export const FloatingBox = styled.div`
    position: absolute;
    grid-gap: 0 10px;
    display: grid;
    transition: all 200ms ease-in-out;
    background-color: ${ BGColor };
    padding: 10px;
  ${ ({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateY(-50px);
              ` }
    @media only screen and (min-width: 960px){
    }
`
export const FloatingBoxTwo = styled(FloatingBox)`
    margin: 0 0 0 30px;
    left: -240px;
    overflow: hidden;
    @media only screen and (min-width: 960px){
    }
  
`
export const Overline = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    ${ props => props.show ? css`display: block` : css`display: none;` };
    @media only screen and (min-width: 960px){
    }
  
`