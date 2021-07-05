import styled from 'styled-components';
import { BColor } from '../../assets/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

`
export const Content = styled.div`
    position: relative;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(5, -webkit-min-content);
    grid-template-columns: repeat(5, min-content);
    justify-content: center;
`
export const Input = styled.input`
    padding: 20px;
    width: 60px;
    height: 50px;
    text-align: center;
    color: ${ BColor };
`
export const Text = styled.h2`
@media only screen and (min-width: 960px){
    margin: 0 0 42px;
    text-align: center;
    font-size: 15px;
}
    font-weight: initial;
    font-family: PFont-Regular;
    color: ${ ({ color }) => color ? color : '#717171' };
    margin: 0 0 22px;
    cursor: pointer;
`