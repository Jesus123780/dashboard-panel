import styled from 'styled-components';

export const HeaderContent = styled.header`
    flex-direction: column;
    top: 0;
    width: 100%;
    height: 80px;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    z-index: 9997;
    padding: 0;
    @media only screen and (min-width: 960px){
        display: flex;
    }
    background: ${ ({ scrollNav, theme })=>(scrollNav? 'transparent' : theme.InvTColor) };
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    width: 100%;
    max-width: 1366px !important;
    margin: auto;
    padding: 0 30px;
    background-color: ${ ({ scrollNav })=>(scrollNav? 'none' : 'transparent') };
    @media only screen and (min-width: 960px){
        padding: 0 20px 0 30px;
    }
`

export const Text = styled.i`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    @media only screen and (min-width: 960px){
        padding: 0 20px 0 30px;
    }
`

export const TargetUser = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    border-bottom: 1px solid;
    @media only screen and (min-width: 960px){
        padding: 0 20px 0 30px;
    }
`
export const ContentInput = styled.div`
    @media only screen and (min-width: 1248px){
        max-width: 420px;
    }
    @media only screen and (min-width: 960px) {
    max-width: 320px;
    position: relative;
}
`