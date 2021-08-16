import React, { useContext } from 'react'
import { Aside } from '../header'
import { Container } from './styled'
import { AlertBox } from '../AlertBox'
import { Context } from '../../Context'
import { useTheme } from '../hooks/useTheme'
import styled, { ThemeProvider } from 'styled-components'
import { HeaderTop } from '../HeaderStore'

export const LayoutMain = ({ children, error }) => {
    const [theme, handleTheme, mountedComponent, { keyTheme }] = useTheme()

    const { setAlertBox } = useContext(Context)
    const Theme = localStorage.getItem('theme')
    if (!mountedComponent) setAlertBox({ message: 'sdfasd', duration: 20000, color: 'red' })

    return (
        <>
            { undefined === undefined && <button
                onClick={() => keyTheme === 'light' ? handleTheme('dark') : handleTheme('light')}>
                <div active={Theme === 'dark' ? '30px' : '0px'} />cambiar
            </button>}
            <ThemeProvider theme={theme}>
                <AlertBox err={error} />
                <HeaderTop />
                <Container>
                    <Aside />
                    <Main>
                        {children}
                    </Main>
                </Container>
            </ThemeProvider>

        </>

    )
}
const Main = styled.body`
    overflow-y: auto;
`