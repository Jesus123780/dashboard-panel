import { useContext, useState } from 'react';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { IconArrowRight, IconBodega, IconDelete, IconEdit, IconLove } from '../../../assets/icons/icons';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { PColor, PVColor } from '../../../assets/colors';
import { RippleButton } from '../../Ripple';
import { Context } from '../../../Context';
import { FeaturesProducts } from './FeaturesProduct';
import { TextAreaHooks } from '../../TextTareaHook';
import { Loading } from '../../Loading';
import {
    Container,
    FormProducts,
    Card,
    Button,
    CardOne,
    Label,
    ContainerCardProduct,
    CardProduct,
    Img,
    ContentImg,
    Title,
    Text,
    ContentInfo,
    ContentIconFav,
    ButtonCard,
    ActionName,
} from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';

export const Products = ({ values, handleRegister, handleChange, countries, setRating, rating, color, size, onChangeSearch, departments, cities, setName, name, getAllProduct, loading, handleDelete }) => {
    const [state, setState] = useState(false)
    const handleClick = () => {
        setState(!state)
    }
    const { modal, setModal } = useContext(Context);
    const handleClickModal = () => {
        setModal(!modal)
    }
    return (<div>
        {loading && <Loading />}
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
                        <TextAreaHooks
                            title='Description'
                            value={values.ProDescription}
                            name='ProDescription'
                            onChange={handleChange}
                            range={{ min: 0, max: 7000 }}
                            showRange
                        />
                    </>
                    <RippleButton type="button" onClick={handleClickModal} widthButton='100%' margin='auto' bgColor={PVColor}> <Label>Características principales</Label></RippleButton>
                    <FeaturesProducts setModal={setModal} modal={modal} />
                    <RippleButton widthButton='100%' margin='20px auto' type='submit'>Subir</RippleButton>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={state} bgColor='#ededed'>
                <ViewProducts
                    valuesP={name}
                    Country={countries}
                    price={values?.ProPrice}
                    desc={values?.ProDescuento}
                    PCant={values?.ProUniDisponibles}
                    PDescription={values?.ProDescription}
                    start={rating}
                    setRating={setRating} />
            </Card>
        </Container>
        <ContainerCardProduct>
            {!getAllProduct?.length ? <SkeletonP /> : getAllProduct?.map(product => (
                <CardProduct key={product.pId} >
                    <ButtonCard onClick={() => handleDelete(product.pId)}>
                        <IconDelete size={20} color={PColor} />
                        <ActionName >
                            Eliminarais
                        </ActionName>
                    </ButtonCard>
                    <ButtonCard delay='.1s' top={'80px'}>
                        <IconEdit size={20} color={PColor} />
                        <ActionName>
                            Editar
                        </ActionName>
                    </ButtonCard>
                    <ButtonCard delay='.2s' top={'140px'}>
                        <IconBodega size={20} color={PColor} />
                        <ActionName>
                            Archivar
                        </ActionName>
                    </ButtonCard>
                    <ContentImg>
                        {product.ProImage ? <i>Cargando</i> : <Img src={product.ProImage} alt={product.ProImage} />}
                    </ContentImg>
                    <ContentInfo>
                        <ContentIconFav>
                            <IconLove color={PVColor} size={20} />
                        </ContentIconFav>
                        <Title>{product.pName}</Title>
                        <Text>{product.ProPrice}</Text>
                        <Rate rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                    </ContentInfo>
                </CardProduct>
            ))}
        </ContainerCardProduct>
    </div>
    )
}
const SkeletonP = () => {
    return <>
        <>
            {[1, 2, 3, 4].map(x => (
                <CardProduct key={x.id}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}