import { useEffect } from 'react';
import { useGetPastriesWonQuery } from '../slices/gameApiSlice';
import D1 from '../assets/1.jpg';
import D2 from '../assets/2.jpg';
import D3 from '../assets/3.jpg';
import D4 from '../assets/4.jpg';
import D5 from '../assets/5.jpg';
import D6 from '../assets/6.jpg';
import Dice from '../components/Dice';
import '../styles/play.scss'
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateDiceResult, 
    updateFrequencyNumber,
    updateWonPastries,
    updateHasStarted,
    updateShowResult,
    updateSelectedDice,
    updateRollingDice,
    updateCanRollDice
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

    useEffect(() => {
        if(game.hasStarted && Math.max(...game.frequencyNumber) > 1){
            dispatch(updateWonPastries());
            dispatch(updateShowResult());
        }
    }, [dispatch, game.frequencyNumber, game.hasStarted]);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const hasAttemptedToday = localStorage.getItem(`attempt_${currentDate}`);
    
        if (hasAttemptedToday) {
          dispatch(updateCanRollDice());
        }
    }, [dispatch]);

    const { data, isLoading, isSuccess, isError, error } = useGetPastriesWonQuery(
        game.wonPastries - 1
    );

    const handleDiceClick = (index) => {
        if (game.hasStarted && game.value < 3) {      
            const updatedSelectedDice = game.selectedDice.includes(index)
            ? game.selectedDice.filter((selectedIndex) => selectedIndex !== index)
            : [...game.selectedDice, index];
            dispatch(updateSelectedDice(updatedSelectedDice));
        }
    }

    const stopRollingDice = () => {
        dispatch(updateRollingDice());
    }

    const rollDice = () => {
        if (game.value > 0 && Math.max(...game.frequencyNumber) < 4 || game.value === 3) {
            dispatch(updateDiceResult());
            dispatch(updateFrequencyNumber());
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
                    <Dice 
                        key={index}
                        value={dices[result]}
                        onClick={() => handleDiceClick(index)}
                        isSelected={game.selectedDice.includes(index)}
                    />
                ))}
            </ul>
            {game.hasStarted && game.showResult &&
                (game.wonPastries > 1 ? (
                    (game.value === 0 || !game.rollingDice) && (
                        <div>
                            <p>
                                <strong>BRAVO</strong>, Vous avez gagné :
                            </p>    
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error: {error.message}</p>}
                            {isSuccess &&
                                data.map((reward, index) => (
                                    <p key={index}>- 1 {reward.name} </p>  
                                ))
                            } 
                        </div>
                    )
                ) : (
                    <strong>PERDU</strong>
                ))
            }   
            <button onClick={rollDice}>
                {game.value > 0 && Math.max(...game.frequencyNumber) < 4 && game.rollingDice
                    ? `Lancer les dés (${game.value} essais restants)`
                    : 
                    (
                        'Vous n\'avez plus d\'essais'
                    )
                }
            </button>  
            <button onClick={stopRollingDice}>Arrêter</button>
        </div>
    )
}

export default Play;