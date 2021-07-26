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

export const Products = ({ values, handleRegister, handleChange, color, onChangeSearch, countries, cities, departments, valuesForm, errorForm }) => {
    const [state, setState] = useState(false)
    const handleClick = () => {
        setState(!state)
    }
    const [rating, setRating] = useState(0);
    return (<>
        <Container>
            <CardOne state={state}>
                <FormProducts onSubmit={handleRegister}>
                    <InputHook
                        label='Nombre'
                        value={values.PName}
                        name='PName'
                        onChange={handleChange}
                        required
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Precio'
                        value={numberFormat(values?.price)}
                        errors={values?.price}
                        name='price'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Descuento'
                        value={numberFormat(values?.PDesc)}
                        errors={values?.PDesc}
                        name='PDesc'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <Content>
                        <>
                            <Label>Producto Protegido?</Label>
                        </>
                        <ContainerButton>
                            <RippleButton widthButton='40%' label='No' type='button' bgColor={PVColor} />
                            <RippleButton widthButton='40%' label='Si' type='button' bgColor={PVColor} />
                        </ContainerButton>
                    </Content>
                    <Rate rating={rating} onRating={rate => setRating(rate)} size={20} />
                    <NewSelect
                        name='colorId'
                        options={color?.color}
                        id='colorId'
                        onChange={handleChange}
                        error={values?.color?.colorId}
                        optionName='Name'
                        value={values?.colorId}
                        title='Color' required
                    />
                    <InputHook label='Unidades disponibles'
                        value={values?.ProQuantity}
                        errors={values?.ProQuantity}
                        name='ProQuantity'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
                    <InputHook label='Garantía'
                        value={numberFormat(values?.ProQuantity)}
                        errors={values?.ProQuantity}
                        name='ProQuantity'
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
                        <TextareaDescription value={values?.PDescription}
                            errors={values?.PDescription}
                            onChange={handleChange}
                            name='PDescription' >
                        </TextareaDescription>
                    </>
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