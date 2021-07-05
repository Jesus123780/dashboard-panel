import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`
export const Form = styled.form`
    position: sticky;
    top: 20px;
    width: 50%;
    display: flex;
    display: st;
    height: fit-content;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 5px;
    & > button {
        width: 50%;
        margin: auto;
    }
`
export const Card = styled.div`
    width: 50%; 
    display: flex;
    height: fit-content;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 5px;
    & > button {
        width: 50%;
        margin: auto;
    }
`