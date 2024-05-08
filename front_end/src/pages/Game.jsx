import {useEffect, useState} from 'react';
import GuessCard from '../components/GuessCard';
import TimeLeft from '../components/TimeLeft';
import TextField from '@mui/material/TextField';
import { Box, Typography, Avatar } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import Overlay from '../components/Overlay';
import Style from './Game.module.css';
import { useUser } from '../UserProvder'


function Game() {
    const [vtubers, setVtubers] = useState([]);
    const [dailyVtuber, setDailyVtuber] = useState(null);
    const [playerGuess, setPlayerGuess] = useState('');
    const [allGuesses, setAllGuesses] = useState([]);
    const [victory, setVictory] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [score, setScore] = useState(0);
    const { user, setUser } = useUser();

    const options = vtubers.map((vtuber) => ({
        name: vtuber.first_name,
        image: vtuber.image
    }));

    useEffect(() => {

    })

    const fetchData = async () => {
        try {
            const [vtubersResponse, dailyVtuberResponse] = await Promise.all([
                fetch('http://localhost:3000/vtubers', { mode: 'cors' }),
                fetch('http://localhost:3000/vtubers/daily_vtuber', { mode: 'cors' })
            ]);

            if (!vtubersResponse.ok || !dailyVtuberResponse.ok) {
                throw new Error('Issue with network response');
            }

            const vtubersData = await vtubersResponse.json();
            const dailyVtuberData = await dailyVtuberResponse.json();

            setVtubers(vtubersData);
            setDailyVtuber(dailyVtuberData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 
 
   
    const handleVictory = async () => {
        const updatedScore = score + 1;
        setScore(updatedScore);
        setVictory(true);
        console.log(user);
        if(updatedScore > user.high_score) {
            const response = await fetch('http://localhost:3100/users/update_score', {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user.user_name,
                        high_score: updatedScore
                    })
                });
           
            if(response.status === 200) {
                const updatedUser = await response.json();
                setUser(updatedUser);
            } else {
                console.log('Failed to set score')
            }
        } else {
            return
        }
    };



    const handleSubmit = (e)  => {
        e.preventDefault();
        setPlayerGuess('');
        
        const attemptGuess = playerGuess.toLowerCase();
        if (attemptGuess === dailyVtuber.first_name.toLowerCase()) {
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
        fetchData();
        setVictory(false);
        setAllGuesses([]);
    }

    

    if(isLoading) {
        return <h1 id={Style.loading}>Loading...</h1>
    }

    return (
        <>
            <Overlay />
            <div id={Style.main}>
                <div>
                    {victory ?
                    <TimeLeft />
                    :
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
                    
                    }
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
                            return <GuessCard key={index} guess={guess} correctGuess={dailyVtuber} />
                        })}
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Game