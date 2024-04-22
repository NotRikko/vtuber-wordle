import {useEffect, useState} from 'react'
import GuessCard from '../components/GuessCard'
import Style from './Game.module.css'

function Game() {
    const [vtubers, setVtubers] = useState([
        {
            name: "Shiori",
            company: "Hololive",
            image: "https://static.miraheze.org/hololivewiki/0/03/Shiori_Novella_-_Portrait_01.png",
            gen: "Advent",
            hair_color: "Black White",
            seiso_level: "Seiso",
        },
        {
            name: "Enna",
            company: "Nijisanji",
            image: "https://yt3.googleusercontent.com/MKS8EHgSx1cC75IPUIf0zQefXweMfVpyUQxEQ_emFsTh-LTwODz6jXotb1q-QTrNpvPpf_sSuoM=s900-c-k-c0x00ffffff-no-rj",
            gen: "Advent",
            hair_color: "Silver",
            seiso_level: "Unseiso",
        }
        
    ]);
    const [vtuberGuess, setVtuberGuess] = useState(vtubers[0]);
    const [playerGuess, setPlayerGuess] = useState("");
    const [allGuesses, setAllGuesses] = useState([]);
    const [victory, setVictory] = useState(false)

    const handleGuess = (e) => {
        setPlayerGuess(e.target.value);
    };

    const handleVictory = () => {
        setVictory(!victory);
    };

    const handleVtuberGuess = () => {
        setVtuberGuess(vtubers[Math.floor(vtubers.length*Math.random())]);
    };

    function checkGuess(guess) {
        
    }

    function handleSubmit (e) {
        e.preventDefault();
        const attemptGuess = playerGuess.toLowerCase();
        if (attemptGuess === vtuberGuess.name.toLowerCase()) {
            handleVictory();
        }
        if (allGuesses.find((guess) => guess.name.toLowerCase() === attemptGuess)) {
            alert("Already guessed this Vtuber!");
            return;
        }
        const guessedVtuber = vtubers.find((vtuber) => vtuber.name.toLowerCase() === attemptGuess);
        if (guessedVtuber) {
            setAllGuesses(prevGuesses => [...prevGuesses, guessedVtuber])
            console.log(victory);
        } else {
            alert("Vtuber does not exist");
        }
    }

    return (
        <div id={Style.main}>
            <h1>Wordle Vtuber</h1>
            <div>
                <form id={Style.guess} onSubmit={handleSubmit}>
                    <label>
                        <h2>Guess the Vtuber</h2>
                        <input type="text" value={playerGuess} onChange={handleGuess}></input>
                    </label>
                    <button type="submit">Enter</button>
                </form>
            </div>
            <h2>{victory ? 'Victory!' : 'Guess Again!'}</h2>
            <div id={Style.container}>
                <div id={Style.cardsHeader}>
                    <ul>
                        <li>Results</li>
                        <li>Name</li>
                        <li>Company</li>
                        <li>Gen</li>
                        <li>Hair Color</li>
                        <li>Seiso Meter</li>
                    </ul>
                </div>
                <div className={Style.cards}>
                    {allGuesses.map((guess, index) => {
                        return <GuessCard key={index} guess={guess} correctGuess={vtuberGuess} />
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Game