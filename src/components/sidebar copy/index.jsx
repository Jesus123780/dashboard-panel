import React, { useState, useEffect } from 'react'
import Options from './Options'
import { SideBarLeft, BoxSideBar, LinkOption, BoxTitleNavBar, Name, ButtonMenu, Content, ContainerBoxUser, ContainerUserImg, SpanItem, ContainerOptions, ContainerBurger } from './Styled'
import { IconArrowBottom, IconUser, IconTask, IconBasura, IconGraphic, IconCloseSesion } from '../../assets/icons';
import { PLColor } from '../../assets/colors';
import { SubMenu } from '../showSubMenu';
import { useLocation } from 'react-router';
import LeftSection from '../LeftSection';
export const SideBar = () => {
    const [active, setActive] = useState(false)
    const [modal, setModal] = useState(false)
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);
    const handleClick = index => setActive(index === active ? false : index)
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setCollapsed(false))
        return () => body.removeEventListener('keyup', () => setCollapsed)
    }, [setCollapsed])

    const [status, setStatus] = useState('close')
    const location = useLocation()

    useEffect(() => {
        setStatus('close')
    }, [location]);

    return (
        <SideBarLeft toggle={collapsed} collapsed={collapsed} >
            <LeftSection />
            <BoxSideBar>
                <Content>
                    <BoxTitleNavBar title='Esc para abrir menu' toggle={collapsed} collapsed={collapsed} >
                        <Name>NotePlus</Name>
                        <ButtonMenu onClick={toggle}>
                            <ContainerBurger>
                                <div
                                    className="BurgerMenu__container"
                                    role="button"
                                    onClick={() => { setStatus(status === 'open' ? 'close' : 'open') }}
                                >
                                    <span className={status}></span>
                                    <span className={status}></span>
                                    <span className={status}></span>
                                </div>
                            </ContainerBurger>
                        </ButtonMenu>
                    </BoxTitleNavBar>
                    <ContainerBoxUser onClick={setModal}>
                        <ContainerUserImg collapsed={collapsed} >
                            <IconUser size='20px' />
                            <span>Bienvenido</span>
                            <IconArrowBottom size='10px' color={PLColor} />
                        </ContainerUserImg>
                        <SubMenu title='Registrar nueva tarea' show={modal} onHidde={() => setModal(false)} height='auto' hiddeOnConfirm={false} timeOut={0} footer={false} header={true}>
                            <SpanItem>Perfil</SpanItem>
                            <SpanItem>Editar Perfil</SpanItem>
                            <SpanItem>Configurar Cuenta</SpanItem>
                            <SpanItem>Cerrar sesión </SpanItem>
                        </SubMenu>
                    </ContainerBoxUser>
                    <ContainerOptions>
                        <Options label='Mis notas' active={active === 1} handleClick={() => handleClick(1)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconTask size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Mis notas</span>
                            </LinkOption>
                            <LinkOption to='/login'>
                                <span> Planes</span>
                            </LinkOption>
                        </Options>
                        <Options label='notas' active={active === 2} handleClick={() => handleClick(2)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconTask size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Home</span>
                            </LinkOption>
                        </Options>
                        <Options label='Juegos' active={active === 3} handleClick={() => handleClick(3)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconTask size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Home</span>
                            </LinkOption>
                        </Options>
                        <Options label='Progreso' active={active === 4} handleClick={() => handleClick(4)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconGraphic size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Home</span>
                            </LinkOption>
                        </Options>
                        <Options label='Basura' active={active === 5} handleClick={() => handleClick(5)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconBasura size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Mis Libros</span>
                            </LinkOption>
                        </Options>
                        <Options label='Cerrar sesión' active={active === 6} handleClick={() => handleClick(6)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconCloseSesion size='25px' color={PLColor} />}>
                            <LinkOption to='/'>
                                <span>Mis Libros</span>
                            </LinkOption>
                        </Options>
                    </ContainerOptions>
                </Content>
            </BoxSideBar>
        </SideBarLeft>
    )
}