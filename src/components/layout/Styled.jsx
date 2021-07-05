import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #f3f6fd;
    display: grid;
    -webkit-transition: 4s ease;
    transition: 4s ease;
    gap: 10px;
    grid-template-columns: 0.3fr 2fr;
    /* grid-template-columns: ${ ({ collapsed })=> collapsed ? '1fr' : '0.4fr 2fr' }; */
    @media( max-width: 1200px ){
        display: flex;
        padding: 0px;
        flex-direction: column;
    } 
`