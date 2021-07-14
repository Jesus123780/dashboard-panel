import React from 'react'
import { Container, Card, Title, Discount, Price, Info, Button } from './styled'
import { RippleButton } from '../../../Ripple'
import { InputFilesProductos } from '../../../InputFilesPrev'
import { APColor, PVColor } from '../../../../assets/colors'

export const ViewProducts = props => {
    const unidad = '1'
    const { value, discount } = props
    const onchangeFile =() => {

    }
    return (
        <Container>
            <InputFilesProductos onChange={onchangeFile} />
            <Card>
                <i>Nuevo producto</i>
                <Title>{value}</Title>
                <Price>{value}</Price>
                <Discount discount={discount} >{value}</Discount>
                <Button onClick={console.log('')}>
                    <Info>Ver los medios de pago</Info>
                </Button>
                <Info size='17px' color={'#1f4e96'}>Compra internacional</Info>
                <Info size='15px' color={APColor}>Sin costos de importación</Info>
                <Info size='15px' color={'#000'}>Cantidad { `${ unidad }`}</Info>
                <RippleButton label='Comprar ahora' bgColor={PVColor} />
            </Card>
        </Container>
    )
}