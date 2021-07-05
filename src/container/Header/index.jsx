import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components/HeaderStore'
import useAuth from '../../components/hooks/useAuth'
import { SEARCH_USER } from './queries'
export const HeaderC = props => {
    // Función cambiar el modo nocturno
    const { keyTheme, handleTheme } = props
    // Función para buscar Usuario
    const [search, setSearch] = useState(null)
    const [results, setResults] = useState([])
    const onchange = e => {
        if (e.target.value) setSearch(e.target.value)
        else setSearch(null)
    }
    const { data, loading, error } = useQuery(SEARCH_USER, {
        variables: { search }
    })
    // Validación de inicio de sesión activa
    const auth = useAuth()
    useEffect(() => {
        if (data?.search) {
            const User = []
            data?.search?.forEach((user, index) => {
                User.push({
                    key: index,
                    title: user?.name,
                    username: user?.username,
                    avatar: user?.avatar,
                });
            });
            setResults(User)
        } else {
            setResults([])
        }
    }, [data])
    return (
        <Header
            keyTheme={keyTheme}
            handleTheme={handleTheme}
            onchange={onchange}
            data={data}
            loading={loading}
            results={results}
            error={error}
            search={search}
            auth={auth}
        />
    )
}