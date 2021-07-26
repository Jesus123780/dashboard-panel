import React, { useEffect, useRef, useState } from 'react';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, Image, Ruta, PortalModal, BtnClose } from './styled';
import { IconArrowLeft, IconArrowRight } from '../../../../assets/icons/icons'
import { PColor } from '../../../../assets/colors';
import ReactDOM from 'react-dom'

export const CustomSlider = props => {
    const { state, dispatch, duration, autoPlayTime, modal, setModal } = props
    const div = useRef();
    const [activeArrow, setActiveArrow] = useState({})
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state?.currentIndex < state?.data?.length - 1) {
                dispatch({ type: 'NEXT' });
            } else {
                dispatch({ type: 'RESET' });
            }
        }, autoPlayTime);
        return () => clearTimeout(timer);
    }, [state]);
    return (
        <>
            {ReactDOM.createPortal(<PortalModal>
                <BtnClose onClick={() => setModal(!modal) }></BtnClose>
                <SliderContainer modal={modal} onMouseOut={() => setActiveArrow(true)} onMouseOver={() => setActiveArrow(false)}>
                    <SliderWrapper
                    // 500ms
                        style={{
                            transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
                            transition: `transform ${ duration } ease 0s`,
                        }}
                    >
                        { state?.data && state?.data?.map((i, index) => {
                            return (
                                <Slide
                                    div={div}
                                    key={i.id}
                                    last={index === state?.data?.length - 1}
                                    index={index}
                                    item={i}
                                    dispatch={dispatch}
                                />
                            );
                        })}
                    </SliderWrapper>
                    <Navigation>
                        {state.data && state.data.map((i, index) => {
                            return (
                                <NavigationItem
                                    active={index === state?.currentIndex}
                                    onClick={() => dispatch({ type: 'GOTO', index })} key={`nav${ i.id }`}>
                                </NavigationItem>
                            );
                        })}
                    </Navigation>
                    <div>
                        <ControlLeft display={activeArrow} onClick={() => state?.currentIndex > 1 && dispatch({ type: 'PREV' })}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
                        <ControlRight display={activeArrow} onClick={() => state?.currentIndex < state?.data?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
                    </div>
                </SliderContainer>
            </PortalModal>, document.querySelector('#portal')
            )}
        </>
    );
};

const Slide = ({ item, div }) => {
    return (
        <Ruta>
            <SliderItem ref={div} >
                <Image src={item?.image} alt={item?.image} />
            </SliderItem>
        </Ruta>
    );
};