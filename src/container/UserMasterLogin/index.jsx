import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { LoginUserMaster } from '../../components/LoginUserMaster'
import { Context } from '../../Context'
import { CREATE_USER_MASTER } from '../../gql/RegisterUserMaster'
// import { getToken/* , setToken */ } from '../../utils/index'
import { validationSubmitHooks } from '../../utils'
// import { useHistory } from 'react-router'

export const LoginUserMasterC = () => {
    const [createUserMaster] = useMutation(CREATE_USER_MASTER)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
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
            return setAlertBox({
                message: 'Por favor, verifique que los Campos estén correctos.',
                duration: 10000,
                color: 'warning'
            })
        }
        const { name, username, email, lastName, password } = values
        try {
            if (!errorSubmit) {
                const results = await createUserMaster({
                    variables: {
                        input: {
                            username,
                            email,
                            password,
                            name,
                            lastName,
                        }
                    }

                })
                // eslint-disable-next-line
                console.log(results)
            }
        } catch (error) {
            setAlertBox({
                message: `${ error }`,
                duration: 10000,
                color: 'error'
            })
        }
    }

    return (
        <LoginUserMaster
            handleRegister={handleRegister}
            handleChange={handleChange}
            values={values}
            errors={errors}
        />
    )
}