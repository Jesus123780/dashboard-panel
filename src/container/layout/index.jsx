import { useQuery } from '@apollo/client'
import React from 'react'
import { LayoutMain } from '../../components/layout'
import { GET_USER_MASTER } from './queries'

export const LayoutMainC = ({ children, error }) => {
    // const [{ data }] = useLazyQuery(GET_USER_MASTER, { fetchPolicy: 'cache-first' })
    const { data: dataM } = useQuery(GET_USER_MASTER)
    // eslint-disable-next-line
    console.log(dataM)
    return (
        <LayoutMain
            error={error}
            children={children}
        />
    )
}