import React, { useState } from 'react'
import { HeaderC } from '../HeaderStore'
import { Footer } from '../Footer'
import { CustomSlider } from './CustomSlider'

export const Index = () => {
    const [state, dispatch] = useState({
        currentIndex: 0,
        data: [
            { id: 1, name: 'Slide 1' },
            { id: 2, name: 'Slide 2' },
        ]
    })
    return (
        <>
            <HeaderC />
            <main>
                <CustomSlider state={state} dispatch={dispatch} keySwiper={`itemsVendors-${ state.data.length }`}>
                </CustomSlider>
            </main>
            <Footer />
        </>
    )
}