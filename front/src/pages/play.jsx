import { useEffect, useState } from 'react';
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
    updateDiceValue, 
    updateFrequencyNumber,
    updateWonPastries 
} from '../slices/gameDiceSlice';

const Play = () => {

    // const [diceResults, setDiceResults] = useState([1, 1, 1, 1, 1]);
    // const [value, setValue] = useState(3);
    // const [frequencyNumber, setFrequencyNumber] = useState(() => [0, 0, 0, 0, 0, 0], []);
    // const [wonPastries, setWonPastries] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [rewardPastries, setRewardPastries] = useState([]);

    const dispatch = useDispatch();
    const diceResult = useSelector((state) => state.gameDice.diceResult);
    const diceValue = useSelector((state) => state.gameDice.value);
    const frequencyNumber = useSelector((state) => state.gameDice.frequencyNumber);
    const wonPastries = useSelector((state) => state.gameDice.wonPastries);

    const dices = {
        1: D1,
        2: D2,
        3: D3,
        4: D4,
        5: D5,
        6: D6
    }

    const { data, isLoading, isSuccess, isError, error } = useGetPastriesWonQuery(
        Math.max(...frequencyNumber)-1 > 0 ? Math.max(...frequencyNumber)-1 : 1
    );

    useEffect(() => {
        const checkWinningCombination = () => {
            if(hasStarted && Math.max(...frequencyNumber) > 1){
                setTimeout(() => {
                    dispatch(updateWonPastries(Math.max(...frequencyNumber)));
                    setShowResult(true);
                }, 500);
            }
        }

        checkWinningCombination();
        
    }, [frequencyNumber, hasStarted, dispatch]);

    useEffect(() => {
        if(isSuccess){
            setRewardPastries(data);
        }
    }, [isSuccess, data])

    const rollDice = () => {
        if (diceValue > 0 && Math.max(...frequencyNumber) < 2 || diceValue === 3) {
            const newResults = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
            dispatch(updateDiceResult(newResults));
            dispatch(updateDiceValue());
            const newFrequency = [...frequencyNumber];
            newResults.forEach((number) => {
                newFrequency[number - 1] += 1;
            });
            dispatch(updateFrequencyNumber(newFrequency));

            setHasStarted(true);
        }
    }

    return (
        <div className='gamePage'>
            <h1>Jeu du yams</h1>
            <p>Vous avez {diceValue} lancés</p>
            <p>
                Si vous obtenez une paire (2 dés identiques), vous gagnez une pâtisserie. <br /> <br />
                Si vous obtenez un brelan (3 dés identiques), vous gagnez 2 pâtisseries. <br /> <br />
                Si vous obtenez un carré (4 dés identiques), vous gagnez 3 pâtisseries. <br /> <br />
                Bonne chance !!
            </p>
            <ul className='game'>
            {diceResult.map((result, index) => (
                <li key={index}>
                    <img src={dices[result]} alt={`dé ${index + 1}`} />
                </li>
                ))}
            </ul>
            {hasStarted && showResult &&
                (wonPastries > 1 ? (
                    <div>
                        <p>
                            <strong>BRAVO</strong>, Vous avez gagné :
                        </p>    
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error: {error.message}</p>}
                        {isSuccess &&
                            rewardPastries.map((reward, index) => (
                                <p key={index}>- 1 {reward.name} </p>  
                            ))
                        } 
                    </div>
                ) : (
                    <strong>PERDU</strong>
                ))
            }   
            <button onClick={rollDice}>
                {diceValue > 0 && Math.max(...frequencyNumber) < 2
                    ? `Lancer les dés (${diceValue} essais restants)`
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