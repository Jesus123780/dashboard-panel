import styled, { css } from 'styled-components';
import { BGColor, PColor } from '../../assets/colors';

export const Text = styled.div`
    font-family: PFont-Regular;
    font-size: ${ ({ size })=> size ? size : '1.5em' };
    ${ props => props.bottom && css`
        padding: 10px ;
        border-bottom: 1px solid #00000012;
        text-align: center;
        cursor: pointer;
        color: ${ ({ color, theme }) => color === '1' ? theme.EColor : color === '2' ? theme.BVColor : '' }
    ;`
}
  
`
export const Container = styled.div`
    font-family: PFont-Regular;
    height: 100vh;
    z-index: 999;
    position: relative;
    padding: 30px;
    width: 100%;
    display: flex;
    overflow: hidden;
    ${ ({ bg }) => bg && css`background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 350 90"  height="200px"><text x="0" y="60%" font-size="3rem" font-weight="800" font-family="Roobert,Helvetica Neue,Helvetica,Arial,sans-serif" fill="red" opacity="0.1"> ${ bg } </text></svg>');` }
`
export const Circular = styled.div`
  height: 100px;
  padding: 30px;
  width: 100px;
  border-radius: 50%;
  background-color: ${ ({ theme }) => theme.PColor };
  color: ${ ({ theme }) => theme.PColor };
    @media only screen and (min-width: 960px){
    }
  
`
export const ContentOptions = styled.div`
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    background-color: ${ ({ theme }) => theme.InvTColor };
    color: ${ ({ theme }) => theme.PColor };
        @media only screen and (min-width: 960px){
        } 
`
export const LefPart = styled.div`
    width: 33.3%;
    display: inline-block;
    position: relative;
    vertical-align: top;
    white-space: normal;
    height: min-content;
    padding: 30px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${ ({ theme }) => theme.InvColor };
    transition: all .3s ease;
    overflow: hidden;
    z-index: 999;
    &:hover{
        box-shadow: 0 20px 50px 0 rgb(0 0 0 / 10%);
    }
    ${ props => props.position &&css`
    z-index: 99;
    position: absolute;
    left: 10px;

    ` }
    @media only screen and (min-width: 960px){
    } 
`
export const LabelInput = styled.span`
    position: absolute;
    text-align: left;
    font-size: ${ ({ value }) => value ? '16px' : '16px' };
    top: ${ ({ value }) => value ? '5px' : '10px' };
    left: 15px;;
    left: ${ ({ left }) => left ? left : '17px' };
    transition: .2s;
    background-color: ${ BGColor };
    color:  #CCC;
    pointer-events: none;
    font-family: PFont-Light;
    user-select: none;
`
export const Input = styled.input`
    padding: 20px 10px;
    margin: 10px 0;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    font-family: PFont-Light;  
    &:focus ~ ${ LabelInput } {
        font-size: 16px;
        color: #CCC;
        padding: 0px 5px ;
    }  
    &::selection{
        background-color: red;
        color: ${ BGColor }
    }
    &:disabled{
        color: #808080;
    }
`
export const TextArea = styled.textarea`
    padding: 20px 10px;
    margin: 10px 0;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    font-family: PFont-Light;
    min-height: 300px;  
    &:focus ~ ${ LabelInput } {
        font-size: 16px;
        color: #CCC;
        padding: 0px 5px ;
    }  
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
    }
`
export const HeroBanner = styled.div`
    width: 100%;
    height: 350px;
    background-color: ${ PColor };
    position: relative;
    z-index: 9;

`
export const SocialSection = styled.div`
    position: absolute;
    height: 70px;
    width: 190px;
    background-color: ${ BGColor };
    box-shadow: 0px 0px 6px 0px #16101026;
    border-radius: 5px;
    bottom: -30px;
    right: 3%;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px !important;
    margin: auto;
    display: flex;
`
export const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`
export const InputSocial = styled.input`
    border: 1px solid #dcdcdc;
    opacity: 0;
    transition: 0.5s ease;
    outline: none;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: auto;
`
export const BtnShare = styled.button`
    outline: none;
    cursor: pointer;
    background-color: ${ BGColor };
    border-radius: 50%;
    height: 50px;
    width: 50px;
    border: 1px solid #dcdcdc;
    &:hover  > input {
        opacity: 1;
    }
`
export const Anchor = styled.a`
    padding: 20px 10px;
    margin: 10px 0;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    font-family: PFont-Light;  

`
export const BoxInput = styled.div`
    position: relative;
    overflow: hidden;
    padding: ${ ({ padding }) => padding ? padding : '10px 5px' };
    width: ${ ({ width }) => width ? width : '100%' };
`
export const Paragraph = styled.p`
    font-weight: 300;
    line-height: 29px;
    text-align: justify;
    list-style: initial;
    color: #717171;
    font-family:  PFont-Light;
    margin: 7px 0px;
    font-size: 14px;
`