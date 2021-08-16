import { useCounter } from '../../hooks/useState';
import { LocationName } from '../../hooks/useLocationName';
import { Container } from './styled';
import Component from './landing';
import useHover from '../../hooks/useHover';
import { useScrollRotate } from '../../hooks/useScroll';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg'

export const Banner = () => {
    const { state, increase, decrease, reset, changeState } = useCounter(0)
    const [hoverRef, isHovered] = useHover();
    const { position } = useScrollRotate();

    return (
        <Container>
            <LocationName />
            <div>
                <Logo className='Logo' style={{ transform: `rotate(${ position }deg)` }} />
                <p>Scroll position {position}</p>
            </div>
            <i>{state}</i>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <button onClick={reset}>Reset</button>
            <button onClick={changeState}>Animaciones</button>
            {state && <i>Animacion</i>}
            <Component />
            <Component />
            <Component />
            <Component />
            <Component />
            <div
                ref={hoverRef}
                style={{
                    color: 'white',
                    padding: '8rem',
                    width: '12rem',
                    textAlign: 'center',
                    fontSize: '5rem',
                    backgroundColor: isHovered ? '#00e3e3' : '#ccc'
                }}
            >
                {isHovered ? '😁' : '☹️'}
            </div>
        </Container>
    )
}