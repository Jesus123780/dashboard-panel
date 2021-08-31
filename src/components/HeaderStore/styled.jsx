import styled from 'styled-components';
import { PColor } from '../../assets/colors';

export const HeaderContent = styled.header`
    flex-direction: column;
    top: 0;
    width: 100%;
    height: 80px;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    z-index: 90997;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    transition: all 0.4s ease;
    @media only screen and (min-width: 960px){
        display: flex;
    }
    background: ${ ({ scrollNav, theme })=>(scrollNav? 'transparent' : theme.InvTColor) };
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    width: 100%;
    max-width: 1366px !important;
    margin: auto;
    padding: 0 30px;
    background-color: ${ ({ scrollNav })=>(scrollNav? 'none' : 'transparent') };
    @media only screen and (min-width: 960px){
        padding: 0 20px 0 30px;
    }
`

export const Text = styled.i`
    font-size: 11px;
    font-family: PFont-Light;
    @media only screen and (min-width: 960px){
    }
`

export const Time = styled.time`
    font-family: PFont-Regular;
    color: ${ PColor };
    text-align: center;
    @media only screen and (min-width: 960px){
    }
`

export const Timer = styled.div`
    width: 300px;
    min-width: 300px;
    position: relative;
    @media only screen and (min-width: 960px){
    }
`
export const AdicionalComponent = styled.div`
position: relative;
    @media only screen and (min-width: 960px){
    }
`
export const UseSize = styled.div`
    position: absolute;
    right: 0;
    bottom: -45px;
    width: 60px;
    max-width: 60px;
    background-color: ${ ({ theme }) => theme.InvColor };
    border-radius: 50%;
    height: 60px;
    align-items: center;
    display: grid;
    box-shadow: 0px 0px 6px 0px #16101026;
    justify-content: center;
    align-content: center;
    @media only screen and (max-width: 960px){
        display: none;
    }
`