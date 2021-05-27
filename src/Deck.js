import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [deck, setDeck] = useState([]);
    const [cardsRemaining, setCardsRemaining] = useState(true);
    

    useEffect(() => {
        
        try {
            (async () => {
                const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                setDeckId(resp.data.deck_id);
            })();
        } catch (error) {
            console.log("Error1")
            console.error("error",error)
        }
        
    }, [])

    const handleClick = () => {
       
        try {
            (async () => {
                const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                
                if (!resp.data.remaining) {
                    setCardsRemaining(false);
                    alert('Error: no cards remaining!')
                }

                setDeck(() => [...deck, resp.data.cards[0]]);
            })()
        } catch (error) {
            return error;
        }
    }

    return (
        <div className="Deck">
            { cardsRemaining && <button onClick={ handleClick }>GIMME A CARD!</button>}
            <div>
                { deck.map(({ code, image, value, suit }) => 
                    <Card
                    key={code}
                    imgUrl={image}
                    cardVal={`${value} of ${suit}`}
                    />
                ) }
            </div>
        </div>
    );
};

export default Deck;