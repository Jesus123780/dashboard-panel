import styled, { css, keyframes } from 'styled-components'

import { MODAL_SIZES } from './constanst'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const fadeout = keyframes`
    from {
        from: 1;
    }

    to {
        opacity: 0;
    }
`

const fadeInTop = keyframes`
    from {
      opacity: 0;
      top: -10%;
      left: 50%;
      transform: translateY(-10%);
    }
  
    to {
      opacity: 1;
      top: 15%;
      left: 50%;
      transform: translateY(-15%);
    }

`

const fadeOutTop = keyframes`
    from {
        opacity: 1;
        top: 15%;
        left: 50%;
        transform: translateY(-15%);
    }
    to {
      opacity: 0;
      top: 10%;
      left: 50%;
      transform: translateY(-100%);
    }
  

`

export const Container = styled.div`
    display: ${ ({ show, state }) => {
        if (show && state) return 'block'
        else if (show && !state) return 'block'
        else if (!show && !state) return 'none';
    } };
    position: fixed;
    background: rgba(0,0,0,.4);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    opacity: 1;
    ${ ({ show, state }) => {
        if (show && state) return css`animation: ${ fadeIn } .4s linear;`
        else if (show && !state) return css`animation: ${ fadeout } .4s linear;`
    } }
`

export const Wrapper = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 888;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Modal = styled.div`
    background: #fff;
    width: ${ ({ size }) => {
        if (size === MODAL_SIZES.small) return '30%'
        else if (size === MODAL_SIZES.medium) return '60%'
        else if (size === MODAL_SIZES.large) return '90%'
        else return size
    } };
    min-width: 400px;
    max-width: max-content;
    height: auto;
    border-radius: ${ ({ borderRadius }) => borderRadius };
    border: 1px solid rgba(0,0,0,.2);
    z-index: 9999999;
    ${ ({ state }) => state ? css`animation: ${ fadeInTop } .4s forwards;` : css`animation: ${ fadeOutTop } .4s forwards;` }
`

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem .5rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
`

export const ModalTitle = styled.h4`
    margin: 0;
    color: ${ ({ theme })=> theme.PColor };
    text-align: center;
`

export const BtnClose = styled.button`
    ${ ({ fixed }) => fixed && css`
        position: absolute;
        right: 6px;
        top: 6px;
    ` }
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    z-index: 999999;
    color: #898989;
    text-shadow: 0 1px 0 #fff;
    outline: none;
    cursor: pointer;
`

export const ModalBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    padding: ${ ({ padding })=> padding ? padding : '1rem' };
    height: ${ ({ height }) => height ? height : 'auto' };
`

export const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
`

export const BtnConfirm = styled.button`
    outline: 0;
    position: relative;
    overflow: hidden;
    border: none;
    padding: 10px;
    width: 150px;
    font-size: 12px;
    margin: 0 20px;
    background-color: #3460ac;
    color: #FFFFFF;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`

export const BtnCancel = styled.button`
    outline: 0;
    position: relative;
    overflow: hidden;
    border: 1px solid #CCCCCC;
    padding: 10px;
    width: 150px;
    font-size: 12px;
    margin: 0 20px;
    background-color: #F7F7F7;
    color: #393939;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`