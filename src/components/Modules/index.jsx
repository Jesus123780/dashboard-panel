import InputHooks from '../InputHooks/InputHooks'
import { RippleButton } from '../Ripple'
import phone from '../../assets/img/phone.png'
import { Card, Container, Form, HeroBanner, Img, Text } from './styled'
import NewSelect from '../NewSelectHooks/NewSelect'
import { Link } from 'react-router-dom'
import { Skeleton } from '../Skeleton/SkeletonCard'

export const Modules = ({ handleRegister, handleChange, values, handleRegisterSubModule, errorC, data, offsetY, dataSub }) => {
    return (<>
        <p>{errorC && 'err'}</p>
        <HeroBanner>
            <Img style={{ transform: `translateY(${ offsetY * 0.8 }px)` }} src={phone} alt={'phone'} />
        </HeroBanner>
        <Container>
            <Form onSubmit={handleRegister}>
                <Text size='30px'>Registra un Modulo</Text>
                <InputHooks title='Nombre del modulo'
                    value={values.mName}
                    name='mName'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <InputHooks title='Ruta del modulo'
                    value={values.mPath}
                    name='mPath'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <InputHooks title='Prioridad  del modulo'
                    value={values.priority}
                    name='priority'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <InputHooks title='Icono'
                    value={values.mIcon}
                    name='mIcon'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <RippleButton widthButton={'100%'} type='submit'>Subir</RippleButton>
            </Form>
            <Form onSubmit={handleRegisterSubModule}>
                <Text size='30px'>Registra un Sub-modulo</Text>
                <NewSelect name='mId' options={data} id='mId' onChange={handleChange} optionName='mName' value={values?.mId} title='Modulo' required />
                <InputHooks title='Nombre del Sub-modulo'
                    value={values.smPath}
                    name='smPath'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <InputHooks title='Ruta del sub-modulo'
                    value={values.smName}
                    name='smName'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <InputHooks title='Prioridad  del Sub-modulo'
                    value={values.subMPriority}
                    name='subMPriority'
                    onChange={handleChange}
                    range={{ min: 0, max: 700 }} />
                <RippleButton widthButton={'100%'} type='submit'>Subir</RippleButton>
            </Form>
        </Container>
        <Container>
            <Card>
                <Text size='30px'>Modulos</Text>
                {data?.length ? data?.map(x => (
                    <div key={x.mId}>
                        <Text align='start' >{x.mName}</Text>
                        <Link to={x.mPath}>{x.mPath}</Link>
                    </div>
                )) : <Skeleton />}
            </Card>
            <Card>
                <Text size='30px'>Sub-Modulos</Text>
                { dataSub?.length ? dataSub?.map(x => (
                    <div key={x.smId}>
                        <Text align='start' >{x.smName}</Text>
                        <Link to={x.smPath}>{x.smPath}</Link>
                    </div>
                )): <Skeleton />}
            </Card>
        </Container>
    </>
    )
}