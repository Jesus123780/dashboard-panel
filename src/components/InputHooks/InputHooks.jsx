import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BoxInput, InputV, LabelInput, Tooltip } from './styled'
import { isEmail, isNull, isPassword, onlyLetters, passwordConfirm, rangeLength } from '../../utils'

const InputHooks = ({
    reference,
    title,
    disabled,
    onBlur,
    fontSize,
    width,
    minWidth,
    padding,
    radius,
    labelColor,
    type,
    value,
    onChange,
    name,
    required,
    numeric,
    letters,
    range,
    paddingInput,
    email,
    pass,
    passConfirm,
    error
}) => {
    // Declarando el estado
    const [errors, setError] = useState(error)
    const [message, setMessage] = useState('El campo no debe estar vacío')
    // Función para activar el error
    const errorFunc = (e, v, m) => {
        setError(v)
        v && setMessage(m)
        onChange(e, v)
    }
    useEffect(() => {
        setError(error)
    }, [error])
    /**
     * @description Función que para validar los campos de texto por el método onChange
     * @version 0.0.1
     * @param {object} e evento del metodo change
     * @return {boolean} devuleve true o false si la validación es correcta o incorrecta
     *
     */
    const validations = e => {
        // Valida que el campo no sea nulo
        if (required) {
            if (isNull(e.target.value)) { return errorFunc(e, true, 'El campo no debe estar vacío') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea tipo numérico
        if (numeric) {
            if (isNaN(e.target.value)) { return errorFunc(e, true, 'El campo debe ser numérico') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea solo letras
        if (letters) {
            if (onlyLetters(e.target.value)) { return errorFunc(e, true, 'El campo debe contener solo letras') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo esté en el rango correcto
        if (range) {
            if (rangeLength(e.target.value, range.min, range.max)) {
                return errorFunc(
                    e,
                    true,
                    `El rango de carácteres es de ${ range.min } a ${ range.max }`
                )
            }
            else errorFunc(e, false, '')
        }
        // Valida si el campo tiene un formato de email correcto
        if (email) {
            if (isEmail(e.target.value)) { return errorFunc(e, true, 'Formato de correo inválido') }
            else errorFunc(e, false, '')
        }
        // Valida si el campo tiene un formato de contraseña correcto
        if (pass) {
            if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') }
            else errorFunc(e, false, '')
        }
        // Valida que las contraseñas coincidan
        if (passConfirm?.validate) {
            if (passwordConfirm(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') }
            else errorFunc(e, false, '')
        }
    }

    return (
        <BoxInput width={width} padding={padding} minWidth={minWidth}>
            <InputV
                type={type}
                ref={reference}
                value={value || ''}
                onChange={validations}
                data-required={required}
                name={name}
                disabled={disabled}
                onBlur={onBlur}
                size={fontSize}
                radius={radius}
                error={errors}
                autoComplete={type === 'password' ? 'current-password' : 'true'}
                paddingInput={paddingInput}
            />
            <LabelInput value={value} labelColor={labelColor} error={error}>{title}</LabelInput>
            {errors && <Tooltip>{message}</Tooltip>}
            {/* <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} /> */}
        </BoxInput>
    )
}

InputHooks.propTypes = {
    onBlur: PropTypes.func,
    error: PropTypes.func,
    onChange: PropTypes.func,
    minLenght: PropTypes.number,
    maxLenght: PropTypes.number,
    email: PropTypes.bool,
    numeric: PropTypes.bool,
    letters: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    pass: PropTypes.bool,
    passConfirm: PropTypes.object,
    dataIgnore: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    radius: PropTypes.string,
    range: PropTypes.object,
    fontSize: PropTypes.string,
    reference: PropTypes.object,
    minWidth: PropTypes.string || PropTypes.number,
    padding: PropTypes.string || PropTypes.number,
    labelColor: PropTypes.string || PropTypes.number,
    bgColor: PropTypes.string || PropTypes.number,
    value: PropTypes.string || PropTypes.number,
    paddingInput: PropTypes.string || PropTypes.number
}

export default InputHooks