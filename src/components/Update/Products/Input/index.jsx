import React from 'react'
import { BoxInput, Input, LabelInput } from './styled';

export const InputHook = props => {
    const { name, value, onChange, label } = props
    return (
        <>
            <BoxInput>
                <Input name={name}
                    value={value}
                    onChange={onChange}
                />
                <LabelInput >{label}</LabelInput>
            </BoxInput>
        </>
    )
}