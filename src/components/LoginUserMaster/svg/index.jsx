
import React from 'react'
import { PColor } from '../../../assets/colors'
import { ContentSvg } from '../styled'

export const Svg = () => {
    return (
        <div style={{ position: 'relative' }}>
            <ContentSvg style={{ height: '100vh', zIndex: '1' }}>
                <svg viewBox="0 0 248 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%', zIndex: '99' }} >
                    <linearGradient id="myGradient" y1="0.5" x2="1" y2="0.5" >
                        <stop offset="0.009" stopColor={PColor}/>
                        <stop offset="0.100" stopColor={PColor}/>
                        <stop offset="0.110" stopColor={PColor}/>
                        <stop offset="0.649" stopColor={PColor}/>
                        <stop offset="0.86" stopColor={PColor}/>
                        <stop offset="1" stopColor={PColor}/>
                    </linearGradient>
                    <path d="M114.14,-31.71 C324.64,-22.83 279.49,223.86 23.85,243.58 L0.01,149.99 L0.01,0.01 Z" stroke='none' fill="url('#myGradient')"></path></svg>
            </ContentSvg>
        </div>
    )
}