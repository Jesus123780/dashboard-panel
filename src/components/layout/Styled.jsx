import styled from 'styled-components'

export const Container = styled.div`
    background-color: #f3f6fd;
    display: flex;
    transition: 4s ease;
    /* width: ${ ({ collapsed })=> !collapsed ? '100%' : '0%' }; */
    @media( max-width: 1200px ){
        display: flex;
        padding: 0px;
        flex-direction: column;
    } 
& > div:nth-child(2) {
    flex: 700%;
}
`