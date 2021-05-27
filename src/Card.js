import React from 'react';

const Card = ({ imgUrl, cardVal }) => {
    
    return (
        <img alt={ cardVal } src={ imgUrl }></img>
    );
};

export default Card;