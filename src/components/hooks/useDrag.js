import { useState } from 'react';

export const useDrag = (x, y) => {
    const [move, setMove] = useState(false);
    const [moveTo, setMoveTo] = useState([x, y]);
    const moveIcon = e => {
        const xcoord = moveTo[0] + e.movementX;
        const ycoord = moveTo[1] + e.movementY;
        setMoveTo([xcoord, ycoord]);
    };
    const handleMove = e => {
        move && moveIcon(e);
    };
    const handelDown = () => {
        setMove(true);
    };
    const handelUp = () => {
        setMove(false);
    };

    return { move, moveTo, handelDown, handelUp, handleMove };
};