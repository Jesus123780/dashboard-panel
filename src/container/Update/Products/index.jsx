import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { Products } from '../../../components/Update/Products'
import { validationSubmitHooks } from '../../../utils';
import { GET_ONE_COLOR, UPDATE } from './queries';

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
    // Subir producto
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const handleChangeSearch = e => {
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
    }
    const [updateProduct] = useMutation(UPDATE)
    // Contexto de las notificaciones
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
        const { password, ConfirmPassword } = values
        if (ConfirmPassword !== password) {
            alert('Las contraseñas no coinciden')
        }
        try {
            if (!errorSubmit) {
                updateProduct({
                    variables: {
                        input: {
                            password,
                            ConfirmPassword,
                        }
                    }
                }).then(res => {
                    if (res) {
                        setValues({})
                    } else console.log({ message: data.signUpUser.message, duration: 30000, color: data.signUpUser.success ? 'success' : 'error' })

                })
                    .catch(() => {
                        console.log({
                            message: 'Se ha producido un error.',
                            duration: 3000, color:'error'
                        })
                    })
                    .finally(() => {
                        console.log(false)
                    })
            }
        } catch (error) {
            // eslint-disable-next-line
            console.log(error)
        }
    }
    return (
        <Products
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
            color={data}
            loading={loadCountries || loadRoad}
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