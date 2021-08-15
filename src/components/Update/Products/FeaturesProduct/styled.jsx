import styled, { css } from 'styled-components'
import React from 'react'

export const ContainerModal = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: opacity 150ms ease-in-out;
${ ({ modal }) => modal
        ? css`  
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    background-color:red;


          `
        : css`
            
        opacity: 0;

          ` }
`
export const AwesomeModal = styled.div`
width: 97%;
border-radius: 10px;
display: grid;
/* grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) ); */
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
grid-gap: 10px;
opacity: 0;
position: absolute;
transition: 500ms ease;
overflow-y: auto;
background-color: ${ ({ theme }) => theme.InvColor };
max-height: 700px;
padding: 50px;
${ ({ modal }) => modal
        ? css`  
        top: -50px;
        bottom: 0;
        transform: translateY(95px);
        border-radius: 4px;
        opacity: 1;
        z-index: 99999909;
          `
        : css`
            
        margin: 0;
        opacity: 0;
        z-index: -99999;
          ` }
&::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
}
`
export const Container = styled.div``
export const ContentList = styled.div`
    position: relative;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    width: 100%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 10px;
    &:hover{
      box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
      border-color: transparent;
    }
    ${ ({ show }) => show
    && css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
        
        
        ` }
        `
export const TextList = styled.h3`
    font-size: 14px !important;
    font-family: PFont-Regular;
    `
export const Card = styled.form`
  height: min-content;
  border: 1px solid #dcdcdc;
  `
export const ContentModal = styled.div`
    transition: opacity 150ms ease-in-out;
    ${ ({ modal }) => modal
        ? css`  
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    z-index: 10000;
    background-color: rgba(0,0,0,0.322);
    `
        : css`
            
            margin: 0;
            opacity: 0;
            z-index: -99999099;
            ` }
            `
export const ContentTooltip = styled.div`

`
export const Options = ({ icon, name }) => {

    return (
        <React.Fragment>
            <div>
                {icon}
            </div>
            <ContentTooltip title={name}>
            </ContentTooltip>
        </React.Fragment>
    )
}