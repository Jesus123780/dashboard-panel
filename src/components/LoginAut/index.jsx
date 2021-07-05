import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { PColor, PLColor } from '../../assets/colors'
import { IconArrowLeft } from '../../assets/icons/icons'
import { Context } from '../../Context'
import { LOGIN } from '../../gql/LoginAut'
import InputHooks from '../InputHooks/InputHooks'
import { setToken, decodeToken } from '../../utils'
import useAuth from '../hooks/useAuth'
import { ContainerSliderForm, GoBack, Text, Alert } from './styled'
import { LoadEllipsis } from '../LoadingButton'
import { ButtonSubmit } from '../Login/styled'
export const LoginAut = props => {
    // Contexto
    const { setUser } = useAuth()
    const [login, { loading, error }] = useMutation(LOGIN)
    const { activeLogin, setActive } = props
    const [values, setValues] = useState({})
    const { setAlertBox } = useContext(Context)
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onclickLoginForm = () => {
        setActive(!activeLogin)
    }
    const handleRegister = async e => {
        e.preventDefault()
        const { email, password } = values
        try {
            const { data } = await login({
                variables: {
                    input: {
                        email,
                        password,
                    }
                }
            })
            const { token } = data.login
            setToken(token)
            setUser(decodeToken(token))
        } catch (erro) {
            setValues({})
            setAlertBox({
                message: erro.message,
                duration: 10000,
            })
        }
    }
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [loading])
    return (
        <>
            <ContainerSliderForm onSubmit={handleRegister} activeLogin={activeLogin}>
                <GoBack type='button' onClick={onclickLoginForm}><IconArrowLeft color={`${ PLColor }`} size='25px' /></GoBack>
                <Text>Inicia sesión
                </Text>
                <InputHooks name="email"
                    value={values?.email}
                    errors={values?.email}
                    email
                    onChange={handleChange}
                    type="text"
                    title="Correo Electrónico"
                    required
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks name="password"
                    value={values?.password}
                    errors={values?.password}
                    pass
                    onChange={handleChange}
                    title="Contraseña"
                    required
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
                { error && <Alert>An error occurred</Alert>}
                <ButtonSubmit colorFont={PColor} color='2' loading={loading } hoverColor content='center' type='submit'>{loading ? <LoadEllipsis color='#fff' />: 'Login'} </ButtonSubmit>
            </ContainerSliderForm>
        </>
    )
}