import React from 'react'
import { RippleButton } from '../../../Ripple'
import { InputFilesProductos } from '../InputFilesPrev'
import { APColor, PVColor } from '../../../../assets/colors'
import { numberFormat } from '../../../../utils'
import { Container, Card, Title, Discount, Price, Info, Button, Table, Text } from './styled'

export const ViewProducts = props => {
    const { valuesP, discount, price, desc, PCant, PDescription } = props
    const onchangeFile =() => {

    }
    return (<>
        <Container>
            <Card width='70%'>
                <InputFilesProductos onChange={onchangeFile} />
                <Text>Descripción:</Text>
                <Text size='20px'>{PDescription}</Text>
                <Table>
                    <tbody>
                        <tr>
                            <th className="andes-table">Nombre de usuario</th>
                            <td><span>fsfsdfsf</span></td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            <Card>
                <i>Nuevo producto</i>
                <Title>{valuesP ? valuesP : 'Nombre del producto'}</Title>
                <Price> $ {price ? numberFormat(price) :'Precio del producto'}</Price>
                <Discount discount={discount} > $ {desc ? numberFormat(desc) :'1.000.000'}</Discount>
                <Button>
                    <Info>Ver los medios de pago</Info>
                </Button>
                <Info size='17px' color={'#1f4e96'}>Compra internacional</Info>
                <Info size='15px' color={APColor}>Sin costos de importación</Info>
                <Info size='15px' color={'#000'}>Cantidad { `${ PCant }`}</Info>
                <RippleButton label='Comprar ahora' bgColor={PVColor} />
            </Card>
        </Container>

    </>
    )
}