import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SFColor, BGColor, PColor, ESFColor, PFont, EColor, SFVColor, SEGColor, APColor } from '../../assets/colors'

const InpDef = ({ width, label, dataIgnore = false, onChange, value, type, name, reference, errorColor, placeholder, margin, border }) => (
    <Container width={width}>
        <Box direction="column" width="100%">
            <Label>{label}</Label>
            <InputTextS border={border} type={type || 'text'} ref={reference} onChange={onChange} value={value || ''} name={name} data-ignore={dataIgnore} placeholder={placeholder} />
            <SpanText color={errorColor ? EColor : ESFColor} fontSize='10px' margin={margin ? margin : '0 5px'}></SpanText>
        </Box>
    </Container>
)
InpDef.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    dataIgnore: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    reference: PropTypes.string,
    errorColor: PropTypes.bool,
    placeholder: PropTypes.string,
    margin: PropTypes.string,
    border: PropTypes.string
}
export default InpDef

// Input Login
export const VInputText = ({ value, type, border, dataIgnore = false, placeholder, margin, name, onChange, onBlur, width, radius, bgColor, disabled, padding, reference, errorColor, label }) => (
    <Box width='100%' direction='column'>
        <InputTextS value={value || ''} ref={reference} margin={margin} padding={padding} border={border} name={name} type={type} disabled={disabled}
            width={width} onChange={onChange} onBlur={onBlur} bgColor={bgColor} radius={radius} data-ignore={dataIgnore} placeholder={placeholder} />
        <SpanText color={errorColor ? errorColor : ESFColor} fontSize='10px' margin='0 5px'></SpanText>
        {label &&
                <LabelInput value={!!value}>{label}</LabelInput>
        }
    </Box>
)

VInputText.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    border: PropTypes.string,
    dataIgnore: PropTypes.bool,
    placeholder: PropTypes.string,
    margin: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    width: PropTypes.string,
    radius: PropTypes.string,
    bgColor: PropTypes.string,
    disabled: PropTypes.bool,
    padding: PropTypes.string,
    reference: PropTypes.string,
    errorColor: PropTypes.bool,
    label: PropTypes.string
}

export const InputMain = ({ label, children }) => (
    <ContainerInput margin='0px 30px 0px 30px'>
        <ContainerLabel>
            { label }
            {children}
        </ContainerLabel>
        <VInputText height='100%' bgColor='transparent' padding='none' border='none'/>
    </ContainerInput>
)

export const Input = ({ type, reference, title, value, border, onChange, name, disabled, onBlur, dataIgnore = false, size, width, minWidth, margin, radius, widthD, marginD }) => (
    <BoxInput width={widthD} margin={marginD} >
        <InputV type={type} ref={reference} value={value || ''}border={ border } onChange={onChange} name={name} disabled={disabled} onBlur={onBlur} data-ignore={dataIgnore} size={size} margin={margin} width={width} minWidth={minWidth} radius={radius} />
        <LabelInput value={value}>{title}</LabelInput>
        <Tooltip color={ PColor }/>
        <div size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 5, opacity: 0 }} />
    </BoxInput>
)

export const InputFile = ({ accept, value, fileName, active, label, multiple, dataIgnore = false, name, onChange, onBlur, width, height, margin, border, radius, fontSize, padding, justify, image, src }) => (
    <BoxFile width={width} height={height} margin={margin} border={border} radius={radius} padding={padding} justify={justify}>
        {image && <Image src={src} />}
        <File color={active} isValue={fileName}>{label}</File>
        <SpanName>{fileName}</SpanName>
        <FileInput type='file' accept={accept} multiple={multiple} name={name} value={value} onChange={onChange} onBlur={onBlur} data-ignore={dataIgnore} fontSize={fontSize} />
    </BoxFile>
)

InputFile.propTypes = {
    accept: PropTypes.string,
    value: PropTypes.string,
    fileName: PropTypes.string,
    active: PropTypes.bool,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    dataIgnore: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    border: PropTypes.string,
    radius: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
    justify: PropTypes.string,
    image: PropTypes.bool,
    src: PropTypes.string
}

const BoxInput = styled.div`
    position: relative;
    margin: ${ ({ margin }) => margin ? margin : '5px 0' };
    width: ${ ({ width }) => width ? width : '100%' };
`
const Tooltip = styled.div`
    position: absolute;
    display: none;
    right: 5px;
    bottom: 120%;
    opacity: 0;
    border: 1px solid ${ PColor };
    background-color: #FBCACA;
    padding: 0 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 11px;
    color: ${ PColor };
    &::after, &::before {
        top: 100%;
        left: 90%;
        border: solid transparent;
        content: "";
        position: absolute;
        pointer-events: none;
    }
    &::after {
        border-top-color: #FBCACA;
        border-width: 4px;
    }
    &::before {
        border-top-color: ${ PColor };
        border-width: 5px;
        margin-left: -1px;
    }
`
const LabelInput = styled.label`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value }) => value ? PColor : SFVColor };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`

const InputV = styled.input`
    padding: 10px;
    color: ${ SFColor };
    outline: 0;
    font-size: ${ ({ size }) => size ? size : '13px' };
    border: ${ ({ border }) => border ? border : 'none' };
    width: ${ ({ width }) => width ? width : '100%' };
    min-width: ${ ({ minWidth }) => minWidth ? minWidth : '200px' };
    border-radius: ${ ({ radius }) => radius ? radius : '8px' };
    font-weight: 600;
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 11px;
    }
    &:focus { border: 1px solid ${ SEGColor }; }
    &:hover ~ ${ Tooltip } { display: block; }
`
const Container = styled.div`
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: ${ ({ width }) => width ? width : '120px' };
    min-width: min-content;
`
const Box = styled.div`
    display: flex;
    ${ ({ width }) => width && css`width: ${ width };` }
    flex-direction: ${ ({ direction }) => direction ? direction : 'row' };
    position: relative;
    /* align-items: center; */
`
const Label = styled.label`
    flex: fit-content;
    font-size: 12px;
    font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
    padding-right: 15px;
    color: ${ SFColor };
`
// const Description = styled.span`
//     display: block;
//     padding: 5px 2px;
//     font-size: 12px;
//     color: ${SFColor};
//     font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
// `
{/** Text info or span */}
const SpanText = styled.span`
    font-family: ${ PFont };
    color: ${ ({ color }) => color ? color : PFont };
    display: inline;
    font-size: ${ ({ fontSize }) => fontSize ? fontSize : '12px' };
    margin: ${ ({ margin }) => margin && margin };
`
export const InputTextS = styled.input`
    border-radius: ${ ({ radius }) => radius ? radius : '4px' };
    border: ${ ({ border }) => border ? border : `1px solid ${ SFVColor }` };
    color: ${ SFColor };
    padding:  ${ ({ padding }) => padding ? padding : '8px' };
    outline: 0;
    width: ${ ({ width }) => width ? width : '100%' };
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` }
    font-size: 14px;
    top: ${ ({ top }) => top };
    left: ${ ({ left })=> left };
    right: ${ ({ right })=> right };
    bottom: ${ ({ bottom })=> bottom };
    opacity: ${ ({ opacity })=> opacity };
    height: ${ ({ height })=> height };
    &:disabled {background-color: ${ BGColor }F0;}
    &:focus {border: 1px solid ${ PColor };}
    &:focus ~ ${ Label } {
        top: -15px;
        font-size: 12px;
        left: 1px;
        border-radius: 0 8px 0 0;
        color: ${ BGColor };
    }
`

const BoxFile = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding: ${ ({ padding }) => padding || '6px' };
    margin: ${ ({ margin }) => margin || '7px 0' };
    border-radius: ${ ({ radius }) => radius || '8px' };
    width: ${ ({ width }) => width || '100%' };
    ${ ({ justify }) => justify && css`justify-content: ${ justify };` }
    ${ ({ height }) => height && css`height: ${ height };` }
`
const File = styled.span`
	text-align: center;
    color: ${ ({ color }) => color || APColor };
    transition: .3s;
    pointer-events: none;
    text-align: center;
    width: 100%;    
`
const FileInput = styled.input`
	width: 100%;
	height: 100%;
	opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    :hover {
        cursor: pointer;
    }
`
const SpanName = styled.span`
    color: ${ SFColor };
    pointer-events: none;
    font-weight: 600;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const Image = styled.img`
    height: 100%;
    width: 100%;
    position: absolute;
`
export const ContainerInput = styled.div`
    flex-direction:row;
    display: flex;
    border: 1px solid #ccc;
    align-items:center;
    border-radius:10px;
    height:40px;
    align-items: center;
    margin: ${ ({ margin }) => margin ? margin : '0' };
`
const ContainerLabel = styled.h5`
    height: 100%;
    width: 150px;
    text-align-last: center;
    border-right:1px solid #ccc;
    padding-top: 10px;
    justify-content: center;
    color: ${ PColor };
    font-size:  12px;
    margin: auto;
`