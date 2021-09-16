import React from 'react'
import { useLocation } from 'react-router'
import { LoginC } from '../../container/Login'
import { LoginUserMasterC } from '../../container/UserMasterLogin'

export const JoinV = props => {
    const router = useLocation()
    if (router.pathname === '/admin') return <LoginUserMasterC {...props} />
    return (
        <LoginC {...props} />
    )

}