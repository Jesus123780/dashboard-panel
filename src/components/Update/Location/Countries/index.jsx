import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import InputHooks from '../../../InputHooks/InputHooks'
import { LoadEllipsis } from '../../../LoadingButton'
import { Skeleton } from '../../../Skeleton'
import { RippleButton } from '../../../Ripple'
import { SFColor, SFVColor } from '../../../../assets/colors'
import { GET_COUNTRY, UPDATE_COUNTRIES } from './queries'
import { validationSubmitHooks } from '../../../../utils'
import { Container, Form, Card } from './styled'
import { icons } from './codeCountries'
import { Context } from '../../../../Context'

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
    const { data, loading: loadingc } = useQuery(GET_COUNTRY)
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
            setAlertBox({ message: `${ error }`, duration: 7000 })
            setAlertBox({ message: 'se ha producido un error interno', duration: 7000 })

        }
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
                    {!loading ? 'Subir' : <LoadEllipsis color='#fff' /> }
                </RippleButton>
            </Form>

            {!loadingc ? <Card>
                <Table >
                    <tbody loadingc={loadingc ? loadingc : undefined }>
                        {data?.countries.length ? data?.countries.map(x => <tr key={x.c_id}>
                            {/* eslint-disable-next-line */}
                            <th className="andes-table"> <Options icon={icons.find(j => j.c_calCod == x.c_calCod)?.icon} name={icons.find(j => j.c_calCod == x.c_calCod)?.c_calCod}></Options></th>
                            <td><span>{x.c_name}</span></td>
                        </tr>
                        ) : <i>No hay ningún país en base de datos</i> }
                    </tbody>
                </Table>
            </Card> : <Skeleton />}
        </Container>
    </>
    )
}

const Table = styled.table`
position: relative;
width: 100%;
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(odd),
tbody tr:nth-child(odd):hover {
    padding: 13px;
    background: #f5f5f5;
    text-align: center;
}

tbody tr:nth-child(odd) .andes-table:first-child,
tbody tr:nth-child(odd) .andes-table:first-child {
    background: #ebebeb;
    padding: 13px;
    text-align: center;
    width: 25%;
}
tbody tr {
    font-family: PFont-Regular;
    text-align: center;
}
`
const Options = ({ children, icon, name }) => {

    return (
        <>
            <div>
                {icon}
            </div>
            <div>
                {name ? + `${ name }` : 'COD'}
            </div>
            <div>
                {children}
            </div>
        </>
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