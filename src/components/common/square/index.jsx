// /* eslint-disable no-use-before-define */
import React, { useCallback, useRef } from 'react';
import styles from './Square.module.css';

function Square() {
    const squareRef = useRef(null);
    const handleMouseDown = useCallback(evt => {
        let prevX = evt.clientX;
        let prevY = evt.clientY;
        function mouseMove(e) {
            const newX = prevX - e.clientX;
            const newY = prevY - e.clientY;
            const rect = squareRef.current.getBoundingClientRect();
            squareRef.current.style.left = `${ rect.left - newX }px`;
            squareRef.current.style.top = `${ rect.top - newY }px`;
            prevX = e.clientX;
            prevY = e.clientY;
        }
        function mouseUp() {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            // window.alert(`
            //   Top: ${squareRef.current.style.top}
            //   Left: ${squareRef.current.style.left}
            // `);
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);

    }, []);
    return (
        <div
            className={styles.square}
            ref={squareRef}
            onMouseDown={handleMouseDown}
        />
    );
}

export default Square;