import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { AwesomeModal } from '../AwesomeModal'
import { InputFile } from '../MultiInputs/inputs'
import { useScrollY } from '../hooks/useScroll'
import InputHooks from '../InputHooks/InputHooks'
import phone from '../../assets/img/phone.png'
import { SvgComponentUser } from './svg'
import { PColor } from '../../assets/colors'
import { IconLogo } from '../../assets/icons/icons'
import {
    Text,
    Container,
    Circular,
    ContentOptions,
    LefPart,
    BoxInput,
    Input,
    LabelInput,
    Paragraph,
    Anchor,
    TextArea,
    HeroBanner,
    BtnShare,
    Img,
    InputSocial,
    SocialSection
} from './styled'
// import moment from 'moment'

export const UserProfile = ({ params, data, loading, error, handleFileChange, values, handleChangePass, errors, handleCopy, inputRef }) => {
    const [modal, setModal] = useState(false)
    const { auth } = useAuth()
    if (error) {
        return (
            <div style={{ display: 'grid', placeContent: 'center', justifyContent: 'center', width: '100%' }}>
                <Text size="40px">Usuario {auth.uUsername} no encontrado</Text>
                <SvgComponentUser />
            </div>
        )
    }
    // VARIABLES GLOBALES
    // const fechaActual = moment().format('DD-MM-YYYY')
    useEffect(() => {
        if (window.location?.pathname) {
            const Title = data ? data?.getUser?.name : auth.uUsername
            document.title = `${ Title } |  Ifood`
        } else {
            document.title = 'Ifood'
        }
    }, [data])
    const { offsetY } = useScrollY();
    return (<>
        <HeroBanner>
            <Img style={{ transform: `translateY(${ offsetY * 0.8 }px)` }} src={phone} alt={'phone'} />
            <SocialSection>
                <BtnShare type="button" onClick={handleCopy}>
                    <InputSocial ref={inputRef} value={`http://localhost:3000/u/${ data?.getUser?.siteWeb }`} />
                    <IconLogo color={PColor} size='20px' />
                </BtnShare>
                <BtnShare type="button" onClick={handleCopy}>
                    <InputSocial ref={inputRef} value={`http://localhost:3000/u/${ data?.getUser?.name }`} />
                    <IconLogo color={PColor} size='20px' />
                </BtnShare>
                <BtnShare type="button" onClick={handleCopy}>
                    <InputSocial ref={inputRef} value={`http://localhost:3000/u/${ data?.getUser?.name }`} />
                    <IconLogo color={PColor} size='20px' />
                </BtnShare>
            </SocialSection>
        </HeroBanner>
        <Container bg={auth.uUsername} >
            {loading && 'cargando'}
            <LefPart style={{ transform: `translateX(${ offsetY / 3 }px)` }}>
                <Paragraph>Hola {`${ auth?.Uname ? auth?.Uname : 'Bienvenido' }`} </Paragraph>
                <Text>Información</Text>
                <BoxInput>
                    <Input name="Uname"
                        value={data?.getUser?.username}
                    />
                    <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
                <BoxInput>
                    <Input name="Uname"
                        value={data?.getUser?.email}
                    />
                    <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
                <BoxInput>
                    <Anchor target='_blank' href={data?.getUser?.siteWeb}>{data?.getUser?.siteWeb}
                    </Anchor>
                </BoxInput>
                <BoxInput>
                    <TextArea type="text" name="description"
                        value={data?.getUser?.description}
                    // onChange={}
                    />
                    <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
            </LefPart>
            <LefPart position style={{ transform: `translateX(${ offsetY / .14 }px)` }}>
                <BoxInput>
                    <Input name="Uname"
                        value={data?.getUser?.email}
                    // onChange={}
                    />
                    <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
            </LefPart>
            <LefPart style={{ transform: `translateX(${ offsetY / .14 }px)` }}>
                <Circular onClick={() => data?.getUser.username === auth.uUsername && setModal(!modal)}>
                </Circular>
            </LefPart>
            <LefPart style={{ transform: `translateX(${ offsetY / .14 }px)` }}>
                <InputHooks name="currentPassword"
                    value={values?.currentPassword}
                    errors={errors?.currentPassword}
                    onChange={handleChangePass}
                    title="Contraseña"
                    required
                    disabled
                    autoComplete='none'
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks name="newPassword"
                    value={values?.newPassword}
                    errors={errors?.newPassword}
                    pass
                    disabled
                    onChange={handleChangePass}
                    title="Nueva Contraseña"
                    required
                    type="password"
                    range={{ min: 0, max: 180 }}
                />
            </LefPart>
            <AwesomeModal
                show={modal}
                backdrop
                onCancel={() => setModal(false)}
                onHide={() => setModal(false)}
                btnConfirm={false}
                header={true}
                footer={false}
                padding='0px'
                title={`Usuario ${ params?.uUsername }`}
            >
                <ContentOptions>
                    <Text color='2' bottom> <InputFile label={'Cambiar foto de perfil'} type="file" onChange={handleFileChange} name="" id="" /> </Text>
                    <Text color='1' bottom>Eliminar foto de perfil</Text>
                    <Text onClick={() => setModal(false)} bottom>Cancelar</Text>
                </ContentOptions>
            </AwesomeModal>
        </Container>
    </>)
}