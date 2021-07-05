import styled, { css } from 'styled-components';

export const Text = styled.div`
  font-family: PFont-Regular;
    @media only screen and (min-width: 960px){
    }
    ${ props => props.bottom && css`
        padding: 10px ;
        border-bottom: 1px solid #00000012;
        text-align: center;
        cursor: pointer;
        color: ${ ({ color, theme }) => color === '1' ? theme.EColor : color === '2' ? theme.BVColor : '' }
    ` }
  
`
export const Container = styled.div`
  font-family: PFont-Regular;
  height: 100vh;
  padding: 30px;
  width: 100%;
  color: ${ ({ theme })=> theme.PColor };
    @media only screen and (min-width: 960px){
    }
`
export const Circular = styled.div`
  height: 100px;
  padding: 30px;
  width: 100px;
  border-radius: 50%;
  background-color: ${ ({ theme })=> theme.PColor };
  color: ${ ({ theme })=> theme.PColor };
    @media only screen and (min-width: 960px){
    }
  
`
export const ContentOptions = styled.div`
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    background-color: ${ ({ theme })=> theme.InvTColor };
    color: ${ ({ theme })=> theme.PColor };
        @media only screen and (min-width: 960px){
        } 
`