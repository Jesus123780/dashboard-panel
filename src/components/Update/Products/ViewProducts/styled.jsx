import styled, { css } from 'styled-components';
import { BGColor } from '../../../../assets/colors';

export const Container = styled.div`
    display: flex;
    padding:  40px;
    display: flex;
    flex-direction: row;
    background-color: ${ BGColor };
    border-radius: 4px;
    overflow: hidden;
`
export const Card = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    margin: 10px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.1);
    width: 50%;
`
export const Title = styled.h1`
    padding: 0;
    margin-right: 15px;
    margin-bottom: 8px;
    font-size: 25px !important;
    color: rgba(0,0,0,.8);
    line-height: 1.18;
    padding-right: 10px;
    word-break: break-word;
    hyphens: auto;
    font-family: PFont-Regular;
    margin: 10px 0px;
`
export const Discount = styled.span`
    position: relative;
    width: fit-content;
    font-family: PFont-Light;
    color: rgba(0,0,0,.8);
${ props => !props.discount &&css`
&::after{
    position: absolute;
    display: block;
    top: 48%;
    width: 100%;
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    content: "";
    color: #18171799
    z-index: 999;
}
` }
`
export const Price = styled.h2`
    padding: 0;
    margin-right: 15px;
    margin-bottom: 8px;
    font-size: 25px !important;
    color: rgba(0,0,0,.8);
    line-height: 1.18;
    padding-right: 10px;
    word-break: break-word;
    hyphens: auto;
    font-family: PFont-Regular;
    margin: 10px 0px;
`
export const Info = styled.span`
    color:${ ({ color }) => (color ? color : '#3483fa') };
    font-size:${ ({ size }) => (size ? size : '13px') };
    font-family: PFont-Light;
    margin: 15px 0px
`
export const Button = styled.button`
 background-color: transparent !important;
 width: fit-content;
`