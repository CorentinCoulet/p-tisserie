import { useGetPastriesQuery } from "../slices/gameApiSlice"
import { NavLink } from 'react-router-dom';
import "../styles/home.scss"
import ImageComponent from "../components/ImageComponent";

const Home = () => {

  const { data, isLoading, isSuccess, isError, error } = useGetPastriesQuery();

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
            <ImageComponent filename={pastry.image} />
            <p>{pastry.name} : <strong>{pastry.quantity}</strong></p>
          </li>
        ))}
    </ul>
  );
};

export default Home;
