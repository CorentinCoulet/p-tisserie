import { useGetPastriesQuery } from "../slices/gameApiSlice"
import Brioche from "../../public/1-brioche-pepites-chocolat-recette-patisserie-empreinte-sucree.jpg";
import Banana from "../../public/banana.jpg"
import CakeGlace from "../../public/cake-glace.jpg"
import CakeChoco from "../../public/cake-tout-chocolat.jpg"
import Eclair from "../../public/eclair-chocolat.jpeg"
import GateauChoco from "../../public/Gateau-chocolat-framboise-scaled.jpg"
import Supreme from "../../public/supreme-fondant-aux-fruits-rouges.jpg"
import Tarte from "../../public/TartePoirechocolat.webp"
import { NavLink } from 'react-router-dom';
import "../styles/home.scss"

const Home = () => {

  const { data, isLoading, isSuccess, isError, error } = useGetPastriesQuery();

  const imageCorrespondantes = {
    1: Supreme,
    2: CakeChoco,
    3: GateauChoco,
    4: Brioche,
    5: CakeGlace,
    6: Eclair,
    7: Banana,
    8: Tarte
  }

  return (
    <ul className="list">
      <li className="challenge">
          <p>Tentez de remporter une ou plusieurs patisseries <br /> avec notre jeu de yam's</p>
          <NavLink to="/play" className='navlink playGame'>Jouer</NavLink> 
          <p>Lots Restants:</p>
      </li>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess &&
        data.map((pastry) => (
          <li key={pastry.id} className="listItems">
            {imageCorrespondantes[pastry.id] && (
              <img src={imageCorrespondantes[pastry.id]} alt={pastry.name} />
            )}
            <p>{pastry.name} : <strong>{pastry.quantity}</strong></p>
          </li>
        ))}
    </ul>
  );
};

export default Home;
