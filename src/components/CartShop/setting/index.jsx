import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { PColor, PLColor } from '../../../assets/colors'
import { Content } from './styled'
import { IconLogout, IconArrowLeft } from '../../../assets/icons/icons'
import useAuth from '../../hooks/useAuth'
import { useApolloClient } from '@apollo/client'
import { AwesomeModal } from '../../AwesomeModal'
// 1
import { Password } from '../setting/Password'
// 2
import { Email } from '../setting/Email'
// 3
import { Number } from '../setting/Number'
// 3
import { Direction } from '../setting/direction'
// 3
import { Task } from '../setting/tasks'

export const Setting = props => {
    const { activeLogin, setActive } = props
    // activa el menu de configuraciones del perfil
    const onclickLoginForm = e => {
        e.stopPropagation()
        setActive(!activeLogin)
    }
    const Theme = localStorage.getItem('theme')
    const { logout } = useAuth()
    const { client } = useApolloClient()
    const onClickLogout = () => {
        client?.clearStore()
        logout()
    }
    // Accion del modal
    const [modal, setModal] = useState(false)

    const handleClick = index => {
        setModal(index === modal ? false : index)
    }
    return (
        <>
            <Content activeLogin={activeLogin}>
                <GoBack onClick={onclickLoginForm}>
                    <IconArrowLeft color={`${ PLColor }`} size='25px' />
                    <span>Configuración y privacidad</span>
                </GoBack>
                <Option Theme={Theme} >
                    <Button onClick={() => handleClick(1)} space>
                        <span>Cambiar contraseña</span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
                <Option Theme={Theme} >
                    <Button onClick={() => handleClick(2)} space>
                        <span>Cambiar Email </span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
                <Option onClick={() => handleClick(3)} Theme={Theme} >
                    <Button space>
                        <span>Cambiar Numero</span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
                <Option Theme={Theme} >
                    <Button onClick={() => handleClick(4)} space>
                        <span>Cambiar dirección</span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
                <Option Theme={Theme} >
                    <Button onClick={() => handleClick(5)} space>
                        <span>Tareas</span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
                <Option Theme={Theme} >
                    <Button onClick={onClickLogout} space>
                        <span>Cerrar sesión</span>
                        <IconLogout size='20px' color={PColor} />
                    </Button>
                </Option>
                <Hr />
            </Content>
            {ReactDOM.createPortal(<>
                <AwesomeModal
                    show={modal} height='auto' hiddenOnConfirm={false} timeOut={1080} footer={false} header={true}
                    show={modal}
                    backdrop
                    onCancel={() => setModal(false)}
                    onHide={() => setModal(false)}
                    btnConfirm={false}
                    header={false}
                    footer={false}
                    padding='0px'
                    size='small'>
                    {modal === 1 ? <Password /> : (modal === 2) ? <Email /> : (modal === 3) ? <Number /> : (modal === 4) ? <Direction/> : (modal === 5) ? <Task /> : <Number /> }
                </AwesomeModal>
            </>, document.getElementById('root')
            )}
        </>
    )
}
const Hr = styled.hr`
    background: #dadde1;
    border-width: 0;
    color: #dadde1;
    height: 1px;
    ${ props => props.Theme === 'light' && css`
        background-color: ${ ({ theme }) => `${ theme.BGAColor }32` } ;
    ` };

`
const Option = styled.div`
    padding: 15px 0px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    ${ ({ active }) => active && css`border-bottom: ${ active };` }
    &:hover{
        background-color: #ffffff1a;
    }
`
const GoBack = styled.div`
    display: flex;
    margin-bottom: 40px;
    & > span {
            font-family: PFont-Light;
            font-size: 14px;
            text-align: center;
            width: 100%;
            color: ${ ({ theme }) => `${ theme.PColor }` };
        }
`
export const Button = styled.button`
    margin: 0 0 0 30px;
    position: relative;
    cursor: pointer;
    z-index: 999;
    background-color:  transparent;
    ${ props => props.space &&css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        & > span {
            font-family: PFont-Light;
            font-size: 14px;
            color: ${ ({ theme }) => `${ theme.PColor }` };
        }
    ` }
    @media only screen and (min-width: 960px){
    }
`