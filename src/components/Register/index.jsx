import React, { useState } from 'react'
import { BGColor, PColor, PLColor } from '../../assets/colors'
import { IconLogo, IconArrowLeft } from '../../assets/icons/icons'
import { Content } from './styled'
import InputHooks from '../InputHooks/InputHooks'
import { validationSubmitHooks } from '../../utils'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../gql/Register'
import { Card, Form, GoBack, ContentIcon, ButtonSubmit, Text } from './styled'
import { LoadEllipsis } from '../LoadingButton'
import { Alert } from '../LoginAut/styled'
export const RegisterForm = props => {
    const [register, { loading, error: err }] = useMutation(REGISTER)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }

    const { setShowLogin, showLogin } = props
    const onclickLoginForm = () => {
        setShowLogin(!showLogin)
    }
    const handleRegister = async e => {
        e.preventDefault()
        // Declarando variables
        let errorSubmit = false
        for (const x in errors) {
            if (errors[x]) errorSubmit = true
        }
        // Validando todos los campos que no sean nulos
        const errorForm = validationSubmitHooks(e.target.elements)
        for (const x in errorForm) {
            if (errorForm[x]) errorSubmit = true
        }
        setErrors({ ...errorForm })
        if (errorSubmit) {
            return alert('Por favor, verifique que los Campos estén correctos.')
        }
        const { username, name, email, password, ConfirmPassword } = values
        if (ConfirmPassword !== password) {
            alert('Las contraseñas no coinciden')
        }
        try {
            if (!errorSubmit) {
                const results = await register({
                    variables: {
                        input: {
                            username,
                            email,
                            password,
                            name,
                        }
                    }

                })
                setValues({})
                setErrors({} || [])
                // eslint-disable-next-line
                console.log(results)
                setShowLogin(!showLogin)
            }
        } catch (error) {
            setValues({})
            setErrors({})
            alert(error.message)
        }
    }
    return (
        <h1>
            <Content>
                <Card>
                </Card>
                <Card>
                    <Form onSubmit={handleRegister}>
                        <GoBack type='button' onClick={onclickLoginForm}><IconArrowLeft color={`${ PLColor }`} size='10px' /></GoBack>
                        <ContentIcon >
                            <IconLogo color={PColor} size='70px' />
                        </ContentIcon>
                        <Text>¿No tienes cuenta?
                        </Text>
                        {err && <Alert>An error occurred</Alert>}
                        <InputHooks
                            title='Nombre'
                            required
                            type="text"
                            errors={values?.name}
                            value={values?.name}
                            onChange={handleChange}
                            name='name'
                        />
                        <InputHooks
                            title='Usuario'
                            required
                            type="text"
                            errors={values?.username}
                            value={values?.username}
                            onChange={handleChange}
                            name='username'
                        />

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
                        <InputHooks name="ConfirmPassword"
                            value={values?.ConfirmPassword}
                            errors={values?.ConfirmPassword}
                            onChange={handleChange}
                            type="password"
                            pass
                            title="Confirmar contraseña"
                            required
                            range={{ min: 0, max: 180 }}
                            passConfirm={{ validate: true, passValue: values?.password }}
                        />
                        <ButtonSubmit content='center' color='2' type='submit'>{loading ? <LoadEllipsis color={ BGColor } />: 'Registrar'} </ButtonSubmit>
                    </Form>
                </Card>
            </Content>
        </h1>
    )
}