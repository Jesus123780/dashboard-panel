import React, { useState } from 'react'
import { RecoverAccount } from '../../components/RecoverAccount'

export const RecoverAccountC = ({ handleClick, showLogin }) => {
    const [values, setValues] = useState({})
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <RecoverAccount
            handleChange={handleChange}
            values={values}
            showLogin={showLogin}
            handleClick={handleClick}
        />
    )
}