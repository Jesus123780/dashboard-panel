import React, { useContext, useState } from 'react'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import { validationSubmitHooks } from '../../../../utils'
import { Context } from '../../../../Context'
import { CHANGE_PASS_USER } from './queries'
import { useMutation } from '@apollo/client'

export const Password = () => {
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [UpdateUser, { loading }] = useMutation(CHANGE_PASS_USER)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const handleChangePass = async e => {
        e.preventDefault()
        const { currentPassword, newPassword, uNewPassConfirm } = values
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
        if (errorSubmit || uNewPassConfirm !== newPassword) {
            return setAlertBox({
                message: 'Por favor, verifique que los Campos estén correctos.',
                duration: 10000,
                color: '#ffffff'
            })
        }
        try {
            if (!errorSubmit) {
                const response = await UpdateUser({
                    variables: {
                        input: {
                            currentPassword,
                            newPassword
                        }
                    }
                })
                setAlertBox({ message:  response?.data?.UpdateUser, duration: 3000 })
            }
        } catch (error) {
            setAlertBox({ message:  'A ocurrido un error interno', duration: 3000 })
        }
    }
    return (
        <>
            <form onSubmit={handleChangePass}>
                Password
                <InputHooks name="currentPassword"
                    value={values?.currentPassword}
                    errors={values?.currentPassword}
                    onChange={handleChange}
                    title="Contraseña"
                    required
                    autoComplete='none'
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks name="newPassword"
                    value={values?.newPassword}
                    errors={values?.newPassword}
                    pass
                    onChange={handleChange}
                    title="Contraseña"
                    required
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks name="uNewPassConfirm"
                    value={values?.uNewPassConfirm}
                    errors={values?.uNewPassConfirm}
                    onChange={handleChange}
                    type="password"
                    pass
                    title="Confirmar contraseña"
                    required
                    range={{ min: 0, max: 180 }}
                    passConfirm={{ validate: true, passValue: values?.newPassword }}
                />
                {loading && <span>Cargando</span>}
                <RippleButton label='Actualizar' />
            </form>
        </>
    )
}