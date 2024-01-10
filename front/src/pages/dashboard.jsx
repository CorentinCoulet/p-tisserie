import { setLoggedOut } from '../slices/gameAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
    useGetPastriesQuery, 
    useDeletePastryMutation, 
    useUpdatePastryMutation, 
    // usePostPastryMutation 
} from "../slices/gameApiSlice"
import ImageComponent from '../components/ImageComponent';
import { useState } from 'react';
import "../styles/logout.scss"

const Logout = ({ redirectTo }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.gameAuth.isLoggedIn);
    const { data, isLoading, isSuccess, isError, error } = useGetPastriesQuery();
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({
        id: null,
        image: '',
        name: '',
        quantity: '',
    });

    const [updatePastryMutation, updatePastryRequest] = useUpdatePastryMutation();
    const [deletePastryMutation, deletePastryRequest] = useDeletePastryMutation();
    //const postPastryMutation = usePostPastryMutation();

    const handleLogoutClick = () => {
        dispatch(setLoggedOut());
    };

    const handleEditClick = (pastry) => {
        setEditedItem({
            id: pastry.id,
            image: pastry.image,
            name: pastry.name,
            quantity: pastry.quantity,
        });
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedItem({
            id: null,
            image: '',
            name: '',
            quantity: '',
        });
    };

    const handleSaveEdit = async() => {
        setIsEditing(false);
        try {
            await updatePastryMutation(editedItem).unwrap();
        } catch (error) {
            console.error('Update Pastry Error:', error);
        }
        setEditedItem({
            id: null,
            image: '',
            name: '',
            quantity: '',
        });
    };

    const handleDeleteClick = async (pastryId) => {
        try {
            await deletePastryMutation(pastryId).unwrap();
        } catch (error) {
            console.error('Delete Pastry Error:', error);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to={redirectTo} />;
    }

    const renderPastryItems = () => (
        <ul>
            <div>
                <h2>Image</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {isSuccess &&
                data.map((pastry) => (
                    <li key={pastry.id} className="itemCustom">
                    <ImageComponent filename={pastry.image} />
                    </li>
                ))}
            </div>
            <div>
                <h2>Nom</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {isSuccess &&
                data.map((pastry) => (
                    <li key={pastry.id} className="itemCustom">
                    <p>{pastry.name}</p>
                    </li>
                ))}
            </div>
            <div>
                <h2>Quantité restante</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {isSuccess &&
                data.map((pastry) => (
                    <li key={pastry.id} className="itemCustom">
                    <p>{pastry.quantity}</p>
                    </li>
                ))}
            </div>
            <div>
                <h2>Actions</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {isSuccess &&
                data.map((pastry) => (
                    <li key={pastry.id} className="itemCustom">
                        <div>
                            <button onClick={() => handleDeleteClick(pastry.id)}>Supprimer</button>
                            <button onClick={() => handleEditClick(pastry)}>Modifier</button>
                        </div>
                    </li>
                ))}
            </div>
        </ul>
    );

  return (
    <div className='menuConfig'>
        {isEditing ? (
            <div>
                <h2>Modifier Pâtisserie</h2>
                <form>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={editedItem.image}
                        onChange={(e) => setEditedItem({ ...editedItem, image: e.target.value })}
                    />

                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                    />

                    <label htmlFor="quantity">Quantité:</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={editedItem.quantity}
                        onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                    />
                    <div>
                        <button type="button" onClick={handleCancelEdit}>
                        Annuler
                        </button>
                        <button type="button" onClick={handleSaveEdit}>
                            Enregistrer
                        </button>
                    </div>    
                </form>
            </div>
        ) : (
            <div>
                <button><strong>Ajouter une pâtisserie</strong></button>
                <h1>Liste des pâtisseries</h1>
                <div className='pastriesConfig'>
                    {renderPastryItems()}
                </div>
                <form className="logout" onSubmit={handleLogoutClick}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        )}
        
    </div>
  );
}

Logout.propTypes = {
    redirectTo: PropTypes.string.isRequired,
}

export default Logout;