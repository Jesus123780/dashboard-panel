import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MenuLeft, OptionMenu, Span, Row } from './Styled'

const Options = ({ index, active, children, label, path, handleClick, icon, iconTwo }) => {

    const [height, setHeight] = useState(0)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()
    const location = useLocation()

    useEffect(() => {
        setHeight(refButton.current.clientHeight - refMenu.current.clientHeight)
        setHeightMenu(refMenu.current.clientHeight)
        !!location.pathname.includes(path) && handleClick(index)
    }, [])

    useEffect(() => {
        setHeight(active ? (height + heightMenu) : refButton.current.clientHeight - refMenu.current.clientHeight)
    }, [active])

    return (
        <MenuLeft type='button' onClick={e => handleClick(e)} active={active} ref={refButton} height={height}>
            <Row active={active}>
                {iconTwo}
                <Span active={active}>{label}</Span>
                <i>
                    {icon}
                </i>
            </Row>
            <OptionMenu active={active} ref={refMenu}>
                {children}
            </OptionMenu>
        </MenuLeft>
    )
}

export default Options