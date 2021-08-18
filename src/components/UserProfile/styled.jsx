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
  ${ ({ bg }) => bg && css`background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"  height="200px" width="100px"><text  x="5" y="60%" font-size="4rem" font-weight="600" font-family="PFont-Regular" fill="red" opacity="0.1"> ${ bg } </text></svg>');` }
  background-repeat: repeat;
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