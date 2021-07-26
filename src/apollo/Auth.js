import React, { useEffect, useState, Fragment } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { isLoggedVar } from './cache'
import { UPDATE_TOKEN } from './queries'

export default ({ children }) => {
    const [updateToken, { data, called }] = useMutation(UPDATE_TOKEN)
    const [isMount, setIsMount] = useState(false)
    const location = useLocation()

    // Actualiza el auth token del usuario por cada cambio de ventana
    const { data: dataLogged } = useQuery(gql`
        query IsUserLoggedIn {
            isLogged @client
        }`
    )

    // Verifica el token
    useEffect(() => {
        updateToken().catch(() => setIsMount(true))
    }, [updateToken])

    // Respuesta de la verificación del token
    useEffect(() => {
        const res = data?.refreshUserPayrollToken
        if (called && res) {
            setIsMount(true)
            if (res.tokenAuth) {
                localStorage.setItem('tokenAuth', res.tokenAuth)
                isLoggedVar({ state: true, expired: false })
            } else {
                localStorage.clear()
                const res = localStorage.getItem('token')
                console.log(res)
                isLoggedVar({ state: false, expired: true, message: res && 'La sesión ha expirado', code: 403 })
            }
        }
    }, [data, called])

    useEffect(() => {
        const res = dataLogged.isLogged
        if (res.message) {
            isLoggedVar({ ...isLoggedVar(), message: undefined })
            if (res.code >= 500) alert.error(res.message)
            else if (res.code >= 400 && res.code !== 403) alert.warning(res.message)
            else if (res.code >= 300 || res.code === 403) alert.info(res.message)
            else if (res.code >= 200) alert.success(res.message)
        }
    }, [dataLogged.isLogged])

    useEffect(() => {
        updateToken().catch(() => setIsMount(true))
    }, [location.pathname, updateToken])

    return (
        <Fragment>
            {children(dataLogged.isLogged, isMount)}
        </Fragment>
    )
}