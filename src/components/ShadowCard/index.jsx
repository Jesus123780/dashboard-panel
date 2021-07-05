import React from 'react'
import { HeadCard, ShadowCardContainer } from './styles'

export const ShadowCard = ({ children, title }) => {
    return (
        <ShadowCardContainer>
            <HeadCard>{title}</HeadCard>
            <div>
                {children}
            </div>
        </ShadowCardContainer>
    )
}