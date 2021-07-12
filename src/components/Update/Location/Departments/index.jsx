import React, { /* useContext, */ useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import InputHooks from '../../../InputHooks/InputHooks'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { LoadEllipsis } from '../../../LoadingButton'
import { RippleButton } from '../../../Ripple'
import { validationSubmitHooks } from '../../../../utils'
import { Context } from '../../../../Context'
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from './queries'
import { GET_COUNTRY } from '../Countries/queries'
import { EditForm } from './EditForm'
import { PColor } from '../../../../assets/colors'
// import { InputFiles } from '../../../InputFiles'
import { IconEdit, IconDost, IconDelete } from '../../../../assets/icons/icons'
import { Container, Form, Card, ContainerTask, OptionsFunction, Button, ListTask } from './styled'

export const Departments = () => {
    const [createDepartments, { loading }] = useMutation(UPDATE_DEPARTMENT)
    const { setAlertBox } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Query para traer a todos los países
    const { data: dataCountries } = useQuery(GET_COUNTRY)
    const { data } = useQuery(GET_DEPARTMENT)
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
        const { d_name, c_id } = values
        try {
            if (!errorSubmit) {
                const results = await createDepartments({
                    variables: {
                        input: {
                            // eslint-disable-next-line
                            c_id, d_name
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
            setAlertBox({ message: `${ error }`, duration: 7000 })
        }
    }
    const [show, setShow] = useState(false)
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
                <NewSelect search disabled={!dataCountries?.countries[0]?.c_id} options={dataCountries?.countries.filter(x => x?.c_name === x?.c_name) || []} id='c_id' name='c_id' value={values?.c_id || ''} optionName='c_name' title='Ingresa el País' onChange={handleChange} margin='10px' />
                <InputHooks
                    title='Ingresa un departamento'
                    required
                    errors={values?.d_name}
                    value={values?.d_name}
                    onChange={handleChange}
                    name='d_name'
                />
                <RippleButton>
                    {!loading ? 'Subir' : <LoadEllipsis color='#fff' /> }
                </RippleButton>
            </Form>
            <Card>
                {data?.departments ? data?.departments.map(index => (
                    <ContainerTask show={show === index} key={index.d_id}>
                        <OptionsFunction show={show === index}>
                            <Button><IconDelete size={30} /></Button>
                            <Button onClick={() => setEdit({ id: index.d_id, value: index.d_name })} ><IconEdit size={30} /></Button>
                            {/* Todo Success */}
                        </OptionsFunction>
                        {/* Tareas */}
                        <ListTask show={show === index}>
                            {/* eslint-disable-next-line */}
                            {index.d_name}
                        </ListTask>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(index === show ? false : index)}><IconDost size={30} color={show === index ? PColor : '#CCC'} /></Button></div>
                    </ContainerTask>
                )) : <i>No hay ningún Departamento en base de datos</i>}
            </Card>
        </Container>
    </>
    )
}

export const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
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