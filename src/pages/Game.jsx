import {useEffect, useState} from 'react';
import GuessCard from '../components/GuessCard';
import TextField from '@mui/material/TextField';
import { Box, Typography, Avatar } from '@mui/material'


//import AutoInput from '../components/autocomplete'
import Autocomplete from '@mui/material/Autocomplete';

import Navbar from '../components/Navbar';
import Style from './Game.module.css';

function Game() {
    const [vtubers, setVtubers] = useState([]);
    const [vtuberGuess, setVtuberGuess] = useState(null);
    const [playerGuess, setPlayerGuess] = useState('');
    const [allGuesses, setAllGuesses] = useState([]);
    const [victory, setVictory] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const options = vtubers.map((vtuber) => ({
        name: vtuber.first_name,
        image: vtuber.image
    }));

    useEffect(() => {
        const fetchVtubers = async () => {
            try {
                const response = await fetch('http://localhost:3000/vtubers', { mode: 'cors' });
                if (!response.ok) {
                    throw new Error('Issue with network response');
                }
                const data = await response.json();
                setVtubers(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchVtubers();
    }, []);

    useEffect(() => {
        setVtuberGuess(vtubers[Math.floor(vtubers.length*Math.random())]);
    }, [vtubers]);

    const handleVictory = () => {
        setVictory(!victory);
    };

    const handleVtuberGuess = () => {
        setVtuberGuess(vtubers[Math.floor(vtubers.length*Math.random())]);
    };

    const handleSubmit = (e)  => {
        e.preventDefault();
        setPlayerGuess('');
        
        const attemptGuess = playerGuess.toLowerCase();
        if (attemptGuess === vtuberGuess.first_name.toLowerCase()) {
            handleVictory();
        }
        if (allGuesses.find((guess) => guess.first_name.toLowerCase() === attemptGuess)) {
            alert("Already guessed this Vtuber!");
            return;
        }
        const guessedVtuber = vtubers.find((vtuber) => vtuber.first_name.toLowerCase() === attemptGuess);
        if (guessedVtuber) {
            setAllGuesses(prevGuesses => [...prevGuesses, guessedVtuber])
            console.log(victory);
        } else {
            alert("Vtuber does not exist");
        }
    }

    const newGame = () => {
        handleVictory();
        setAllGuesses([]);
        handleVtuberGuess();
    }

    

    if(isLoading) {
        return <h1 id={Style.loading}>Loading...</h1>
    }

    return (
        <>
            <Navbar />
            <div id={Style.main}>
                <div>
                    <form id={Style.guess} onSubmit={handleSubmit}>
                        <h2>Guess the Vtuber</h2>
                        <div>
                        <Autocomplete
                            disablePortal
                            options={options}
                            onChange={(event,value) => setPlayerGuess(value?.name || '')}
                            inputValue={playerGuess}
                            onInputChange={(event, newInputValue) => {
                                setPlayerGuess(newInputValue)
                            }}
                            autoHighlight={true}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Vtubers" />}
                            renderOption={(props, option) => (
                            <Box
                                component="li"
                                sx={{ display: 'flex', alignItems: 'center', gap: 2, width: "500px" }}
                                {...props}
                            >
                                <Avatar
                                alt={option.name}
                                src={option.image} 
                                />
                                <Typography variant="body1">{option.name}</Typography>
                            </Box>
                            )}
                            getOptionLabel={(option) => option.name}
                            filterOptions={(options, { inputValue }) =>
                                    options.filter(option =>
                                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                }
                        />
                        
                            {victory ? null : <button type='submit'>Enter</button>}
                        </div>
                    </form>
                </div>
                {victory ? null :  <h2>{allGuesses.length != 0 ? 'Guess Again!' : null}</h2>}
                {victory ? <div id={Style.victory}>
                    <h2>Victory!</h2>
                    <button onClick={newGame}>Play again</button>
                </div> : null }
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
        </>
    )
}

export default Game