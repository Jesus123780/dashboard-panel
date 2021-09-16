import styled, { css } from 'styled-components';
import { PColor } from '../../assets/colors';
import bg from '../../assets/img/bgMessages.png';
import { animationFadeDown } from '../animations';

export const Container = styled.div`
    display: grid;
    /* grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) ); */
    width: 100%;
    /* grid-gap: 19px 12px; */
    height: 90vh;
    min-height: 90vh;
    max-height: 90vh;
    position: relative;
    overflow-y: auto;
    overflow: hidden;
    grid-template-columns: 20% repeat(auto-fill, 80%);

`
export const Card = styled.div`
    border-left: .4px solid #cccccc73;
@media (min-width: 992px){
}
@media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 100%;
}
`
export const ContentUserImg = styled.button`
    width: ${ ({ width })=> width ? width : '50px' };
    min-width: ${ ({ width })=> width ? width : '50px' };
    min-height: ${ ({ height }) => height ? height : '50px' };
    border: 1px solid;
    border-radius: 50%;
    display: grid;
    margin: auto;
    place-content: center;
`
export const CardTwo = styled(Card)`
    display: flex;
    animation: ${ animationFadeDown } 1s cubic-bezier(.1,.82,.25,1);
    flex-direction: column;
    justify-content: center;
`
export const ContentUser = styled.div`
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
    flex-grow: 1;
    cursor: pointer;
    user-select: none;
    border-bottom: .8px solid #ccc;
    align-items: center;
    padding: 10px;
    ${ props => props.bg &&css`
        background-color: #1b273c16;
    ` }
    &:hover {
        background-color: #1b273c16;
    }
`

export const ContainerMessage = styled.div`
    width: 100%;
    display: flex;
`
export const CardMessage = styled.div`
    ${ props => props.ms &&css`
        background-image: url(${ bg });
        background-repeat: repeat;
        background-color: #5f0b0b28 !important;
        
    ` }
    ${ props => props.card &&css`
        padding: 0px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    ` }

`
export const ContentMessage = styled.div`
    width: 100%;
    padding-left: 9%;
    padding-right: 9%;
    padding-top: 1%;
    display: flex;
    position: relative;
    justify-content: ${ ({ messageUser, user }) => messageUser === user ? 'flex-end' : 'flex-start' };
`
export const InputContainer = styled.div`
    position: absolute;
    bottom: 0;
`
export const ContentMessageShow = styled.div`
     height: calc(85vh - 100px);
    max-height: 584px;
    margin: auto;
    padding: 0px;
    overflow-y: auto;
    max-height: 100%;
    min-height: 450%;
    &::-webkit-scrollbar {
        width: 5px;
        background-color: #dcdcdc;
        border-radius: 5px;
    }
`
export const Message = styled.div`
    padding: 6px 7px 8px 9px;
    font-size: 100%;
    vertical-align: initial;
    outline: none;
    margin: 0;
    position: relative;    
    word-break: break-word;
    white-space: pre-wrap;
    margin-bottom: 12px;
    background-color:#056162;
    width: max-content;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    border-radius: 11px 0px 12px 10px;
    color: ${ ({ theme })=> theme.InvColor };
    ${ ({ messageUser, user })=>messageUser === user ? css`
        border-radius: 11px 0px 12px 10px;
    ` : css`
    border-radius: 0px 11px 12px 14px;
    ` }
    ${ ({ messageUser, user })=>messageUser === user ? css`
    &:nth-child(1){
        &:before {
            border-bottom: 6px solid transparent;
            border-left: 6px solid #056162;
            border-top: 6px solid transparent;
            content: '';
            height: 0;
            left: auto;
            position: absolute;
            right: -6px;
            top: 0;
            width: 0;
        }
    }
    ` : css`
    &:nth-child(1){
        &:before {
            border-bottom: 6px solid transparent;
            border-right: 6px solid #056162;
            border-top: 6px solid transparent;
            content: '';
            position: absolute;
            left: -5px;
            top: 0;
            width: 0;
        }
    }
    ` }


`
export const Name = styled.div`
    font-family: PFont-Regular;
    margin-left: 18px;
    font-size: ${ ({ size })=> size ? size :'13px' };
`
export const HeaderMessage = styled.div`
    padding: 10px 16px;
    display: flex;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    min-height: 50px;
    height: 70px;
    align-items: center;
    background-color: ${ ({ theme })=> theme.InvColor };
`
export const ContainerBurger = styled.div`
    .BurgerMenu__container {
    display: flex;
    flex-direction: column;    
    span {
      background-color: ${ PColor };
      width: 30px;
      height: 2px;
      margin: 4px;
      border-radius: 1px;
      transition: all .3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px) translateX(9px);
    }
    .close:nth-child(1) {
      transform: rotate(0) translateY(0);
    }
    .close:nth-child(2) {
      opacity: 1;
    }
    .close:nth-child(3) {
      transform: rotate(0) translateY(0);
    }
}`
export const Input = styled.input`
    padding: 10px 16px;
    height: 100%;
    outline: none;
    background-color: ${ ({ theme })=> theme.InvColor };
`
export const LeftMenu = styled.div`
    background-color: ${ ({ theme })=> theme.InvColor };
    position: relative;
    width: 500px;
    border-left: 1px solid #8a8a8b73;
    flex-direction: column;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    transition:  1s cubic-bezier(.1,.82,.25,1);
    ${ props => props.show ? css`width: 40%;`: css`width: 0%;` }
`
export const Text = styled.h3`
    font-size: ${ ({ size })=> size ? size : '2em' };
    font-family: PFont-Light;
    font-weight: 500;
`