import { Loading } from '../Loading'
import { Svg } from './svg'
import InputHooks from '../InputHooks/InputHooks'
import { RippleButton } from '../Ripple'
import { BGColor } from '../../assets/colors'
import { IconLogo } from '../../assets/icons/icons'
import { Content, Form, Card, Text, Enlace } from './styled'

export const LoginUserMaster = ({ handleChange, loading, values, handleRegister, errors }) => {

    return (
        <>
            {loading && <Loading />}
            <Content>
                <Enlace to='/'>
                    <IconLogo size='80px' color={BGColor} />
                </Enlace>
                <Svg />
                <div>
                    <Text>En antojo de tu parte</Text>
                    <Form onSubmit={handleRegister}>
                        <Card>
                            <Text >Ingresa </Text>
                            <InputHooks
                                title="Nombre"
                                name="name"
                                value={values?.name}
                                errors={errors?.name}
                                onChange={handleChange}
                                type="text"
                                required
                                range={{ min: 0, max: 180 }}
                            />
                            <InputHooks
                                title="Credential"
                                name="credentials"
                                value={values?.credentials}
                                errors={errors?.credentials}
                                onChange={handleChange}
                                type="text"
                                required
                                range={{ min: 0, max: 180 }}
                            />
                            <InputHooks name="username"
                                value={values?.username}
                                errors={errors?.username}
                                type="text"
                                onChange={handleChange}
                                title="Nombre de Usuario"
                                required
                                range={{ min: 0, max: 180 }}
                            />
                            <InputHooks name="email"
                                value={values?.email}
                                errors={errors?.email}
                                email
                                onChange={handleChange}
                                type="text"
                                title="Correo Electrónico"
                                required
                                range={{ min: 0, max: 180 }}
                            />
                            <InputHooks name="lastName"
                                value={values?.lastName}
                                errors={errors?.lastName}
                                onChange={handleChange}
                                type="text"
                                title="Apellido"
                                required
                                range={{ min: 0, max: 180 }}
                            />
                            <InputHooks name="password"
                                value={values?.password}
                                errors={errors?.password}
                                pass
                                onChange={handleChange}
                                title="Contraseña"
                                required
                                type="password"
                                range={{ min: 0, max: 180 }}
                            />
                            <RippleButton widthButton='100%' type='submit'>Enviar</RippleButton>
                        </Card>
                    </Form>
                </div>
            </Content>
        </>
    )
}