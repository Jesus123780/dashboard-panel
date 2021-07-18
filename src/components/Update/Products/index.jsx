// import InputHooks from '../../InputHooks/InputHooks';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { useState } from 'react';
import { IconArrowRight } from '../../../assets/icons/icons';
import { Container, FormProducts, Card, Button, CardOne, TextareaDescription, Label } from './styled';
import { numberFormat } from '../../../utils';

export const Products = ({ values, handleRegister, handleChange }) => {
    const [state, setState] = useState(false)
    const handleClick = () => {
        setState(!state)
    }
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
                    <InputHook label='Unidades disponibles'
                        value={numberFormat(values?.ProQuantity)}
                        errors={values?.ProQuantity}
                        name='ProQuantity'
                        range={{ min: 0, max: 180 }}
                        onChange={handleChange}
                    />
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
                    <TextareaDescription value={values?.PDescription}
                        errors={values?.PDescription}
                        onChange={handleChange}
                        name='PDescription' >
                    </TextareaDescription>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={state} bgColor='#ededed'>
                <ViewProducts valuesP={values.PName} price={values?.price} desc={values?.PDesc} PCant={values?.ProQuantity} PDescription={values?.PDescription} />
            </Card>
        </Container>
    </>
    )
}