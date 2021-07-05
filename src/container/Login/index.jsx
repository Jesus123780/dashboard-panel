import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Login } from '../../components/Login'
import { Context } from '../../Context'
import { REGISTER } from '../../gql/Register'
// import { getToken/* , setToken */ } from '../../utils/index'
import { validationSubmitHooks } from '../../utils'
// import { useHistory } from 'react-router'

export const LoginC = props => {
    // const router = useHistory()
    // useEffect(() => {
    //     const token = getToken()
    //     if (!token) {
    //         router.push('/')
    //     }
    // }, [])
    const [register] = useMutation(REGISTER)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
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
        const { username, name, email, password } = values
        try {
            if (!errorSubmit) {
                setLoading(true)
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
            }
        } catch (error) {
            setValues({})
            setErrors({})
            // eslint-disable-next-line
            console.log(error.message)
            setAlertBox({
                message: error.message,
                duration: 10000,
                color: 'warning'
            })
        }
        // router.push('/login')

    }

    return (
        <Login
            handleRegister={handleRegister}
            handleChange={handleChange}
            loading={loading}
            props={props}
        />
    )
}