import { useQuery, useMutation, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../components/hooks/useAuth'
import { Messages } from '../../components/Messages'
import { Context } from '../../Context'
import { GET_ALL_USER, GET_USER } from '../../gql/LoginAut'
import { GET_MESSAGES, NEW_MESSAGE, SEND_MESSAGES } from '../../gql/Messages'
import { validationSubmitHooks } from '../../utils'

export const MessagesC = () => {
    //ESTADOS
    const [selectedUser, setSelectedUser] = useState(null)
    const [show, setShow] = useState(false)
    const auth = useAuth()
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const { data, loading, error: er } = useQuery(GET_ALL_USER, {
        variables: { search }
    })
    // Busca un usuario seleccionado
    const { data: OneUser } = useQuery(GET_USER, {
        variables: {
            username: selectedUser
        }
    })
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
        if (selectedUser) {
            getMessages({ variables: { from: selectedUser } })
        }
    }, [selectedUser])
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)
    }, [setShow])

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
                sendMessage({
                    variables: { to: selectedUser, content: values.content }, update(cache) {
                        cache.modify({
                            fields: {
                                getMessages(dataOld = []) {
                                    return cache.writeQuery({ query: GET_MESSAGES, data: dataOld })
                                }
                            }
                        })
                    }
                }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
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
    // subscription's mensajes
    const { data: messageDataNew, error: messageError } = useSubscription(NEW_MESSAGE)
    useEffect(() => {
        if (messageError) console.log(messageError)
        if (messageDataNew) console.log(messageDataNew)
    }, [messageError, messageData])
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
            OneUser={OneUser?.getUser}
            values={values}
            handleSendMessage={handleSendMessage}
            handleChangeFilter={handleChangeFilter}
            handleChange={handleChange}
            show={show}
            setShow={setShow}
        />
    )
}