import React, { useContext, useState } from 'react'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import { validationSubmitHooks } from '../../../../utils'
import { Context } from '../../../../Context'

export const Task = () => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Contexto de las notificaciones
    const { setAlertBox } = useContext(Context)

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
            return setAlertBox({ message: 'Revisa que los campos estén correctos', duration: 5000, color: 'red' })
        }
        const { password, ConfirmPassword } = values
        if (ConfirmPassword !== password) {
            alert('Las contraseñas no coinciden')
        }
        // try {
        //     if (!errorSubmit) {
        //         const results = await register({
        //             variables: {
        //                 input: {
        //                     username,
        //                     email,
        //                     password,
        //                     name,
        //                 }
        //             }

        //         })
        //         setValues({})
        //         setErrors({} || [])
        //         // eslint-disable-next-line
        //         console.log(results)
        //         setShowLogin(!showLogin)
        //     }
        // } catch (error) {
        //     setValues({})
        //     setErrors({})
        //     alert(error.message)
        // }
    }
    return (
        <>
            <form onSubmit={handleRegister}>
                Password
                <InputHooks name="actualPassword"
                    value={values?.actualPassword}
                    errors={values?.actualPassword}
                    onChange={handleChange}
                    title="Contraseña"
                    required
                    autoComplete='none'
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks name="NewPassword"
                    value={values?.NewPassword}
                    errors={values?.NewPassword}
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
                    passConfirm={{ validate: true, passValue: values?.NewPassword }}
                />
                <RippleButton label='Actualizar' />
            </form>
        </>
    )
}