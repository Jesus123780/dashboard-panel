import React, { useState } from 'react'
import { Products } from '../../../components/Update/Products'

export const ProductsC = () => {
    const [input, setInput] = useState('');
    const handleChangeName = e => {
        setInput(e.target.value);
    };
    return (
        <Products
            handleChangeName={handleChangeName}
            input={input}
        />
    )
}