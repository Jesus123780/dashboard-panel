import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { Products } from '../../../components/Update/Products'
import { GET_ALL_PRODUCTS, GET_ONE_COLOR, UPDATE } from './queries';
import { Context } from '../../../Context';
import { GET_ALL_SIZE } from '../../../gql/information/Size/size';
import useLocalStorage from '../../../components/hooks/useLocalSorage';
import { useGetProducts } from '../../../components/hooks/useGetProducts';
import { GET_ALL_FEATURES_ON_PARENT } from '../../../components/Update/Products/FeaturesProduct/queries';
import { useGetAreas } from '../../../components/hooks/useGetArea';
import { useCategories } from '../../../components/hooks/useCategories';
import { useCounter } from '../../../components/hooks/useState';

export const ProductsC = () => {
    // ------------ ESTADOS ------------
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const [features, setFeatures] = useState({})
    const { state, changeState } = useCounter(localStorage.getItem('grid'))

    const [names, setName] = useLocalStorage();
    // Estado para las estrellas del producto
    const [rating, setRating] = useState(0);
    const { setAlertBox } = useContext(Context)
    // Filtrar product
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    const [search, setSearch] = useState('')
    /* Filtro  */
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality:[] })
    const [filter, setFilter] = useState({ gender: [], desc: [], speciality:[] })
    //-----------QUERIES ------------
    const [updateProducts] = useMutation(UPDATE)
    const [finalData, { loading: getProductLoading }] = useGetProducts()
    // LLama a todas las areas
    const { data: datafatures } = useQuery(GET_ALL_FEATURES_ON_PARENT)
    const { data } = useQuery(GET_ONE_COLOR)
    const { data: size } = useQuery(GET_ALL_SIZE)
    const [finalDataAreas, { loading: loadingAreas }] = useGetAreas()
    // L??gica para registrar productos a una categor??a
    const [finalDataCategories] = useCategories()
    // Get all info Ubicaci??n
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    // Subir producto
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    // llama a los productos y espera una accion
    const [productsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: 'network-only',
        variables:
        {
            search,
            gender: searchFilter?.gender,
            desc: searchFilter?.desc,
            categories: searchFilter?.speciality,
        }
    })
    // ------------ HANDLES ------------
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const handleChangeSearch = e => {
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
    }

    // A??ade mas de una caracter??stica por id
    const handleAddFeature = fId => {
        const value = datafatures?.features?.filter(x => (x.fId === fId))
        setFeatures(value)
        // setFeatures(value[0]?.fId)
        if (value.length) {
            try {
                setAlertBox({ message: `${ `${ value[0]?.typeFeature?.thpName } ${ value[0]?.hpqrQuestion }` }`, color: 'success', duration: 7000 })
            } catch (err) {
                setAlertBox({ message: `${ err }`, color: 'error', duration: 7000 })
            }
        }

    }
    const setLocalStorage = grid => {
        try {
            window.localStorage.setItem('grid', grid)
            changeState()
        }
        catch (err) {
            setAlertBox({ message: `${ err }`, color: 'error', duration: 7000 })
        }
    }

    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const ProStar = rating
        // const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_641421-MCO45347822761_032021-F.webp'
        // const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_799377-MCO46546476746_062021-W.webp'
        const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_621798-MLA45543191295_042021-W.webp'
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
        const pName = names
        const fId = features[0]?.fId
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
                        fId,
                    }
                }, update(cache) {
                    cache.modify({
                        fields: {
                            productsAll(dataOld = []) {
                                return cache.writeQuery({ query: GET_ALL_PRODUCTS, data: dataOld })
                            }
                        }
                    })
                    setAlertBox({ message: `El producto ${ pName } subido con ??xito`, color: 'success', duration: 7000 })
                }
            }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${ error.message }`, duration: 7000 })
        }
    }
    // function calcDesc(pri, des) {
    //     const impDesc = (pri * des)/100;
    //     const intPorcentaje = Math.round(impDesc);
    //     console.log(intPorcentaje)
    // }
    // calcDesc()
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const onClickSearch = () => {
        setSearchFilter({ ...filter })
    }
    const onClickClear = () => {
        setSearchFilter({ })
    }
    const handleChangeClick = e => {
        const { name, value, checked } = e.target
        !checked ? setFilter(s => ({ ...s, [name]: s[name].filter(f => f !== value) })) : setFilter({ ...filter, [name]: [...filter[name], value] })
        setSearchFilter({ ...filter })
    }
    useEffect(() => {
        dataProduct?.productsAll && setData([...dataProduct?.productsAll])
    }, [dataProduct, searchFilter])
    useEffect(() => {
        productsAll({ variables: { max: showMore } })
    }, [searchFilter, showMore])
    /* Fin del filtro */
    // Inicio de filtro de descuento y o precio
    // const [filterPrice, setFilterPrice] = useState(0)
    const onChangeRange = () => {
        // const { value } = e.target
        // setFilterPrice(s => ({ ...s, [name]: s[name].filter(f => f !== value) }))
    }
    // ----------- HANDLE PARA ELIMINAR-----------
    const handleDelete = pId => {
        const value = finalData?.productsAll?.filter(x => (x.pId === pId))
        const pState = value[0]?.pState
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
    const des = values.ProDescuento
    const pri = values.ProPrice
    const impDesc = values.ProPricepDesc = (des * pri)/100;
    const intPorcentaje = Math.round(impDesc);
    // Filtramos los productos con envio gratis
    const freeDelivery = dataProductFree => {
        return dataProductFree.ProDelivery === 1
    }
    const productFree = dataProducto.filter(freeDelivery)
    return (
        <Products
            features={features}
            names={names}
            search={search}
            dataFree={productFree}
            dataCategories={finalDataCategories?.CategoryProductsAll}
            onClickSearch={onClickSearch}
            handleAddFeature={handleAddFeature}
            datafatures={datafatures?.features}
            data={dataProducto}
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
            handleChangeFilter={handleChangeFilter}
            setName={setName}
            // Datos de filtro
            handleDelete={handleDelete}
            setShowMore={setShowMore}
            // Datos del areas
            loadingAreas={loadingAreas}
            finalDataAreas={finalDataAreas?.getAreas}
            //   Filtro de check
            handleChangeClick={handleChangeClick}
            onChangeRange={onChangeRange}
            // Limpiar
            onClickClear={onClickClear}
            state={state}
            changeState={changeState}
            setLocalStorage={setLocalStorage}
            intPorcentaje={intPorcentaje}

        />
    )
}
ProductsC.propTypes = {
    handleChangeClick: PropTypes.func,
    filterState: PropTypes.object,
    handleChange: PropTypes.func
}