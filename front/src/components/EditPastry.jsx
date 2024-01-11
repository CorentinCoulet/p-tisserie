import { useEffect } from 'react';
import { useUpdatePastryMutation } from '../slices/gameApiSlice';
import PropTypes from 'prop-types';

const EditPastry = ({ editedItem, setEditedItem, setIsEditing }) => {

    const [updatePastryMutation, updatePastryRequest] = useUpdatePastryMutation();

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
            setEditedItem({
                id: null,
                image: '',
                name: '',
                quantity: '',
            });
        } catch (error) {
            console.error('Update Pastry Error:', error);
        }
    };

    return (
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
    )
}

EditPastry.propTypes = {
    editedItem: PropTypes.object.isRequired,
    setEditedItem: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired,
}

export default EditPastry;