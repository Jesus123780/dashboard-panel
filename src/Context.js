import React, { createContext, useEffect, useState } from 'react'
import { object } from 'prop-types'
export const Context = createContext({
    user: undefined,
})
const Provider = ({ children }) => {
    const [error, setError] = useState({})
    const [collapsed, setCollapsed] = useState(false);
    // Efecto para el Toast
    useEffect(() => {
        !!error?.message &&
            setTimeout(() => setError(''), error.duration || 7000)
    }, [error])
    const value = {
        error,
        setAlertBox: err => setError(err),
        collapsed, setCollapsed
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