import React, { useState, useEffect, useContext } from 'react'
import Options from './Options'
import { SideBarLeft, BoxSideBar, LinkOption, BoxTitleNavBar, ButtonMenu, Content, ContainerOptions, ContainerBurger } from './Styled'
import { PColor, PLColor } from '../../assets/colors';
import { useLocation } from 'react-router';
import { IconArrowBottom, IconSearch, IconShopping, IconEnterLocation } from '../../assets/icons/icons';
// import { LeftSideBarContext } from '../layout/ContextLayout';
import { Context as contextLayout } from '../../Context'
import styled from 'styled-components';

export const SideBar = () => {
    const { collapsed, setCollapsed } = useContext(contextLayout);
    const [active, setActive] = useState(false)
    const toggle = () => setCollapsed(!collapsed);
    const handleClick = index => setActive(index === active ? false : index)
    const [status, setStatus] = useState('close')
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setCollapsed(false))
        body.addEventListener('keyup', e => e.code === 'Escape' && setStatus('close'))
        return () => body.removeEventListener('keyup', () => setCollapsed)
    }, [setCollapsed])
    const location = useLocation()
    useEffect(() => {
        setStatus('close')
    }, [location]);

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const [time, changeTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
        setInterval(() => {
            changeTime(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <>
            <SideBarLeft collapsed={collapsed} >
                <BoxSideBar>
                    <Content>
                        <BoxTitleNavBar title='Esc para abrir menu' toggle={collapsed} collapsed={collapsed} >
                            <ButtonMenu onClick={toggle}>
                                <ContainerBurger >
                                    <div className="BurgerMenu__container" role="button" onClick={() => { setStatus(status === 'open' ? 'close' : 'open') }} >
                                        <span className={status}></span>
                                        <span className={status}></span>
                                        <span className={status}></span>
                                    </div>
                                </ContainerBurger>
                            </ButtonMenu>
                        </BoxTitleNavBar>
                        <ContainerOptions>
                            <Options label='Banner' active={active === 1} handleClick={() => handleClick(1)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PColor} />}>
                                <LinkOption to='/banner/home'>
                                    <span>Banner Imágenes</span>
                                </LinkOption>
                            </Options>
                            <Options label='Mi panel' active={active === 3} handleClick={() => handleClick(3)} icon={<IconArrowBottom size='10px' color={PColor} />} iconTwo={<IconShopping size='25px' color={PColor} />}>
                                <LinkOption to='/update/products'>
                                    <span>Publicar productos</span>
                                </LinkOption>
                                <LinkOption to='/'>
                                    <span>Compartir productos</span>
                                </LinkOption>
                                <LinkOption to='/update/offers'>
                                    <span>Ofertas de productos</span>
                                </LinkOption>
                                <LinkOption to='/chat'>
                                    <span>Chat</span>
                                </LinkOption>
                            </Options>
                            {/* <Options label='Categorías' active={active === 4} handleClick={() => handleClick(4)} icon={<IconArrowBottom size='15px' color={PLColor} />} iconTwo={<IconCategories size='40px' color={PLColor} />}>
                                <LinkOption to='/'>
                                    <span>Organizar productos</span>
                                </LinkOption>
                                <LinkOption to='/'>
                                    <span>Lista de categorías</span>
                                </LinkOption>
                                <LinkOption to='/update/category'>
                                    <span>Registrar categorías</span>
                                </LinkOption>
                                <LinkOption to='/update/popularcategories'>
                                    <span>Registrar categorías populares</span>
                                </LinkOption>
                            </Options> */}
                            {/* <Options label='Aliados / Marcas  / Tiendas Oficiales' active={active === 5} handleClick={() => handleClick(5)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                                <LinkOption to='/update/oficialstores'>
                                    <span>Subir Tiendas Aliadas</span>
                                </LinkOption>
                            </Options>
                            <Options label='Kit de publicidad' active={active === 2} handleClick={() => handleClick(2)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                            <LinkOption to='/update/kit'>
                            <span>Banner Imágenes</span>
                            </LinkOption>
                        </Options> */}
                            <Options label='PQR' active={active === 6} handleClick={() => handleClick(6)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                                <LinkOption to='/update/PQR'>
                                    <span>Preguntas Frecuentes</span>
                                </LinkOption>
                            </Options>
                            <Options label='Locations' active={active === 7} handleClick={() => handleClick(7)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconEnterLocation size='25px' color={PColor} />}>
                                <LinkOption to='/update/location'>
                                    <span>Update Location</span>
                                </LinkOption>
                            </Options>
                            <TextField
                                id='date'
                                title='Date'
                                type='date'
                                defaultValue='2021-05-24'
                                onChange={handleChange}
                                value={values?.date}
                            />
                            <p>{time}</p>
                        </ContainerOptions>
                    </Content>
                </BoxSideBar>
            </SideBarLeft>
        </>
    )
}
const TextField = styled.input`

`