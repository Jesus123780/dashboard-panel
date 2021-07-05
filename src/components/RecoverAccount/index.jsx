import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PColor, PLColor } from '../../assets/colors'
import { IconLogo } from '../../assets/icons/icons'
import InputHooks from '../InputHooks/InputHooks'
import { IconArrowLeft } from '../../assets/icons/icons'
import { Content, Card, Enlace, Form, Text, GoBack, ContentBottom, ButtonSubmit } from './styled'
import { OTPBox } from '../code';

export const RecoverAccount = ({ values, handleChange, loading, errors, handleClick }) => {
    const [activeToken, setActiveToken] = useState(false)
    const handleClickToken = () => {
        setActiveToken(!activeToken)
    }
    return (<div>
        <Content>
            <Enlace to='/'>
                <IconLogo size='80px' color={PColor} />
            </Enlace>
            <Card>
                ----------Animaciones Bonitas----------
            </Card>
            {/* Sección de Register */}
            <Card>
                <Form>
                    <ContentBottom>
                        <Link to='/'>
                            <GoBack type='button' onClick={() => handleClick(0)}><IconArrowLeft color={`${ PLColor }`} size='25px' /></GoBack>
                        </Link>
                    </ContentBottom>
                    {activeToken && <Text>Recuperación de contraseña</Text>}
                    {/* {activeToken && <Text>Hemos enviado un codigo a tu correo para recuperar tu contraseña</Text>} */}
                    {!activeToken && <Text>Informa tu correo o número de teléfono para continuar </Text>}
                    {!activeToken ?

                        <>
                            <InputHooks name="email"
                                value={values?.email}
                                errors={values?.email}
                                email
                                onChange={handleChange}
                                type="text"
                                title="Correo Electrónico"
                                required range={{ min: 0, max: 180 }} />
                        </> :
                        <>
                            {/* <InputHooks name="password"
                                value={values?.password}
                                errors={values?.password}
                                email
                                onChange={handleChange}
                                type="text"
                                title="Contraseña"
                                required range={{ min: 0, max: 180 }} />
                            <InputHooks name="NewPassword"
                                value={values?.NewPassword}
                                errors={values?.NewPassword}
                                pass
                                onChange={handleChange}
                                type="text"
                                title="Confirmar Contraseña"
                                required range={{ min: 0, max: 180 }} /> */}
                            <OTPBox />
                        </>
                    }
                    <ButtonSubmit disabled={errors} type='submit' onClick={() => handleClickToken()}>{loading ? <LoadEllipsis /> : 'Enviar'} </ButtonSubmit>
                    <Link to='/'>
                        <Text cursor color='red' size='15px' onClick={() => handleClick(0)} >Iniciar sesión</Text>
                    </Link>
                </Form>
            </Card>
        </Content>
    </div>

    )
}