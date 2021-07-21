import React from 'react'
import { BGColor } from '../../assets/colors'
import { Content } from './styled'
import InputHooks from '../InputHooks/InputHooks'
import { Card, Form, ButtonSubmit, Text } from './styled'
import { LoadEllipsis } from '../LoadingButton'
import NewSelect from '../NewSelectHooks/NewSelect'
export const LocationExample = ({ handleChange, onChangeSearch, countries, cities, departments, valuesForm, errorForm, validationSubmit, loading }) => {
    return (
        <h1>
            <Content>
                <Card>
                </Card>
                <Card>
                    <Form onSubmit={validationSubmit}>
                        <Text>¿No tienes cuenta?
                        </Text>
                        <NewSelect search name='countryId' options={countries} id='cId' onChange={onChangeSearch} error={errorForm?.countryId} optionName='cName' value={valuesForm?.countryId} title='País' required />
                        <NewSelect search name='dId' options={departments} id='dId' onChange={onChangeSearch} error={errorForm?.dId} optionName='dName' value={valuesForm?.dId} title='Departamento' required />
                        <NewSelect search name='cId' options={cities} id='cId' onChange={handleChange} error={errorForm?.cId} optionName='cName' value={valuesForm?.cId} title='Ciudad' required />
                        <InputHooks name='tpDir' value={valuesForm?.tpDir} error={errorForm?.tpDir} onChange={handleChange} type='text' title='Dirección' required range={{ min: 0, max: 180 }} />
                        <ButtonSubmit content='center' color='2' type='submit'>{loading ? <LoadEllipsis color={BGColor} /> : 'Registrar'} </ButtonSubmit>
                    </Form>
                </Card>
            </Content>
        </h1>
    )
}