import { usePostPastryMutation } from '../slices/gameApiSlice';
import PropTypes from 'prop-types';

const AddPastry = ({ editedItem, setEditedItem, setIsAdding }) => {

    const [postPastryMutation, postPastryRequest] = usePostPastryMutation();
    const handleCancelAdd = () => {
        setIsAdding(false);
        setEditedItem({
            id: null,
            image: '',
            name: '',
            quantity: '',
        });
    }

    const handleSaveAdd = async (event) => {
        event.preventDefault();
        setIsAdding(false);
        try {
            await postPastryMutation(editedItem).unwrap();
            setEditedItem({
                id: null,
                image: '',
                name: '',
                quantity: '',
        });
        } catch (error) {
          console.error('Error adding pastry:', error);
        }
    };


    return (
        <div>
            <h2>Ajouter une Pâtisserie</h2>
            <form>
                <label htmlFor="image">Image : </label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    onChange={(e) => setEditedItem({ ...editedItem, image: e.target.value })}
                />

                <label htmlFor="name">Nom : </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                />

                <label htmlFor="quantity">Quantité : </label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                />
                <div>
                    <button type="button" onClick={handleCancelAdd}>
                        Annuler
                    </button>
                    <button type="button" onClick={handleSaveAdd}>
                        Enregistrer
                    </button>
                </div>    
            </form>
        </div>
    )
}

AddPastry.propTypes = {
    editedItem: PropTypes.object.isRequired,
    setEditedItem: PropTypes.func.isRequired,
    setIsAdding: PropTypes.func.isRequired,
}


export default AddPastry;