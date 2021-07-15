// import InputHooks from '../../InputHooks/InputHooks';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { useState } from 'react';
import { IconArrowRight } from '../../../assets/icons/icons';
import { Container, FormProducts, Card, Button, CardOne } from './styled';

export const Products = ({ handleChangeName, input }) => {
    const [state, setstate] = useState(false)
    const handleClick = () =>{
        setstate(!state)
    }
    return (<>
        <Container>
            <CardOne state={state}>
                <FormProducts>
                    <InputHook label="Nombre" value={input} onChange={handleChangeName} />
                    <InputHook label="Precio" />
                    <InputHook label="Descuento" />
                    <InputHook label="Cantidad" />
                    <InputHook label="Unidades disponibles" />
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={state} bgColor='#ededed'>
                <ViewProducts value={input} />
            </Card>
        </Container>
    </>
    )
}