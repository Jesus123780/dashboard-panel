import { useCounter } from '../../hooks/useState';
import { LocationName } from '../../hooks/useLocationName';
import { Container } from './styled';
import Component from './landing';
import useHover from '../../hooks/useHover';
import { useScrollRotate } from '../../hooks/useScroll';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg'
import { TextAnimation } from '../../animations/TextAnimation';
// import TextHook from '../../hooks/useAnimationText';
import { AnimatedText } from '../../animations/MouseHover';
import { usePosition } from '../../hooks/usePosition';

export const Banner = ({ watch, settings }) => {
    const { state, increase, decrease, reset, changeState } = useCounter(0)
    const [hoverRef, isHovered] = useHover();
    const { position } = useScrollRotate();
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        speed,
        error
    } = usePosition(watch, settings);
    const loader =
    !latitude && !error ? (
        <>
            <div>Trying to fetch location...</div>
            <br />
        </>
    ) : null;
    return (
        <Container>
            <LocationName />
            <TextAnimation />
            {/* <TextHook /> */}
            <AnimatedText textColor="#cd122d" overlayColor="#fdc52c">
                React
            </AnimatedText>
            <>
                {loader}
                <code>
                    latitude: {latitude}
                    <br />
                    longitude: {longitude}
                    <br />
                    timestamp: {timestamp}
                    <br />
                    accuracy: {accuracy && `${ accuracy }m`}
                    <br />
                    speed: {speed}
                    <br />
                    error: {error}
                </code>
            </>
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