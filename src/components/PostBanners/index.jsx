import React from 'react'
import { Text, Content } from './styled'

export const PostBanner = props => {

    return (
        <>
            {props.loading && <Loading />}
            <Content>
                <Text>Aqui se publicaran los banners</Text>
            </Content>
        </>
    )
}