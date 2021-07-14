import styled from 'styled-components';
import { BGColor } from '../../../assets/colors';

export const Container = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${ BGColor };
    `
export const Card = styled.div` 
    width: ${ ({ width })=> width ? width : 'auto' };
    background-color: ${ ({ bgColor })=> bgColor ? bgColor : `${ BGColor }` };
`
export const FormProducts = styled.form`
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
}
`