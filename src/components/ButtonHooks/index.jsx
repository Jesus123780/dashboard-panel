import React from 'react'
import styled, { css } from 'styled-components';
import { PColor } from '../../assets/colors';

function PrimaryButton({ title, children, BgColor, radius, lineColor }) {
    return (
        <PrimaryButtonStyled radius={radius} BgColor={BgColor} lineColor={lineColor}>
            {title}
            {children}
        </PrimaryButtonStyled>
    )
}

const PrimaryButtonStyled = styled.a`
    background-color: ${ ({ theme, BgColor })=> BgColor ? BgColor: theme.InvColor };
    border-radius: ${ ({ radius })=> radius && radius };
    padding: .8rem 2.5rem;
    color: #000;
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    text-transform: uppercase;
    position: relative;
    transition: all .4s ease-in-out;
    &::after{
        content: "";
        position: absolute;
        width: 0;
        height: .2rem;
        transition: all .4s ease-in-out;
        left: 0;
        bottom: 0;
        opacity: .7;
    }
    ${ props => props.lineColor && css`&:hover::after{
        width: 100%;
        background-color: ${ ({ lineColor })=> lineColor ? lineColor: PColor };

    }` }
    
`;
export default PrimaryButton;