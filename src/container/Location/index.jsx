import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { useFormTools } from '../../components/BaseForm'
import { LocationExample } from '../../components/LocationExample'
import { GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_CITIES } from './Querys'
export const LocationExampleC = () => {
    // Herramientas de formulario
    const [handleChange, validationSubmit, setForcedData, { dataForm, errorForm, errorSubmit, calledSubmit }] = useFormTools()
    console.log(errorSubmit, validationSubmit, calledSubmit)
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const handleChangeSearch = e => {
        if (e.target.name === 'tiId') return setForcedData({ ...dataForm, [e.target.name]: e.target.value, tpName: '', tpLasNam: '' })
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
    }

    return (
        <LocationExample
            loading={loadCountries}
            countries={dataCountries?.countries || []}
            departments={dataDepartments?.departments || []}
            cities={dataCities?.cities || []}
            valuesForm={dataForm}
            errorForm={errorForm}
            setForcedData={setForcedData}
            handleChange={handleChange}
            onChangeSearch={handleChangeSearch}
        />
    )
}

LocationExampleC.propTypes = {
}