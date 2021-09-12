import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../components/hooks/useAuth'
import { Messages } from '../../components/Messages'
import { Context } from '../../Context'
import { GET_ALL_USER } from '../../gql/LoginAut'
import { GET_MESSAGES, SEND_MESSAGES } from '../../gql/Messages'
import { validationSubmitHooks } from '../../utils'

export const MessagesC = () => {
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    //ESTADOS
    const { data, loading, error: er } = useQuery(GET_ALL_USER, {
        variables : { search }
    })
    const [selectedUser, setSelectedUser] = useState(null)
    const auth = useAuth()
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const [getMessages, { data: messageData, refetch }] = useLazyQuery(GET_MESSAGES, {
        fetchPolicy: 'network-only',
        onError: err => setAlertBox({
            message: `${ err }`,
            duration: 10000,
            color: 'warning'
        })
    })
    useEffect(() => {
        refetch
    }, [refetch])
    const [sendMessage] = useMutation(SEND_MESSAGES)
    //EFECTOS
    useEffect(() => {
        if (selectedUser){
            getMessages({ variables: { from: selectedUser } })
        }
    }, [selectedUser])
    // HANDLESS
    const handleSendMessage = async e => {
        e.preventDefault()

        // Declarando variables
        let errorSubmit = false
        for (const x in errors) {
            if (errors[x]) errorSubmit = true
        }
        // Validando todos los campos que no sean nulos
        const errorForm = validationSubmitHooks(e.target.elements)
        for (const x in errorForm) {
            if (errorForm[x]) errorSubmit = true
        }
        setErrors({ ...errorForm })
        if (errorSubmit) {
            return setAlertBox({
                message: 'Por favor, verifique que los Campos estén correctos.',
                duration: 10000,
                color: 'warning'
            })
        }
        try {
            if (!errorSubmit) {
                sendMessage({ variables: { to: selectedUser, content: values.content }, update(cache) {
                    cache.modify({
                        fields: {
                            getMessages(dataOld=[]){
                                return cache.writeQuery({ query: GET_MESSAGES, data: dataOld })
                            }
                        }
                    })
                } }).catch(err=> setAlertBox({ message: `${ err }`, duration: 7000 }))
            }
            setValues({})
        } catch (error) {
            setAlertBox({
                message: error.message,
                duration: 10000,
                color: 'warning'
            })
        }

    }
    // Filtro de los usuarios
    return (
        <Messages
            er={er}
            auth={auth}
            search={search}
            messageData={messageData?.getMessages}
            setSelectedUser={setSelectedUser}
            data={data?.getAllUser}
            selectedUser={selectedUser}
            loading={loading}
            values={values}
            handleSendMessage={handleSendMessage}
            handleChangeFilter={handleChangeFilter}
            handleChange={handleChange}
        />
    )
}