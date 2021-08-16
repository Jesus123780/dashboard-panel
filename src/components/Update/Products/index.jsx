import { useContext, useState } from 'react';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { IconArrowRight } from '../../../assets/icons/icons';
import { Container, FormProducts, Card, Button, CardOne, TextareaDescription, Label } from './styled';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { PVColor } from '../../../assets/colors';
import { RippleButton } from '../../Ripple';
import { Context } from '../../../Context';
import { FeaturesProducts } from './FeaturesProduct';
// import { Rate } from '../../Rate';
// import { PVColor } from '../../../assets/colors';
// import { RippleButton } from '../../Ripple';
// import moment from 'moment';

export const Products = ({ values, handleRegister, handleChange, countries, setRating, rating, color, size, onChangeSearch, departments, cities, setName, name }) => {
    const [state, setState] = useState(false)
    const handleClick = () => {
        setState(!state)
    }
    const { modal, setModal } = useContext(Context);
    const handleClickModal = () => {
        setModal(!modal)
    }
    return (<>
        <Container>
            <CardOne state={state}>
                <FormProducts onSubmit={handleRegister}>
                    <InputHook label='Nombre del producto'
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        name='pName'
                        required
                        onChange={e => setName(e.target.value)}
                        range={{ min: 0, max: 180 }}
                    />
                    <InputHook label='ProPrice'
                        value={numberFormat(values.ProPrice)}
                        name='ProPrice'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Descuento'
                        value={values.ProDescuento}
                        name='ProDescuento'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Unidades Disponibles'
                        value={values.ProUniDisponibles}
                        name='ProUniDisponibles'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Producto Protegido'
                        value={values.ProProtegido}
                        name='ProProtegido'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Garantia'
                        value={values.ProAssurance}
                        name='ProAssurance'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <>
                        <Rate rating={rating} onRating={rate => setRating(rate)} size={20} value={values.rating} />
                        <img />
                        <InputHook label='Ancho'
                            value={values.Width}
                            name='Width'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Alto'
                            value={values.Height}
                            name='Height'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Largo'
                            value={values.ProLength}
                            name='ProLength'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Peso'
                            value={values.ProWeight}
                            name='ProWeight'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Cantidad # Disponible'
                            value={values.Cantidad}
                            name='Cantidad'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Destacado'
                            value={values.Destacado}
                            name='Destacado'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Envio gratis?'
                            value={values.IstFree}
                            name='IstFree'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Voltaje'
                            value={values.ProVoltaje}
                            name='ProVoltaje'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <NewSelect
                            name='colorId'
                            options={color}
                            id='colorId'
                            onChange={handleChange}
                            optionName='colorName'
                            value={values?.colorId}
                            title='Color'
                        />
                        <NewSelect
                            name='sizeId'
                            options={size}
                            id='sizeId'
                            onChange={handleChange}
                            optionName='sizeName'
                            value={values?.sizeId}
                            title='Talla' />
                        <NewSelect
                            name='countryId'
                            options={countries}
                            id='cId'
                            onChange={onChangeSearch}
                            optionName='cName'
                            value={values?.countryId}
                            title='País' />
                        <NewSelect
                            name='dId'
                            options={departments}
                            id='dId'
                            onChange={onChangeSearch}
                            optionName='dName'
                            value={values?.dId}
                            title='Departamento' />
                        <NewSelect
                            name='ctId'
                            options={cities}
                            id='ctId'
                            onChange={handleChange}
                            optionName='cName'
                            value={values?.ctId}
                            title='Ciudad' />
                        <Label>Description:</Label>
                        <TextareaDescription value={values?.ProDescription}
                            onChange={handleChange}
                            name='ProDescription' >
                        </TextareaDescription>
                    </>
                    <RippleButton type="button" onClick={handleClickModal} widthButton='100%' margin='auto' bgColor={PVColor}> <Label>Características principales</Label></RippleButton>
                    <FeaturesProducts setModal={setModal} modal={modal} />
                    <button type='submit'>Subir</button>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={state} bgColor='#ededed'>
                <ViewProducts
                    valuesP={values.pName}
                    Country={countries}
                    price={values?.ProPrice}
                    desc={values?.ProDescuento}
                    PCant={values?.ProUniDisponibles}
                    PDescription={values?.ProDescription}
                    start={rating}
                    setRating={setRating} />
            </Card>
        </Container>
    </>
    )
}