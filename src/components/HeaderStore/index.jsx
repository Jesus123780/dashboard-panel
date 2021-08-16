import React from 'react'
import { Link } from 'react-router-dom'
// import LogoImage from '../../assets/'
import { PColor } from '../../assets/colors'
// import InputHooksSearcher from '../InputHooksSearcher/InputHooks'
import { IconLogo } from '../../assets/icons/icons'
import { CartShop } from '../CartShop'
import useScrollHook, { useScrollColor, useScrollY } from '../hooks/useScroll'
import { HeaderContent, Content } from './styled'

export const Header = ({ keyTheme, handleTheme, auth, error }) => {

    if (error) return <>Error</>
    const style = useScrollHook();
    const { offsetY } = useScrollY();
    const { scrollNav } = useScrollColor();
    return (
        <>
            {auth &&
                <HeaderContent scrollNav={scrollNav} style={style} >
                    <Content >
                        <div style={{ transform: `translateY(${ offsetY * 0.8 }px)` }}>
                            <Link to='/'>
                                <IconLogo size='80px' color={PColor} />
                            </Link>
                        </div>
                        <div>
                            {/* <ContentInput>
                                <InputHooksSearcher title='Busca tus productos' name='search' value={search} onChange={onchange} type='text' range={{ min: 0, max: 20 }} />
                                {loading && <span>Cargando</span>}
                                <ContainerResults>
                                    {results?.map((x, i) => <div key={1+ i}>
                                        <TargetUser>
                                            <span>{x?.username}</span>
                                        </TargetUser>
                                    </div>)}
                                </ContainerResults>
                            </ContentInput> */}
                        </div>
                        <>
                            <CartShop keyTheme={keyTheme} handleTheme={handleTheme} />
                        </>

                    </Content>
                </HeaderContent>
            }
        </>
    )
}
// const ContainerResults = styled.div `
// position: absolute;
// `