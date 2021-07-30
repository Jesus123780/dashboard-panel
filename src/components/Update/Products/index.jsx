import { useState } from 'react';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { IconArrowRight } from '../../../assets/icons/icons';
import { Container, FormProducts, Card, Button, CardOne, TextareaDescription, Label, ContainerButton, Content } from './styled';
import { numberFormat } from '../../../utils';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { Rate } from '../../Rate';
import { PVColor } from '../../../assets/colors';
import { RippleButton } from '../../Ripple';
import moment from 'moment';

export const Products = ({ values, handleRegister, handleChange, onChangeSearch, countries, cities, departments, valuesForm, errorForm }) => {
    const [state, setState] = useState(false)
    const handleClick = () => {
        setState(!state)
    }
    const [rating, setRating] = useState(0);
    return (<>
        <Container>
            <CardOne state={state}>
                <FormProducts onSubmit={handleRegister}>
                    <InputHook label='Nombre'
                        value={values.ProName}
                        name='ProName'
                        onChange={handleChange}
                        required
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Precio'
                        value={numberFormat(values?.ProPrice)}
                        errors={values?.ProPrice}
                        name='ProPrice'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Descuento'
                        value={numberFormat(values?.ProDescuento)}
                        errors={values?.ProDescuento}
                        name='ProDescuento'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <InputHook paddingInput='' name='drBirth' type='date' error={errorForm?.drBirth} value={moment(values?.drBirth).format('YYYY-MM-DD')} onChange={handleChange} required range={{ min: 0, max: 20 }} />
                    <Content>
                        <>
                            <Label>Producto Protegido?</Label>
                        </>
                        <ContainerButton>
                            <RippleButton widthButton='40%' label='No' type='button' bgColor={PVColor} />
                            <RippleButton widthButton='40%' label='Si' type='button' bgColor={PVColor} />
                        </ContainerButton>
                    </Content>
                    <Rate rating={rating} onRating={rate => setRating(rate)} size={20} values={values.rating} />
                    <InputHook label='Unidades disponibles'
                        value={values?.ProQuantity}
                        errors={values?.ProQuantity}
                        name='ProQuantity'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Garantía'
                        value={numberFormat(values?.ProAssurance)}
                        errors={values?.ProAssurance}
                        name='ProAssurance'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <NewSelect
                        name='countryId'
                        options={countries}
                        id='cId'
                        onChange={onChangeSearch}
                        error={errorForm?.countryId}
                        optionName='cName'
                        value={valuesForm?.countryId}
                        title='País'
                        required />
                    <NewSelect
                        name='dId'
                        options={departments}
                        id='dId'
                        onChange={onChangeSearch}
                        error={errorForm?.dId}
                        optionName='dName'
                        value={valuesForm?.dId}
                        title='Departamento'
                        required />
                    <NewSelect
                        name='ctId'
                        options={cities}
                        id='ctId'
                        onChange={handleChange}
                        error={errorForm?.ctId}
                        optionName='cName'
                        value={valuesForm?.ctId}
                        title='Ciudad'
                        required />
                    <InputHook label='Ancho'
                        value={values?.ProWidth}
                        errors={values?.ProWidth}
                        name='ProWidth'
                        range={{ min: 0, max: 50 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Alto'
                        value={values?.ProHeight}
                        errors={values?.ProHeight}
                        name='ProHeight'
                        range={{ min: 0, max: 50 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Largo'
                        value={values?.ProLength}
                        errors={values?.ProLength}
                        name='ProLength'
                        range={{ min: 0, max: 50 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Peso'
                        value={values?.ProWeight}
                        errors={values?.ProWeight}
                        name='ProWeight'
                        range={{ min: 0, max: 50 }}
                        onChange={handleChange}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Label>Producto destacado?</Label>
                        <input value={values?.ProOutstanding} name='ProOutstanding' type='checkbox' onChange={handleChange} />
                    </div>
                    <>
                        <Label>Description:</Label>
                        <TextareaDescription value={values?.ProDescription}
                            errors={values?.ProDescription}
                            onChange={handleChange}
                            name='ProDescription' >
                        </TextareaDescription>
                    </>
                    <button type='submit'>Subir</button>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={state} bgColor='#ededed'>
                <ViewProducts
                    valuesP={values.PName}
                    valuesP={values.PName}
                    Country={countries}
                    price={values?.price}
                    desc={values?.PDesc}
                    PCant={values?.ProQuantity}
                    PDescription={values?.PDescription}
                    start={rating}
                    setRating={setRating} />
            </Card>
        </Container>
    </>
    )
}