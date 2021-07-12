import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import { Context } from '../../../../Context'
import InputHooks from '../../../InputHooks/InputHooks'
import { LoadEllipsis } from '../../../LoadingButton'
import { RippleButton } from '../../../Ripple'
import { PColor, SFColor, SFVColor } from '../../../../assets/colors'
import { IconEdit, IconDost, IconDelete } from '../../../../assets/icons/icons'
import { GET_COUNTRY, UPDATE_COUNTRIES } from './queries'
import { validationSubmitHooks } from '../../../../utils'
import { icons } from './codeCountries'
import { EditForm } from './EditForm'
import { Container, Form, Card, ContainerTask, OptionsFunction, Button, ListTask } from './styled'

export const Countries = () => {
    const [createCountries, { loading }] = useMutation(UPDATE_COUNTRIES)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Query para traer a todos los países
    const { data } = useQuery(GET_COUNTRY)
    // Mutación para subir un país
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
        const { c_name, c_calCod } = values
        try {
            if (!errorSubmit) {
                const results = await createCountries({
                    variables: {
                        input: {
                            // eslint-disable-next-line
                            c_name, c_calCod
                        }
                    }
                })
                setValues({})
                setErrors({} || [])
                if (results) setAlertBox({ message: 'País subido con éxito', duration: 5000 })
            }
        } catch (error) {
            setValues({})
            setErrors({})
            // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 7000 })
            setAlertBox({ message: 'se ha producido un error interno', duration: 7000 })

        }
    }
    const [show, setShow] = useState(false)
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)

    }, [setShow])
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });
    const submitUpdate = () => {
        setEdit({
            id: null,
            value: ''
        });
    };
    if (edit.id) {
        return <EditForm edit={edit} onSubmit={submitUpdate} />;
    }
    return (<>
        <Container>
            <Form onSubmit={handleRegister}>
                <InputHooks
                    title='Ingresa un país'
                    required
                    errors={values?.c_name}
                    value={values?.c_name}
                    onChange={handleChange}
                    name='c_name'
                />
                <InputHooks
                    title='Ingresa código del país'
                    required
                    errors={values?.c_calCod}
                    value={values?.c_calCod}
                    onChange={handleChange}
                    name='c_calCod'
                />
                <RippleButton>
                    {!loading ? 'Subir' : <LoadEllipsis color='#fff' />}
                </RippleButton>
            </Form>
            <Card>
                {data?.countries ? data?.countries.map(index => (
                    <ContainerTask show={show === index} key={index.c_id}>
                        <OptionsFunction show={show === index}>
                            <Button><IconDelete size={30} /></Button>
                            <Button onClick={() => setEdit({ id: index.c_id, value: index.c_name })} ><IconEdit size={30} /></Button>
                            {/* Todo Success */}
                        </OptionsFunction>
                        {/* Tareas */}
                        <ListTask show={show === index}>
                            {/* eslint-disable-next-line */}
                            <Options icon={icons.find(j => j.c_calCod == index.c_calCod)?.icon} name={icons.find(j => j.c_calCod == index.c_calCod)?.c_calCod}></Options>
                            {index.c_name}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(index === show ? false : index)}><IconDost size={30} color={show === index ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>
                )) : <i>No hay ningún país en base de datos</i>}
            </Card>
        </Container>
    </>
    )
}

// const Table = styled.table`
// position: relative;
// width: 100%;
// tbody tr:nth-child(2n) .andes-table:first-child,
// tbody tr:nth-child(2n) .andes-table:first-child,
// tbody tr:nth-child(odd),
// tbody tr:nth-child(odd):hover {
//     padding: 13px;
//     background: #f5f5f5;
//     text-align: center;
// }

// tbody tr:nth-child(odd) .andes-table:first-child,
// tbody tr:nth-child(odd) .andes-table:first-child {
//     background: #ebebeb;
//     padding: 13px;
//     text-align: center;
//     width: 25%;
// }
// tbody tr {
//     font-family: PFont-Regular;
//     text-align: center;
// }
// `
const Options = ({ icon, name }) => {

    return (
        <React.Fragment>
            <div>
                {icon}
            </div>
            <div>
                <Text>
                    {name ? ` + ${ name }` : 'COD'}
                </Text>
            </div>
        </React.Fragment>
    )
}
export const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value }) => value ? SFColor : SFVColor };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`
export const Text = styled.span`
    font-size: 16px !important;
    font-family: PFont-Light;
`

export const TextArea = styled.textarea`
    width: 100%;
    height: ${ ({ height }) => height ? height : '0' };
    font-size: 15px;
    padding: 15px;
    outline: none;
    max-width: 98.5%;
    min-width: 99%;
    min-height: 200px;
    border: 1px solid #cccccc42;
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 15px;
    }
    & ~ ${ LabelInput } {
        top: ${ ({ value }) => value ? '-17px' : '10px' };
        font-size: 13px;
    }
`
export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`