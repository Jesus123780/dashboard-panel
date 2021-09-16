import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { PColor } from '../../assets/colors'
import { useApolloClient } from '@apollo/client'
import { IconLogout, IconMessageMain, IconShopping } from '../../assets/icons/icons'
import useAuth from '../hooks/useAuth'
import { Setting } from './setting/index'
import { Content, FloatingBox, Button, FloatingBoxTwo, Overline } from './styled'

export const CartShop = ({ keyTheme, handleTheme }) => {
    const { auth, logout } = useAuth()
    const { client } = useApolloClient()
    const [show, setShow] = useState(false)

    const Theme = localStorage.getItem('theme')
    const onClickLogout = () => {
        client?.clearStore()
        logout()
    }
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)

    }, [setShow])
    const handleClick = index => {
        setShow(index === show ? false : index)
    }
    const location = useLocation()

    useEffect(() => {
        setShow(false)
    }, [location]);
    const [activeLogin, setActive] = useState(false)
    // activa el menu de configuraciones del perfil
    const activeSettings = () => {
        setActive(!activeLogin)
    }
    return (
        <>
            <Overline onClick={() => setShow(!true)} show={show} />
            {auth && <Content >
                <Button>
                    <Enlace to='/messages'>
                        <IconMessageMain size='25px' color={PColor} />
                    </Enlace>
                </Button>
                <Button onClick={() => handleClick(1)}>
                    <IconShopping size='25px' color={PColor} />
                </Button>
                <FloatingBox show={show === 1}>
                    lorem ipsum dolor sit am
                    lorem ipsum dolor sit am
                    lorem ipsum dolor sit am
                    lorem ipsum dolor sit am
                    lorem ipsum dolor sit am
                    lorem ipsum dolor sit am
                </FloatingBox>
                <Button onClick={onClickLogout}>
                    <IconLogout size='20px' color={PColor} />
                </Button>
                <ContainerOption>
                    <Button onClick={() => handleClick(2)}>
                        <IconShopping size='25px' color={PColor} />
                    </Button>
                    <FloatingBoxTwo show={show === 2}>
                        <Option>
                            <Enlace to={`/u/${ auth.uUsername }`}>
                                <Avatar />
                                <BoxUser>
                                    <span>{auth?.Uname}</span>
                                    <span>Ver tu perfil</span>
                                </BoxUser>
                            </Enlace>
                        </Option>
                        <Option Theme={Theme} >
                            <Text>Pantalla y accesibilidad</Text>
                            <ButtonTheme
                                onClick={() => keyTheme === 'light' ? handleTheme('dark') : handleTheme('light')}>
                                <Switch active={Theme === 'dark' ? '40px' : '1px'} />
                            </ButtonTheme>
                        </Option>
                        <Hr />
                        <Option Theme={Theme} >
                            <span style={{ fontFamily: 'PFont-Light', fontSize: '14px' }} onClick={activeSettings}>Configuración y privacidad</span>
                            <Setting activeLogin={activeLogin} setActive={setActive} />
                        </Option>
                        <Hr />
                        <Option Theme={Theme} >
                            <Button space onClick={onClickLogout}>
                                <span>Cerrar sesión</span>
                                <IconLogout size='20px' color={PColor} />
                            </Button>
                        </Option>
                        <Hr />
                    </FloatingBoxTwo>
                </ContainerOption>
            </Content>}
        </>
    )
}
const ContainerOption = styled.div`
    position: relative;
`
const Hr = styled.hr`
    background: #dadde1;
    border-width: 0;
    color: #dadde1;
    height: 1px;
    ${ props => props.Theme === 'light' && css`
        background-color: ${ ({ theme }) => `${ theme.BGAColor }32` } ;
    ` };

`
const Text = styled.span`
    font-family: PFont-Light;
    font-size: 14px;
    color: ${ ({ theme }) => `${ theme.PColor }` };
`
const Enlace = styled(Link)`
    position: relative;
    display: flex;
    color: ${ ({ theme }) => `${ theme.PColor }` } ;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #1b18181a;
    }
    `
const Option = styled.div`
    padding: 15px 0px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:hover{
        background-color: #ffffff1a;
    }
`
const ButtonTheme = styled.button`
    width: 65px;
    height: 25px;
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
const Avatar = styled.img`
    width: 60px;
    min-width: 60px;
    height: 60px;
    background-color: ${ ({ theme }) => `${ theme.BGAColor }32` } ;
    border-radius: 100%;
    border: 2px solid ${ ({ theme }) => `${ theme.SFSColor }32` } ;
    padding: 1px;
`
const BoxUser = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
    align-items: center;
    & > span {
        font-family:  PFont-Regular;
        font-size: 12px;
        white-space: nowrap;
        display: block;
        margin-left: 25px;
    }
    & > span:first-child {
        font-family:  PFont-Bold;
    }
`
const Switch = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 50%;
    top: 1px;
    position: absolute;
    border-bottom: 1px solid ${ ({ theme }) => `${ theme.BGAColor }32` } ;
    background-color: ${ ({ theme }) => `${ theme.BGAColor }90` } ;
    ${ ({ active }) => active && css`left: ${ active };` }
    transition: .3s ease;

`