import React, { createContext, useEffect, useState } from 'react'
import { object } from 'prop-types'
export const Context = createContext({
    user: undefined,
})
const Provider = ({ children }) => {
    const [error, setError] = useState({})
    // Accion para abrir y cerrar parte lateral
    const [collapsed, setCollapsed] = useState(false);
    // Accion para abrir y cerrar el modal de productos
    const [modal, setShowModal] = useState(false)
    // Efecto para el Toast
    useEffect(() => {
        !!error?.message &&
            setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const value = {
        error,
        setAlertBox: err => setError(err),
        setModal: err => setShowModal(err === modal ? false : err),
        collapsed, setCollapsed,
        modal

    }
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
    Provider,
    Consumer: Context.Consumer
}
Provider.propTypes = {
    children: object.isRequired
}