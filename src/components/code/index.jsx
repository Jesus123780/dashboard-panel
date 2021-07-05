import React, { useState } from 'react';
import { Container, Content, Input, Text } from './styled';

export const OTPBox = () => {
    const [otp, setOtp] = useState(new Array(5).fill(''));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    return (
        <>
            <Container>
                <Content>
                    {otp.map((data, index) => {
                        return (
                            <Input
                                placeholder='0'
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}
                </Content>

                <Text>Codigo ingresado {otp.join('')}</Text>
                <button onClick={() => setOtp([...otp.map(() => '')])}>Limpiar</button>
            </Container>
        </>
    );
};