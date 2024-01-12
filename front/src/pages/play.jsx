import { useEffect } from 'react';
import { useGetPastriesWonQuery } from '../slices/gameApiSlice';
import D1 from '../assets/1.jpg'
import D2 from '../assets/2.jpg'
import D3 from '../assets/3.jpg'
import D4 from '../assets/4.jpg'
import D5 from '../assets/5.jpg'
import D6 from '../assets/6.jpg'
import '../styles/play.scss'
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateDiceResult, 
    updateFrequencyNumber,
    updateWonPastries,
    updateHasStarted,
    updateShowResult,
    updateRewardPastries,
} from '../slices/gameDiceSlice';

const Play = () => {

    const dispatch = useDispatch();
    const game = useSelector((state) => state.gameDice);

    const dices = {
        1: D1,
        2: D2,
        3: D3,
        4: D4,
        5: D5,
        6: D6
    }

    const { data, isLoading, isSuccess, isError, error } = useGetPastriesWonQuery(
        Math.max(...game.frequencyNumber)-1 > 0 ? Math.max(...game.frequencyNumber)-1 : 1
    );

    useEffect(() => {
        const checkWinningCombination = () => {
            if(game.hasStarted && Math.max(...game.frequencyNumber) > 1){
                setTimeout(() => {
                    dispatch(updateWonPastries());
                    dispatch(updateShowResult());
                }, 500);
            }
        }

        checkWinningCombination();
        
    }, [dispatch, game.frequencyNumber, game.hasStarted]);

    useEffect(() => {
        if(isSuccess){
            dispatch(updateRewardPastries(data));
        }
    }, [isSuccess, data, dispatch])

    const rollDice = () => {
        if (game.value > 0 && Math.max(...game.frequencyNumber) < 2 || game.value === 3) {
            const newResults = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
            dispatch(updateDiceResult());
            dispatch(updateFrequencyNumber(newResults));
            dispatch(updateHasStarted());
        }
    }

    return (
        <div className='gamePage'>
            <h1>Jeu du yams</h1>
            <p>
                Si vous obtenez une paire (2 dés identiques), vous gagnez une pâtisserie. <br /> <br />
                Si vous obtenez un brelan (3 dés identiques), vous gagnez 2 pâtisseries. <br /> <br />
                Si vous obtenez un carré (4 dés identiques), vous gagnez 3 pâtisseries. <br /> <br />
                Bonne chance !!
            </p>
            <ul className='game'>
            {game.diceResult.map((result, index) => (
                <li key={index}>
                    <img src={dices[result]} alt={`dé ${index + 1}`} />
                </li>
                ))}
            </ul>
            {game.hasStarted && game.showResult &&
                (game.wonPastries > 1 ? (
                    <div>
                        <p>
                            <strong>BRAVO</strong>, Vous avez gagné :
                        </p>    
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error: {error.message}</p>}
                        {isSuccess &&
                            game.rewardPastries.map((reward, index) => (
                                <p key={index}>- 1 {reward.name} </p>  
                            ))
                        } 
                    </div>
                ) : (
                    <strong>PERDU</strong>
                ))
            }   
            <button onClick={rollDice}>
                {game.value > 0 && Math.max(...game.frequencyNumber) < 2
                    ? `Lancer les dés (${game.value} essais restants)`
                    : 
                    (
                        'Vous n\'avez plus d\'essais'
                    )
                }
            </button>  
        </div>
    )
}

export default Play;