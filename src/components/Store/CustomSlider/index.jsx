import React, { useState, useEffect, useReducer } from 'react';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight } from './styled';

export const CustomSlider = () => {
    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        });
        return width;
    }
    const width = useWindowWidth();
    function reducer(state, action) {
        switch (action.type) {
        case 'NEXT':
            return {
                ...state,
                currentIndex: state.currentIndex + (1 % state.data.length)
            };
        case 'PREV':
            return {
                ...state,
                currentIndex: state.currentIndex - (1 % state.data.length)
            };
        case 'GOTO':
            return {
                ...state,
                currentIndex: action.index
            };
        case 'RESET':
            return { currentIndex: 0, currentPosition: 0 };

        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        currentIndex: 0,
        data: [
            { id: 1, name: 'Slide 1' },
            { id: 2, name: 'Slide 2' },
            { id: 3, name: 'Slide 3' },
            { id: 4, name: 'Slide 4' },
            { id: 5, name: 'Slide 5' },
        ]
    }
    );
    return (
        <div>
            <SliderContainer className={'slider-instance'}>
                <SliderWrapper width={width * state.data.length}
                    style={{
                        transform: `translateX(${ -(state.currentIndex * width) }px)`,
                        transition: 'transform ease-out .5s',
                        width: `${ width * state.data.length }px`
                    }}
                >
                    {state.data.map((i, index) => {
                        return (
                            <Slide
                                key={i.id}
                                last={index === state.data.length - 1}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                                snap={state.snap}
                                width={width}
                            />
                        );
                    })}
                </SliderWrapper>
                <Navigation>
                    {state.data.map((i, index) => {
                        return (
                            <NavigationItem
                                active={index === state.currentIndex}
                                onClick={() => dispatch({ type: 'GOTO', index })} key={`nav${ i.id }`}>
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    {state.currentIndex > 0 ? (
                        <ControlLeft onClick={() => dispatch({ type: 'PREV' })}>sdf</ControlLeft>
                    ) : (
                        <ControlRight onClick={() => dispatch({ type: 'NEXT' })}>sdf</ControlRight>
                    )}
                    {state.currentIndex < state.data.length - 1 ? (
                        <ControlRight onClick={() => dispatch({ type: 'NEXT' })}>dsf</ControlRight>
                    ) : (
                        <ControlLeft onClick={() => dispatch({ type: 'PREV' })}>fds</ControlLeft>
                    )}
                </div>
            </SliderContainer>
        </div>
    );
};

const Slide = ({ item, width }) => {
    return (
        <SliderItem width={width}>
            <div >{item.name}</div>
        </SliderItem>
    );
};