import styled from 'styled-components';
import { BGColor } from '../../../assets/colors';

export const Content = styled.div`
    border-radius:10px;
    background-color: ${ BGColor };
    z-index: 9999;
    overflow-y: auto;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    @media (min-width: 768px) {
        position: absolute;
        width: 100%;
        top: 0;
        padding: 25px 10px 10px;
        margin: auto;
        height: 100%;
        background-color: ${ BGColor };
        left: 0;
        transform: ${ props => props.activeLogin ? 'translateX(0px)' : 'translateX(900px)' };
        transition: all 0.6s ease;
    }
`