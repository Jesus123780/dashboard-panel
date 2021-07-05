import React from 'react'
import styled from 'styled-components';

function ServiceCard({ image, title, paragraph }) {
    return (
        <ServiceCardStyled >
            <div className="container">
                <img src={image} alt="" />
                <h4>{title}</h4>
                <p>{paragraph}</p>
            </div>
        </ServiceCardStyled >
    )
}

const ServiceCardStyled = styled.div`
    background-color:gray;
    border-left: 1px solid ;
    border-top: 8px solid ;
    border-right: 1px solid ;
    border-bottom: 1px solid ;
    transition: all .4s ease-in-out;
    &:hover{
        border-top: 8px solid red;
        transform: translateY(3px);
    }
    .container{
        padding: 1.2rem;
        h4{
            color: #000;
            font-size: 1.6rem;
            padding: 1rem 0;
            position: relative;
            &::after{
                content: "";
                width: 4rem;
                height: 3px;
                position: absolute;;
                left: 0;
                bottom: 0;
                border-radius: 10px;
            }
        }

        p{
            padding: .8rem 0;
            color: #000 !important;
            background-color: transparent !important;
        }
    }
`;

export default ServiceCard;