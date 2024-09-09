import React from 'react'
import Die from './Die'
import Header from './Header'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
    const [diceArray, setDiceArray] = React.useState(allnNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [time, setTime] = React.useState(0)
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [rolls, setRolls] = React.useState(0)
    const [bestScore, setBestScore] = React.useState({ rolls: Infinity, time: Infinity });

    const appRef = React.useRef(null);
    const [appWidth, setAppWidth] = React.useState(0);

    React.useEffect(() => {
        if (appRef.current) {
            setAppWidth(appRef.current.offsetWidth);
        }
    }, []);

    React.useEffect(() => {
        const storedBestScore = JSON.parse(localStorage.getItem('bestScore'));
        if (storedBestScore) {
            setBestScore(storedBestScore);
        }
    }, []);

    React.useEffect(() => {
        const isTenzies = diceArray.every(die =>
             die.value === diceArray[0].value && die.isHeld
        )
        if (isTenzies) {
            setTenzies(true)
            setTimerStarted(false)

            if (rolls < bestScore.rolls || (rolls === bestScore.rolls && time < bestScore.time)) {
                const newBestScore = { rolls, time };
                setBestScore(newBestScore);
                localStorage.setItem('bestScore', JSON.stringify(newBestScore));
            }
        }
    }, [diceArray, rolls, time, bestScore])

    React.useEffect(() => {
        let timer;
        if (timerStarted && !tenzies) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timerStarted, tenzies]);

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
            setRolls(0)
            setTime(0);
            setTimerStarted(false);
        } else {
            setDiceArray(diceArray.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevRolls => prevRolls + 1)
        }
    }

    function holdDice(id) {
        if (!timerStarted) {
            setTimerStarted(true); // Start the timer when a die is clicked for the first time
        }
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
            <Header rolls={rolls} time={time} bestRolls={bestScore.rolls} bestTime={bestScore.time}/>
            <div className='game-info'>
                <section className='tenzies-info'>
                    <h1>Tenzies Game</h1>
                    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                </section>
                <div className='container-dies'>
                    {diceElements}
                </div>
                <button className='roll-btn' onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </main>
    )
}

export default App
