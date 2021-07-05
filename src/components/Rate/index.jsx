import React, { useMemo, useState } from 'react';
import { ContentIcon } from './styled';
import { IconRate } from '../../assets/icons/icons'
export const Rate = ({ count, rating, color, onRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = index => {
        if (hoverRating >= index) {
            return color?.filled;
        } else if (!hoverRating && rating >= index) {
            return color?.filled;
        }

        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return (<ContentIcon>
            {Array(count)
                .fill(0)
                .map((_, i) => i + 1)
                .map(idx => (
                    <div
                        key={idx}
                        icon="star"
                        onClick={() => onRating(idx)}
                        onMouseEnter={() => setHoverRating(idx)}
                        onMouseLeave={() => setHoverRating(0)}
                    ><IconRate color={getColor(idx)} size={30} />
                    </div>
                ))}
        </ContentIcon>
        )
    }, [count, rating, hoverRating]);

    return <div>{starRating}</div>;
};

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: '#f5eb3b',
        unfilled: '#DCDCDC',
    },
};