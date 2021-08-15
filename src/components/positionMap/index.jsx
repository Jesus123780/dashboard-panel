// TODO: get better x, y co-ordinates for multi-screen support

import React, { useState } from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { DropdownMenu } from '../dropdown-menu';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const ChildWrapper = styled.div`
  position: absolute;
  ${ props => props.pin &&
    props.pin.type === 'type1' &&
    css`
      border: 1px solid blue;
    ` };
  ${ props => props.pin &&
    props.pin.x &&
    css`
      left: ${ props.pin.x }%;
    ` };
  ${ props => props.pin &&
    props.pin.y &&
    css`
      top: ${ props.pin.y }%;
    ` };
`;

const Child = ({ pin, id, removePin, wrapperRef }) => (
    // console.log(value, wrapperRef),
    <ChildWrapper ref={wrapperRef} pin={pin}>
        {pin.type === '' && (
            <div onClick={e => { e.stopPropagation(); }} > Hola
            </div>
        )}
        <button
            onClick={e => {
                e.stopPropagation();
                removePin(id);
            }}
        >
      X
        </button>
    </ChildWrapper>
);

export const ContextMenu = () => {
    const [pins, setPins] = useState([])
    const wrapperRef = useRef(null)
    // eslint-disable-next-line
  const removePin = id => {
        const x = pins?.pins.filter((pin, index) => index !== id)
        setPins(x);
    }
    const [positionMenu, setPositionMenu] = useState({}) // Posición del menú crear carpeta
    const [visibleMenu, setVisibleMenu] = useState(false) // Visibilidad del menú
    const handleMenu = e => {
        e.preventDefault()
        e.stopPropagation()
        setPositionMenu({ x: e.pageX, y: e.pageY })
        setVisibleMenu(true)
    }
    // eslint-disable-next-line
    console.log(handleMenu)
    return (
        <div>
            <Wrapper
                style={{ width: '100%', height: '700px', backgroundColor: 'red', position: 'relative' }}
                onClick={e => {
                    const x = ((e.pageX - e.target.offsetLeft - 10) / wrapperRef?.current?.clientWidth) * 100;
                    const y = ((e.pageY - e.target.offsetTop - 10) / wrapperRef?.current?.clientHeight) * 100;
                    // console.log(x, y),
                    // console.log(wrapperRef?.current)
                    setPins({ pins: pins && pins.filter(pin => pin.type !== '').concat({ x, y, type: '' }) });
                }}
                innerRef={el => (wrapperRef.current = el)}
            >
                {pins?.pins?.map((pin, index) => (
                    <Child
                        wrapperRef={wrapperRef}
                        key={index}
                        id={index}
                        pin={pin}
                        removePin={removePin}
                    />
                ))}
                {/* <button onClick={handleMenu}>CLICK</button> */}
            </Wrapper>
            <div>
                <DropdownMenu show={visibleMenu} position={positionMenu} onClickOutside={() => setVisibleMenu(false)} options={[
                // eslint-disable-next-line
                    { optionName: 'Nueva carpeta', action: () => alert('true'), },
                ]} />

            </div>
        </div>
    );
}