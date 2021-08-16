import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { Products } from '../../../components/Update/Products'
import { GET_ONE_COLOR, UPDATE } from './queries';
import { Context } from '../../../Context';
import { GET_ALL_SIZE } from '../../../gql/information/Size/size';
import useLocalStorage from '../../../components/hooks/useLocalSorage';

export const ProductsC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const [name, setName] = useLocalStorage();
    const { data } = useQuery(GET_ONE_COLOR)
    const { setAlertBox } = useContext(Context)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    const { data: size } = useQuery(GET_ALL_SIZE)
    // Subir producto
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const handleChangeSearch = e => {
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
    }
    const [rating, setRating] = useState(0);
    const [updateProducts] = useMutation(UPDATE)
    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const ProStar = rating
        const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_806765-MLC46669921180_072021-O.webp'
        const { Width, Height, Cantidad, Destacado, IstFree } = values
        const ProWidth = parseInt(Width);
        const ProHeight = parseInt(Height);
        const ProQuantity = parseInt(Cantidad);
        const ProOutstanding = parseInt(Destacado);
        const ProDelivery = parseInt(IstFree);
        const {
            ProPrice,
            ProDescuento,
            ProUniDisponibles,
            ProDescription,
            ProProtegido,
            ProAssurance,
            ProLength,
            ProWeight,
            ProVoltaje,
            sizeId,
            colorId,
            // Location
            countryId,
            dId,
            ctId,
        } = values
        const cId = countryId
        const pName = name
        try {
            const results = await updateProducts({
                variables: {
                    input: {
                        pName,
                        ProPrice,
                        ProDescuento,
                        ProUniDisponibles,
                        ProDescription,
                        ProProtegido,
                        ProAssurance,
                        ProStar,
                        ProImage,
                        ProWidth,
                        ProHeight,
                        ProLength,
                        ProWeight,
                        ProQuantity,
                        ProOutstanding,
                        ProDelivery,
                        ProVoltaje,
                        sizeId,
                        colorId,
                        // Location
                        cId,
                        dId,
                        ctId,
                    }
                }

            })
            // eslint-disable-next-line
            setAlertBox({ message: `${results}`, duration: 7000 })
        } catch (error) {
            // eslint-disable-next-line
            setAlertBox({ message: `${error.message}`, duration: 7000 })
        }
    }
    return (
        <Products
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
            color={data?.getAllColor}
            loading={loadCountries || loadRoad}
            countries={dataCountries?.countries || []}
            road={dataRoad?.road || []}
            departments={dataDepartments?.departments || []}
            cities={dataCities?.cities || []}
            valuesForm={values}
            size={size?.getSizes}
            rating={rating}
            setRating={setRating}
            handleChange={handleChange}
            onChangeSearch={handleChangeSearch}
            name={name}
            setName={setName}

        />
    )
}