import styled, { css } from 'styled-components';
import bg from '../../assets/img/bgMessages.png';

export const Container = styled.div`
    display: grid;
    /* grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) ); */
    width: 100%;
    /* grid-gap: 19px 12px; */
    height: 90vh;
    min-height: 90vh;
    max-height: 90vh;
    overflow-y: auto;
    grid-template-columns: 20% repeat(auto-fill, 80%);

`
export const Card = styled.div`
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
    ${ props => props.ms &&css`
        background-image: url(${ bg });
        background-repeat: repeat;
        background-color: #5f0b0b28 !important;
    ` }
    border-left: .4px solid #cccccc73;
@media (min-width: 992px){
}
@media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 100%;
}
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
export const ImgUser = styled.div`
    width: 50px;
    min-width: 50px;
    border: 1px solid;
    border-radius: 50%;
    min-height: 50px;
    display: grid;
    place-content: center;
`
export const ContentMessage = styled.div`
    width: 100%;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 1%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    justify-content: ${ ({ messageUser, user }) => messageUser === user ? 'flex-end' : 'flex-start' };
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
    align-items: center;
    background-color: ${ ({ theme })=> theme.InvColor };
`
export const Input = styled.input`
    padding: 10px 16px;
    background-color: ${ ({ theme })=> theme.InvColor };
    outline: none;
    
`