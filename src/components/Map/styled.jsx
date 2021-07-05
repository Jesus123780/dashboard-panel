import styled from 'styled-components'

export const Card = styled.div`
    background-color: ${ ({ theme }) => theme.BGAColor };
    width: max-content;
    height: max-content;
    padding: 5px;
    margin: 0;
    flex-direction: column;
    display: flex;
    text-align: left;
    align-items: baseline;
    justify-content: baseline;
`
export const Between = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Span = styled.div`
    font-size: 17px;
    font-family: PFont-Regular;
`
export const Text = styled.span`
    font-size: 13px;
    font-family: PFont-Regular;
    color: ${ ({ theme }) => theme.SFSColor };
`
export const Div = styled.div`
    width: 100%;
`
export const IMG = 'https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-icono-de-avatar-de-doctor-by-vexels.png'