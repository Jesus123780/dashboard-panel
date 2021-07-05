import styled, { css } from 'styled-components';

export const SliderContainer = styled.div`
  position: relative;
  background: #fafafa;
  overflow: hidden;
  width: 100%;
  height: ${ props => props.height || '50px' };
`;

export const SliderWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const SliderItem = styled.div`
  position: relative;
  height: auto;
  width: ${ props => `${ props.width }px` || '100%' };
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Navigation = styled.ul`
  position: absolute;
  bottom: 10px;
  margin: 0;
  padding: 0;
  left: 0;
  display: flex;
`;

export const NavigationItem = styled.li`
font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 5px;
    padding: 0;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    margin-left: 8px;
    background-color: #C0C0C0;

  ${ props => props.active &&
    css`
        background-color: #0de0fe;
    ` };
`;

export const Control = styled.button`
    position: absolute;
    top: 50%;
    display: flex;
    align-items:center;
    display: block;
    width: 40px;
    height: 40px;
    padding: 0;
    transform: translate(0, -50%);
    box-shadow: 1px 6px 14px rgb(0 0 0 / 20%);
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    outline: none;
    justify-content: center;
    display: flex;
    &:hover{
        background-color: #060707;
        color: #fff;
        opacity: 1;
    }
    &:disabled{
        opacity: 59%;
        background-color:#b4b4b4;
    }
`;

export const ControlLeft = styled(Control)`
  left: 0;
`;
export const ControlRight = styled(Control)`
  right: 0;
`;

export const BigElement = styled.div`
  min-height: 1000px;
  background: #61dafb;
  width: 30px;
`;