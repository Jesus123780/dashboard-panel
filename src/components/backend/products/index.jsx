import React from 'react'
import { PColor, PVColor } from '../../../assets/colors'
import { IconBodega, IconDelete, IconEdit, IconLove } from '../../../assets/icons/icons';
import { numberFormat } from '../../../utils'
import { Rate } from '../../Rate';
import { SkeletonP } from '../../Update/Products';
import { InputHook } from '../../Update/Products/Input';
import {
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
    ReadMore,
    Container,
} from './styled.jsx';
export const Products = ({ data, setShowMore, handleDelete, handleChangeFilter, search, setRating, }) => {
    return (
        <Container>
            <InputHook label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' range={{ min: 0, max: 200 }} />
            <ContainerCardProduct>
                {!data?.length ? <SkeletonP /> : data?.map(product => (
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
                            <Text>{numberFormat(product.ProPrice)}</Text>
                            <Rate rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                        </ContentInfo>
                    </CardProduct>
                ))}
            </ContainerCardProduct>
            <ReadMore onClick={() => setShowMore(s => s + 5)}>'Cargar Más' </ReadMore>
        </Container>
    )
}