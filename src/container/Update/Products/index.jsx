import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { Products } from '../../../components/Update/Products'
import { GET_ALL_PRODUCTS, GET_ONE_COLOR, UPDATE } from './queries';
import { Context } from '../../../Context';
import { GET_ALL_SIZE } from '../../../gql/information/Size/size';
import useLocalStorage from '../../../components/hooks/useLocalSorage';
import { useGetProducts } from '../../../components/hooks/useGetProducts';

export const ProductsC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const [name, setName] = useLocalStorage();
    const [finalData, { loading: getProductLoading }] = useGetProducts()

    const { data } = useQuery(GET_ONE_COLOR)
    const { setAlertBox } = useContext(Context)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Get all info Ubicación
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
    // const [deleteProducts] = useMutation(DELETE_ONE_PRODUCT)
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
            updateProducts({
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
                }, update(cache) {
                    cache.modify({
                        fields: {
                            productsAll(dataOld = []) {
                                return cache.writeQuery({ query: GET_ALL_PRODUCTS, data: dataOld })
                            }
                        }
                    })
                    setAlertBox({ message: `El producto ${ pName } subido con éxito`, color: 'success', duration: 7000 })
                }
            }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${ error.message }`, duration: 7000 })
        }
    }
    const handleDelete = pId => {
        const value = finalData?.productsAll?.filter(x => (x.pId === pId))
        const pState = value[0].pState
        updateProducts({
            variables: {
                input: {
                    pId,
                    pState
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        productsAll(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_PRODUCTS, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `El producto ${ value[0].pName } ha sido eliminado`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))

    }
    return (
        <Products
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
            color={data?.getAllColor}
            loading={loadCountries || loadRoad || getProductLoading}
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
            handleDelete={handleDelete}
            getAllProduct={finalData?.productsAll}
        />
    )
}