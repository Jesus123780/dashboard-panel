import styled, { css } from 'styled-components'

export const Box = styled.div`
    display: block;
    ${ ({ width }) => width && css` width: ${ width }; ` }
    flex-direction: ${ ({ direction }) => (direction ? direction : 'row') };
    position: relative;
    box-sizing: border-box;
`
export const Label = styled.label`
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    cursor: pointer;
`
export const InputFile = styled.input`
    display: none;
`
export const DropZone = styled.div`
    min-height: 150px;
    max-height: 300px;
    overflow: auto;
    cursor: pointer;
    background-color: ${ ({ theme }) => theme.TColor };
    /* border: 2px dashed rgba(0, 0, 0, 0.1); */
    display: grid;
    box-sizing: border-box;
`
export const Preview = styled.div`
    position: relative;
    display: flex;
    vertical-align: top;
    margin: 16px;
    min-height: 100px;
    flex-flow: wrap;
`
export const ImgCont = styled.div`
    border-radius: 4px;
    width: 25%;
    height: 25%;
    min-width: 80px;
    min-height: 80px;
    position: relative;
    z-index: 10;
    margin: 10px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: scale-down;
`
export const FileText = styled.span`
    position: absolute;
    bottom: 0;
    color: #FFF;
    width: 100%;
    background-color: rgba(0,0,0,.7);
    padding: 2px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
export const ButtonDelete = styled.button`
    background-color: #fff;
    border: none;
    outline: none;
    position: absolute;
    right: -2px;
    top: 0px;
    border-radius: 2px;
    padding: 2px 0;
    cursor: pointer;
`
// export const Details = styled.div`
//     z-index: 20;
//     position: absolute;
//     top: 0;
//     left: 0;
//     opacity: 0;
//     font-size: 13px;
//     min-width: 100%;
//     max-width: 100%;
//     padding: 2em 1em;
//     text-align: center;
//     color: rgba(0, 0, 0, 0.9);
//     line-height: 150%;
// `
// export const Progress = styled.div`
//     background: linear-gradient(to bottom, #666, #444);
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     width: 100%;
// `
// export const SpanCont = styled.div`
//     overflow: hidden;
//     text-overflow: ellipsis;
// `
// export const Span = styled.span`
//     background-color: rgba(255, 255, 255, 0.4);
//     padding: 0 0.4em;
//     border-radius: 3px;
// `