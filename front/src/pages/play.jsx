import D1 from '../assets/1.jpg'
import D2 from '../assets/2.jpg'
import D3 from '../assets/3.jpg'
import D4 from '../assets/4.jpg'
import D5 from '../assets/5.jpg'
import D6 from '../assets/6.jpg'
import '../styles/play.scss'

const Play = () => {

    const [diceResults, setDiceResults] = useState([1, 1, 1, 1, 1]);
    const value = 3;

    const dices = {
        1: D1,
        2: D2,
        3: D3,
        4: D4,
        5: D5,
        6: D6
    }

    const rollDice = () => {
        const newResults = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
        setDiceResults(newResults);
      };

    return (
        <div className='gamePage'>
            <h1>Jeu du yams</h1>
            <p>Vous avez {value} lancés</p>
            <p>
                Si vous obtenez une paire (2 dés identiques), vous gagnez une pâtisserie. <br /> <br />
                Si vous obtenez un brelan (3 dés identiques), vous gagnez 2 pâtisseries. <br /> <br />
                Si vous obtenez un carré (4 dés identiques), vous gagnez 3 pâtisseries. <br /> <br />
                Bonne chance !!
            </p>
            <ul className='game'>
            {diceResults.map((result, index) => (
                <li key={index}>
                    <img src={dices[result]} alt={`dé ${index + 1}`} />
                </li>
                ))}
            </ul>
            <button onClick={rollDice}>Lancer les dés ({value} essais restants)</button>
        </div>
    )
}

export default Play;