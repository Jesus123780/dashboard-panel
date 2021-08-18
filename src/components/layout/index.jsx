import React, { useContext, useEffect } from 'react'
import { AlertBox } from '../AlertBox'
import { Context } from '../../Context'
import { useTheme } from '../hooks/useTheme'
import styled, { ThemeProvider } from 'styled-components'
import { HeaderC as Header } from '../../container/Header'
import { getToken } from '../../utils'
import { useHistory } from 'react-router'
import { Container } from './Styled'
// import { LeftSideBarContext } from './ContextLayout'
import { SideBar } from '../sidebar'
import { Context as contextLayout } from '../../Context'
export const LayoutMain = ({ children, error }) => {
    const [theme, handleTheme, mountedComponent, { keyTheme }] = useTheme()
    // Variables necesarias para El estado del contexto
    const { setAlertBox } = useContext(Context)
    if (!mountedComponent) setAlertBox({ message: '', duration: 5000, color: 'red' })
    const router = useHistory()

    useEffect(() => {
        const token = getToken()
        if (!token) {
            router.push('/')
        }
    }, [])
    const { collapsed } = useContext(contextLayout);
    return (
        <ThemeProvider theme={theme}>
            <AlertBox err={error} />
            <Header keyTheme={keyTheme} handleTheme={handleTheme} />
            <Container collapsed={collapsed}>
                <SideBar />
                <Main>
                    {children}
                </Main>
            </Container>
        </ThemeProvider>
    )
}
const Main = styled.div`
    @media( min-width: 1200px ){
        margin-top: calc(70px + 5px);
    }
    background-color: ${ ({ theme }) => theme.InvColor };
`