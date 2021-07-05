import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SEGColor, BGColor } from '../../assets/colors'
export const Span = styled.span`
    color: ${ props => props.active ? '#131313' : `${ SEGColor }` };
    font-weight: 500;
    display: block;
    margin-right: 1em;
    font-size: 14px;
    font-family: Poppins;
`
export const LinkOption = styled(Link)`
    display: block;
    text-decoration: none;
    font-size: 12px;
    padding: 5px 10px;
    padding-left: 10px;
    text-align: left;
    white-space: nowrap;
    margin: 0 30px;
`
export const ContainerBurger = styled.div`
    .BurgerMenu__container {
    display: flex;
    flex-direction: column;    
    span {
      background-color: ${ BGColor };
      width: 25px;
      height: 1px;
      margin: 4px;
      border-radius: 1px;
      transition: all .1s ease-out;
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
}
`
export const SideBarLeft = styled.div`
    justify-self: center;
    transition: .3s;
    position: relative;
    @media( max-width: 1200px ){
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    @media( min-width: 1200px ){
        width: ${ ({ collapsed })=> collapsed ? '40%' : '100%' };
    }
`
export const ContainerOptions = styled.div`
&>button:nth-child(6){
    align-self: center;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 90%;
}

    @media( max-width: 1200px ){
        display: none;
    }
`
export const ContainerUserImg = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span{
        @media( min-width: 1200px ){
        display: ${ ({ collapsed })=> collapsed ? 'none' : 'flex' };
    }
    }
`
export const ButtonMenu = styled.button`
    background-color: transparent;
`
export const Content = styled.div`
    width: 90%;
    margin: auto;
    @media( max-width: 1200px ){
        width: 100%;
    }
`
export const BoxSideBar = styled.aside`
    top: 0;
    height: 100%;
    background: #fff;
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0px 40px rgb(0 0 0 / 5%);
    background: ${ SEGColor };
    width: 100%;
    border-radius: 10px;
    @media( max-width: 1200px ){
        height: min-content;
        border-radius: 0px;
    }
`
export const MenuLeft = styled.button`
    width: 100%;
    white-space: nowrap;
    height: ${ ({ height }) => height ? height : 'auto' }px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: Poppins;
    background: ${ SEGColor };
    align-self: ${ ({ alignSelf }) => alignSelf || 'auto' };
    & > div:first-child { pointer-events: none; }
    transition: .3s;
    overflow: hidden;
    background-color:${ BGColor };
    border-radius: 15px;
    margin: 5px; 
    border-bottom: 1px solid ${ SEGColor }32;
    & a {
        color: ${ props => props.active ? '#a6b0cf' : '#a6b0cf' };
    }
     
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 30px;
    width: 10%;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 80%;
    align-items: center;
    margin: auto;
    padding: 15px 0px;
    & > i {
        transform: ${ props => props.active ? '' : 'rotate(-90deg)' };
    }
`
export const OptionMenu = styled.div`
    width: 100%;
    display: block;
    width: 100%;
    transform: translateY(${ ({ height }) => height }px);
    overflow: hidden;
    padding: 8px 0;
`
export const Box = styled.div`
`
export const SpanItem = styled.span`
margin: 1px 0;
    &:hover{
        background-color: #f8f9fa; 
    }
`
export const BoxTitleNavBar = styled.div`
    text-align: center;
    width: 100%;
    border-radius: 10px; 
    background: ${ SEGColor };
    padding: 30px 0px;
    justify-content: space-between;
    @media( min-width: 1200px ){
        display: ${ ({ collapsed })=> collapsed ? 'block' : 'flex' };
    }
    @media( max-width: 1200px ){
        display: flex;
        padding: 10px;
        border-radius: 0px; 
    }
`
export const Name = styled.h1`
    color: #FFFFFF;
    font-size: 1.25em;
    align-self: center;
`
export const ContainerBoxUser = styled.button`
    width: 100%;
    position: relative;
    white-space: nowrap;
    height: 53px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    font-family: Poppins;
    background: #2a3042;
    align-self: auto;
    border-radius: 15px;
    margin: 5px;
    border-radius: 10px;
    background-color: ${ BGColor };
    outline: none;
    border: none;
    align-items: center;
    padding: 15px;
    @media( min-width: 1200px ){
        width: ${ ({ collapsed })=> collapsed ? '40%' : '100%' };
    }
    @media( max-width: 1200px ){
        display: none;
    }
`