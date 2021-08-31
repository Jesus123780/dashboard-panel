import React from 'react';
import './App.css';
import { useDrag } from '../hooks/useDrag';
import styled from 'styled-components';

export const Drag2 = () => {
    const ref = React.useRef(null);
    useDrag(ref);
    return (
        <div className="wrapper">
            <div className="inner" ref={ref}>sdfasdfasf</div>
        </div>
    );
};

export function Drag() {
    const { move, moveTo, handelDown, handelUp, handleMove } = useDrag(0, 0);

    return (
        <Wrapper>
            <Icon
                onMouseDown={handelDown}
                onMouseUp={handelUp}
                onMouseMove={handleMove}
                x={moveTo[0]}
                y={moveTo[1]}
                style={{
                    transform: `translateY(${ moveTo[0] }px) translateY(${ moveTo[1] }px)`
                }}
            >o
            </Icon>
            {move ? <h2>dragging mode</h2> : <h2>click icon to drag</h2>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  background-color: #282c34;
  height: 100%;
  overflow: hidden;
  position: relative;
  h2 {
    margin: 5rem 0;
  }
`;
const Icon = styled.div.attrs(props => {
    return {
        style: { transform: `translate(${ props.x }px , ${ props.y }px)` }
    };
})`
    font-size: 300px;
    color: #ffffff;
    margin: 7rem 0;
    user-select: none;
    height: fit-content;
    background: #61dafb;
    width: fit-content;
    margin: 0px;
    padding: 0px;
`;