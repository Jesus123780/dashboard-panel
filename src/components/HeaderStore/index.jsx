import React from 'react'
import { Link } from 'react-router-dom'
import { PColor } from '../../assets/colors'
import InputHooksSearcher from '../InputHooksSearcher/InputHooks'
import { IconLogo } from '../../assets/icons/icons'
import { CartShop } from '../CartShop'
import useScrollHook, { useScrollColor, useScrollY } from '../hooks/useScroll'
import { HeaderContent, Content, Time, Timer, UseSize, AdicionalComponent, Text } from './styled'
import { LoadEllipsis } from '../LoadingButton'

export const Header = ({ keyTheme, handleTheme, auth, error, time, size, loading, results, search }) => {
    if (error) return <>Error</>
    const style = useScrollHook();
    const { offsetY } = useScrollY();
    const { scrollNav } = useScrollColor();
    const customTime = new Date();
    const customHours = customTime.getHours();
    let displayMessage;
    const customColor = {
        color: ''
    };
    if (customHours < 12) {
        displayMessage = `Good Morning ${ auth?.auth?.Uname }`;
        customColor.color = 'red';
    } else if (customHours >= 12 && customHours < 18) {
        displayMessage = `Good Afternoon ${ auth?.auth?.Uname }`;
        customColor.color = 'green';
    } else {
        displayMessage = `Good Night ${ auth?.auth?.Uname }`;
        customColor.color = '#090c10';
    }
    return (
        <>
            {auth &&
                <HeaderContent scrollNav={scrollNav} style={style} >
                    <Content >
                        <div style={{ transform: `translateX(${ offsetY * 0.8 }px)` }} >
                            <Link to='/'>
                                <IconLogo size='80px' color={PColor} />
                            </Link>
                        </div>
                        <div>
                            <InputHooksSearcher title='Busca tus productos' name='search' value={search} onChange={onchange} type='text' range={{ min: 0, max: 20 }} />
                            {loading && <LoadEllipsis />}
                            {results?.map((x, i) => <div key={1+ i}>
                                <TargetUser>
                                    <span>{x?.username}</span>
                                </TargetUser>
                            </div>)}
                        </div>
                        <>
                            <CartShop keyTheme={keyTheme} handleTheme={handleTheme} />
                        </>
                        <AdicionalComponent>
                            <Time>
                                <Timer>
                                    {time}
                                </Timer>
                                <Timer style={customColor}>
                                    {displayMessage}
                                </Timer>
                            </Time>
                            <UseSize>
                                <Text>W:{size.width}px</Text>
                                <Text>H:{size.height}px</Text>
                            </UseSize>
                        </AdicionalComponent>
                    </Content>
                </HeaderContent>
            }
        </>
    )
}