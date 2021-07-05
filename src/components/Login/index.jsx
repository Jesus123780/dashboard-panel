import React, { useState } from 'react'
import { BGColor, PColor, PLColor } from '../../assets/colors'
import { IconArrowRight, IconFacebook, IconGoogleFullColor, IconLogo } from '../../assets/icons/icons'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { RegisterForm } from '../Register'
import { LoginAut } from '../LoginAut'
import { Link } from 'react-router-dom'
import { RecoverAccount } from '../../pages/RecoverAccount'
import { Content, ButtonSubmit, Card, Enlace, Form, Text } from './styled'

import useAuth from '../hooks/useAuth'
import { Loading } from '../Loading'
export const Login = props => {
    const [message, setMessage] = useState(false)
    const [messageF, setMessageF] = useState(false)
    const responseFacebook = response => {
        window.localStorage.setItem('response', response?.name)
        if (!response?.name) {
            setMessageF(true)
            setTimeout(() =>{
                setMessageF(false)
            }, 5000)
        }
    }
    const responseGoogle = response => {
        window.localStorage.setItem('responseG', response?.Ft?.Ve)
        window.localStorage.setItem('responseG', response?.Ft?.Ve)
        if (!response?.accessToken) {
            setMessage(true)
            setTimeout(() =>{
                setMessage(false)
            }, 5000)
        }
    }
    const Name = localStorage.getItem('response');
    const NameG = localStorage.getItem('responseG');
    const [showLogin, setShowLogin] = useState(false)
    // const onclickLoginForm = () => {
    //     setShowLogin(!showLogin)
    // }
    const [activeLogin, setActive] = useState(false)

    const handleActiveClick = e => {
        e.stopPropagation()
        setActive(!activeLogin)
    }
    const auth = useAuth()
    // eslint-disable-next-line
    console.log(auth)
    const handleClick = index => {
        setShowLogin(index === showLogin ? false : index)
    }
    return (
        <>
            {props.loading && <Loading />}
            <Content>
                <Enlace to='/'>
                    <IconLogo size='80px' color={PColor} />
                </Enlace>
                <Card>
                </Card>
                {/* Sección de Register */}
                {showLogin === 1 ? <RegisterForm setShowLogin={setShowLogin} showLogin={showLogin} /> : (showLogin === 2) ? <RecoverAccount handleClick={handleClick} showLogin={showLogin} /> : <Card> :
                    <Form>
                        <Text>¿Como quieres Ingresar?</Text>
                        <FacebookLogin
                            appId='227851979030593'
                            fields='name,email,picture'
                            callback={responseFacebook}
                            render={renderProps => (
                                <ButtonSubmit size='14px' height='40px' color='1' onClick={renderProps.onClick} disabled={renderProps.disabled}><IconFacebook color={`${ BGColor }`} size='30px' />Continuar con {Name ? `${ Name }` : 'Facebook'} <IconArrowRight color={`${ BGColor }`} size='25px' /></ButtonSubmit>
                            )}
                        />
                        {messageF && <i style={{ color: `${ PColor }` }}>La ventana se a cerrado</i>}

                        <GoogleLogin
                            clientId='58758655786-t2kpplbk54sus4god1ovdeepd0jrrenk.apps.googleusercontent.com'
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <ButtonSubmit size='14px' colorFont='#717171' height='40px' color='2' onClick={renderProps.onClick} disabled={renderProps.disabled}><IconGoogleFullColor size='30px' />Continuar con {NameG ? `${ NameG }` : 'Google'} <IconArrowRight color={`${ PLColor }`} size='25px' /></ButtonSubmit>
                            )}
                        />
                        {message && <i style={{ color: `${ PColor }` }}>La ventana se a cerrado</i>}
                        {/* Sección de login */}
                        <LoginAut activeLogin={activeLogin} setActive={setActive} props={props} />
                        <ButtonSubmit onClick={handleActiveClick} type='button' hoverColor size='14px' colorFont='#717171' height='40px' color='2'><IconLogo size='37px' color={PColor} />Login <IconArrowRight color={`${ PLColor }`} size='25px' /></ButtonSubmit>
                        <ButtonSubmit onClick={() => handleClick(1)} type='button' size='14px' content='center' colorFont='#717171'>¿No tienes cuenta? Registrate </ButtonSubmit>
                        <Link to='/recover-account'>
                            <Text cursor color='red' size='15px' onClick={() => handleClick(2)} >¡Olvidé mi contraseña!</Text>
                        </Link>
                    </Form>
                </Card>}
            </Content>
        </>
    )
}