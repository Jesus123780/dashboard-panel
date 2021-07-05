import React, { useState, useEffect, useCallback } from 'react'
import { Container, Wrapper, Modal, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter, BtnCancel, BtnConfirm } from './styled'
import { MODAL_SIZES, BUTTONS_TEXT } from './constanst'
import PropTypes from 'prop-types'

export const AwesomeModal = ({
    title,
    padding,
    size = MODAL_SIZES.medium,
    show,
    backdrop = true,
    keyboard = true,
    footer = true,
    btnCancel = true,
    btnConfirm = true,
    children,
    hideOnConfirm = true,
    timeOut = 200,
    height,
    submit = false,
    header = true,
    closeIcon = false,
    borderRadius = '.3rem',
    onHide = () => undefined,
    onCancel = () => undefined,
    onConfirm = () => undefined
}) => {
    const [state, setState] = useState(show)
    const hide = useCallback(() => {
        setState(false)
        onCancel()
        setTimeout(onHide, timeOut)
    }, [onCancel, onHide, timeOut])
    useEffect(() => {
        if (keyboard && show) window.addEventListener('keydown', e => e.code === 'Escape' && hide())
        return () => keyboard && window.removeEventListener('keydown', () => { })
    }, [keyboard, hide, show])
    useEffect(() => {
        setState(show)
    }, [show])
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [show])
    const onBackdropHide = e => {
        e.preventDefault()
        if (backdrop === 'static') return 0
        hide()
    }
    const clickCancel = () => {
        hide()
        onCancel()
    }
    const clickConfirm = () => {
        if (hideOnConfirm) hide()
        onConfirm()
    }
    return (
        <Container show={show} state={state} onMouseDown={onBackdropHide}>
            <Wrapper onMouseDown={onBackdropHide}>
                <Modal borderRadius={borderRadius} show={show} state={state} size={size} onMouseDown={e => e.stopPropagation()} >
                    {header && <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <BtnClose onClick={hide}></BtnClose>
                    </ModalHeader>}
                    {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
                    <ModalBody padding={padding} height={height}>
                        {children}
                    </ModalBody>
                    {footer && <ModalFooter>
                        {btnCancel && <BtnCancel type='button' onClick={clickCancel}>{BUTTONS_TEXT.cancel}</BtnCancel>}
                        {btnConfirm && <BtnConfirm type={submit ? 'submit' : 'button'} onClick={clickConfirm}>{BUTTONS_TEXT.confirm}</BtnConfirm>}
                    </ModalFooter>}
                </Modal>
            </Wrapper>
        </Container>
    )
}

AwesomeModal.propTypes = {
    title: PropTypes.node,
    size: PropTypes.string,
    show: PropTypes.bool,
    backdrop: PropTypes.bool,
    keyboard: PropTypes.bool,
    footer: PropTypes.bool,
    btnCancel: PropTypes.bool,
    btnConfirm: PropTypes.bool,
    children: PropTypes.object,
    hiddeOnConfirm: PropTypes.bool,
    timeOut: PropTypes.number,
    height: PropTypes.string,
    header: PropTypes.bool,
    submit: PropTypes.bool,
    onHidde: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,

    hideOnConfirm: PropTypes.func,
    closeIcon: PropTypes.func,
    borderRadius: PropTypes.func,
    onHide: PropTypes.func,
}