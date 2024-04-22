import Style from './GuessCard.module.css'

function GuessCard({guess, correctGuess}) {
    return (
        <div className={Style.card} >
            <div><img src={guess.image}></img></div>
            <div className={guess.name === correctGuess.name ? Style.correct : Style.incorrect}>{guess.name}</div>
            <div className={guess.company === correctGuess.company ? Style.correct : Style.incorrect}>{guess.company}</div>
            <div className={guess.gen === correctGuess.gen ? Style.correct : Style.incorrect}>{guess.gen}</div>
            <div className={guess.hair_color === correctGuess.hair_color ? Style.correct : Style.incorrect}>{guess.hair_color}</div>
            <div className={guess.seiso_level === correctGuess.seiso_level ? Style.correct : Style.incorrect}>{guess.seiso_level}</div>
        </div>
    )
}

export default GuessCard