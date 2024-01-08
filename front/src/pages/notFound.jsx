import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>Erreur 404 - Page non trouvée</h2>
      <p>La page que vous recherchez n'a pas été trouvée.</p>
      <NavLink to="/">Retour à la page d'accueil</NavLink>
    </div>
  );
};

export default NotFound;
