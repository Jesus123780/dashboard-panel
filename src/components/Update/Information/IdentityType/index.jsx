import { useMutation, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { PColor } from '../../../../assets/colors'
import { IconDelete, IconDost, IconEdit } from '../../../../assets/icons/icons'
import { Context } from '../../../../Context'
import { GET_IDENTITY, UPDATE_IDENTITY } from '../../../../gql/IdentityType'
import { validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import { SpinnerColor } from '../../../Loading'
import { RippleButton } from '../../../Ripple'
import { Container, Form, ContainerTask, OptionsFunction, Button, ListTask } from './styled'

export const IdentityType = () => {
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [createTypeIdentity, { loading }] = useMutation(UPDATE_IDENTITY)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }

    // Mutación para subir un país
    const { data } = useQuery(GET_IDENTITY)
    console.log(data)
    const handleRegister = async e => {
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
            setAlertBox({ message: 'Por favor, verifique que los Campos estén correctos', duration: 5000 })
        }
        // eslint-disable-next-line
        const { tiName } = values
        try {
            if (!errorSubmit) {
                const results = await createTypeIdentity({
                    variables: {
                        input: {
                            tiName
                        }
                    }
                })
                setValues({})
                setErrors({} || [])
                if (results) setAlertBox({ message: 'Tipo de identidad subido con éxito', duration: 5000, color: 'success' })
            }
        } catch (error) {
            setValues({})
            setErrors({})
            // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 7000 })
            setAlertBox({ message: 'se ha producido un error interno', duration: 7000, color: 'error' })

        }
    }
    if (loading) return <SpinnerColor />
    const [show, setShow] = useState(false)

    return (<>
        <Container>
            <Form onSubmit={handleRegister}>
                <InputHooks
                    title='Ingresa un tipo de identidad'
                    required
                    errors={values?.tiName}
                    value={values?.tiName}
                    onChange={handleChange}
                    name='tiName'
                />
                <RippleButton>
                    Typo de identidad
                </RippleButton>
            </Form>
            <div>
                {data?.typeIdentities?.map(x => (<div key={x?.tiId}>
                    <ContainerTask show={show === x}>
                        <OptionsFunction show={show === x}>
                            <Button><IconDelete size={30} color={PColor} /></Button>
                            <Button><IconEdit size={30} /></Button>
                        </OptionsFunction>
                        <ListTask show={show === x}>
                            {x.tiName}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(x === show ? false : x)}><IconDost size={30} color={show === x ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>

                </div>))}

            </div>
        </Container>
    </>
    )
}