// import InputHooks from '../../InputHooks/InputHooks';
import { Container, FormProducts, Card } from './styled';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';

export const Products = ({ handleChangeName, input }) => {
    return (<>
        <Container>
            <Card width='30%'>
                <FormProducts>
                    <InputHook label="Nombre" value={input} onChange={handleChangeName} />
                    <InputHook label="Precio" />
                    <InputHook label="Descuento" />
                    <InputHook label="Cantidad" />
                    <InputHook label="Unidades disponibles" />
                </FormProducts>
            </Card>
            <Card bgColor='#ededed' width='70%'>
                <ViewProducts value={input} />
            </Card>
        </Container>
    </>
    )
}