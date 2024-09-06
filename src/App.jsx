import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
    const [diceArray, setDiceArray] = React.useState(allnNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    const appRef = React.useRef(null);
    const [appWidth, setAppWidth] = React.useState(0);

    React.useEffect(() => {
        if (appRef.current) {
            setAppWidth(appRef.current.offsetWidth);
        }
    }, []);

    React.useEffect(() => {
        const isTenzies = diceArray.every(die =>
             die.value === diceArray[0].value && die.isHeld
        )
        if (isTenzies) {
            setTenzies(true)
        }
    }, [diceArray])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allnNewDice() {
        const array = []
        for (let i = 0; i < 10; i++) {
            array.push(generateNewDie())
        }
        return array
    }

    function roll() {
        if(tenzies) {
            setDiceArray(allnNewDice())
            setTenzies(false)
        } else {
            setDiceArray(diceArray.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }
    }

    function holdDice(id) {
        setDiceArray(diceArray.map((die) => {
            if (die.id === id) {
                return {
                    ...die,
                    isHeld: !die.isHeld
                }
            }
            return die
        }))
    }

    const diceElements = diceArray.map((die) => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={() => holdDice(die.id)} />
    ))

    return (
        <main ref={appRef}>
            {tenzies && <Confetti width={appWidth} />}
            <section>
                <h1>Tenzies Game</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </section>
            <div className="container-dies">
                {diceElements}
            </div>
            <button className='roll-btn' onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}

export default App
