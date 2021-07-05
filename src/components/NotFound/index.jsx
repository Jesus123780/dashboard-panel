import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BColor, BGColor, PColor } from '../../assets/colors'
import PrimaryButton from '../ButtonHooks'
import { IconLogo } from '../../assets/icons/icons'

export const NotFound = () => {
    return (
        <div>
            {ReactDOM.createPortal(<>
                <Container>
                    <Logo to='/'>
                        <IconLogo size='80px' color={PColor} />
                    </Logo>
                    <Content>
                        <Text>¡Algo salió mal! Parece que la página que buscas ya no está disponible
                            Regresar para el inicio</Text>
                        <PrimaryButton radius='5px' BgColor={PColor} ><Enlace to='/'>Regresar a inicio</Enlace></PrimaryButton>
                    </Content>
                    <Content width='70%'>
                        <Text>----------------Animaciones----------------</Text>
                    </Content>
                </Container>
            </>, document.querySelector('#portal')
            )}
        </div>
    )
}
const Container = styled.div`
  position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    height: 100vh;
    width: 100%;
    background-color: ${ BGColor };
    height: 100vh;
    max-width: 100vw !important;
    display: flex;
    padding: 70px;
    margin: auto;
 
`
const Enlace = styled(Link)`
    color: ${ BGColor };

`
const Logo = styled(Enlace)`
    position: absolute;
    left: 75px;
    top: 25px;
`
const Content = styled.div`
    flex-wrap: wrap;
    width: 100%;
    @media only screen and (min-width: 960px){
    width: ${ ({ width })=> width ? width : '30%' } ;
    }
`
const Text = styled.p`
    color: ${ BColor };
    background-color: ${ BGColor };
    font-size: 1.625rem;
    line-height: 35px;
    margin: 30px 0px;

`