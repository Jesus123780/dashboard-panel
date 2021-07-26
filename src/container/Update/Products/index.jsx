import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { Products } from '../../../components/Update/Products'
import { Context } from '../../../Context'
import { validationSubmitHooks } from '../../../utils';
import { GET_ONE_COLOR } from './queries';

export const ProductsC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const { data } = useQuery(GET_ONE_COLOR)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const handleChangeSearch = e => {
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
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
            color={data}
            loading={loadCountries || loadRoad }
            countries={dataCountries?.countries || []}
            road={dataRoad?.road || []}
            departments={dataDepartments?.departments || []}
            cities={dataCities?.cities || []}
            valuesForm={values}
            errorForm={errors}
            handleChange={handleChange}
            onChangeSearch={handleChangeSearch}
        />
    )
}