import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { AwesomeModal } from '../AwesomeModal'
import { InputFile } from '../MultiInputs/inputs'
import { Text, Container, Circular, ContentOptions, LefPart, BoxInput, Input, LabelInput, Paragraph, Anchor, TextArea } from './styled'
import { useScrollY } from '../hooks/useScroll'
import InputHooks from '../InputHooks/InputHooks'
export const UserProfile = ({ params, data, loading, error, handleFileChange, values, handleChangePass, errors }) => {
    if (error) return <h1>Usuario no existe</h1>
    const [modal, setModal] = useState(false)
    const { auth } = useAuth()
    useEffect(() => {
        if (window.location?.pathname) {
            const Title = data ? data?.getUser?.name : auth.uUsername
            document.title = `${ Title } |  Ifood`
        } else {
            document.title = 'Ifood'
        }
    }, [data])
    const { offsetY } = useScrollY();
    return (
        <Container bg={auth.uUsername} >
            {loading && 'cargando'}
            <LefPart style={{ transform: `translateX(${ offsetY / 3 }px)` }}>
                <Paragraph>Hola {`${ auth?.Uname ? auth?.Uname : 'Bienvenido' }`} </Paragraph>
                <Text>Información</Text>
                <BoxInput>
                    <Input name="Uname"
                        value={data?.getUser?.username}
                    // onChange={}
                    />
                    <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
                <BoxInput>
                    <Input name="Uname"
                        value={data?.getUser?.email}
                    // onChange={}
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
    )
}