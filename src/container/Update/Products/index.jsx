import React, { useContext, useState } from 'react'
import { Products } from '../../../components/Update/Products'
import { Context } from '../../../Context'
import { validationSubmitHooks } from '../../../utils';

export const ProductsC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
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
            setAlertBox('Las contraseñas no coinciden')
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
        <Products
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
        />
    )
}