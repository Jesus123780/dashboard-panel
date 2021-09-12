import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Context';
import { Products } from '../../../components/backend/products';
import { DELETE_ONE_PRODUCT } from '../../Update/Products/queries';
import { GET_ALL_PRODUCTS_BACK } from './queries';

export const ProductsC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})

    const { setAlertBox } = useContext(Context)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Estado para las estrellas del producto
    const [rating, setRating] = useState(0);
    const [deleteProducts] = useMutation(DELETE_ONE_PRODUCT)

    // Filtrar product
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const [productsLogis, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCTS_BACK, { fetchPolicy: 'network-only', variables: { search } })
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    useEffect(() => {
        dataProduct?.productsLogis && setData([...dataProduct?.productsLogis])
    }
    , [dataProduct])
    useEffect(() => {
        productsLogis({ variables: { max: showMore } })
    }
    , [showMore])
    /* Filtro de Precios */
    const handleDelete = pId => {
        const value = dataProduct?.productsLogis?.filter(x => (x.pId === pId))
        // const pState = value[0]?.pState

        deleteProducts({
            variables: {
                input: {
                    pId
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        productsLogis(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_PRODUCTS_BACK, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `El producto ${ value[0].pName } ha sido eliminado permanentemente`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
    }
    return (
        <Products
            search={search}
            data={dataProducto}
            handleChange={handleChange}
            errors={errors}
            rating={rating}
            setRating={setRating}
            handleChange={handleChange}
            handleChangeFilter={handleChangeFilter}
            // Datos de filtro
            handleDelete={handleDelete}
            setShowMore={setShowMore}
        />
    )
}