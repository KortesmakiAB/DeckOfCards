import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [deck, setDeck] = useState([]);
    const [cardsRemaining, setCardsRemaining] = useState(true);
    const [isDrawing, setIsDrawing] = useState(false);
    const timerId = useRef(null);
    

    useEffect(() => {
        
        (async () => {
            try {
                const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                setDeckId(resp.data.deck_id);
            } catch (error) {
                console.log("Error:",error)
            }
        })();
        
    }, []);

    useEffect(() => {
        
        if (isDrawing) {
            timerId.current = setInterval(async () => {
                
                try {
                    const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                
                    if (!resp.data.remaining) {
                        setCardsRemaining(false);
                        clearInterval(timerId.current);
                        alert ('Error: no cards remaining!')
                    }
        
                    else setDeck(d => [...d, resp.data.cards[0]]);

                } catch (error) {
                    console.log('Error:', error)
                }
                
            }, 500);
        }
        
        // cleanup
        return () => clearInterval(timerId.current);
        
    }, [isDrawing, deckId]);
    
    const handleClick = () => setIsDrawing(isDrawing =>!isDrawing);

    return (
        <div className="Deck">
            { cardsRemaining && <button onClick={ handleClick }>{ !isDrawing ? 'Start' : 'Stop' } Drawing</button>}
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