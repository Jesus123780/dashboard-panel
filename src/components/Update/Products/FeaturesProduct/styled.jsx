import styled, { css } from 'styled-components'
// import { BGColor } from '../../../../assets/colors'

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
top: 50%;
position: absolute;
transition: 500ms ease;
overflow-y: auto;
background-color: ${ ({ theme })=> theme.InvColor };

padding: 50px;
${ ({ modal }) => modal
        ? css`  
        top: 80px;
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
    margin: 2px 0px;
    border: 1px solid #f2f2f2;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    display: flex;
`
export const TextList = styled.h3`
    font-size: 14px !important;
    font-family: PFont-Regular;
`
export const Card = styled.form`
  display: grid;
  height: min-content;
  /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
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