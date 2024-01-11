import { 
    useGetPastriesQuery, 
    useDeletePastryMutation, 
} from "../slices/gameApiSlice"
import ImageComponent from '../components/ImageComponent';
import EditPastry from "../components/EditPastry";
import AddPastry from "../components/AddPastry";
import { useState } from 'react';
import "../styles/dashboard.scss";
import SearchPastry from "../components/SearchPastry";

const Dashboard = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetPastriesQuery();
    const [deletePastryMutation, deletePastryRequest] = useDeletePastryMutation();

    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editedItem, setEditedItem] = useState({
        id: null,
        image: '',
        name: '',
        quantity: '',
    });

    const handleDeleteClick = async (pastryId) => {
        try {
            await deletePastryMutation(pastryId).unwrap();
        } catch (error) {
            console.error('Delete Pastry Error:', error);
        }
    };

    const handleEditClick = (pastry) => {
        setEditedItem({
            id: pastry.id,
            image: pastry.image,
            name: pastry.name,
            quantity: pastry.quantity,
        });
        setIsEditing(true);
        setIsAdding(false);
    }

    const handleAddClick = () => {
        setIsAdding(true);
        setIsEditing(false);
    };

    const filteredData = data
    ? data.filter(
        (pastry) =>
            pastry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pastry.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    const renderPastryItems = () => (
        <ul>
          {['Image', 'Nom', 'Quantité restante', 'Actions'].map((header) => (
            <div key={header}>
              <h2>{header}</h2>
              {isLoading && <p>Loading...</p>}
              {isError && <p>Error: {error.message}</p>}
              {isSuccess &&
                filteredData.map((pastry) => (
                  <li key={pastry.id} className="itemCustom">
                    {header === 'Image' ? (
                      <ImageComponent filename={pastry.image} />
                    ) : header === 'Nom' ? (
                      <p>{pastry.name}</p>
                    ) : header === 'Quantité restante' ? (
                      <p>{pastry.quantity}</p>
                    ) : (
                      <div>
                        <button onClick={() => handleDeleteClick(pastry.id)}>Supprimer</button>
                        <button onClick={() => handleEditClick(pastry)}>Modifier</button>
                      </div>
                    )}
                  </li>
                ))}
            </div>
          ))}
        </ul>
      );
      

  return (
    <div className='menuConfig'>
        {!isEditing && !isAdding
            ? (
                <div>
                    <button onClick={() => handleAddClick()}><strong>Ajouter une pâtisserie</strong></button>
                    <h1>Liste des pâtisseries</h1>
                    <SearchPastry setSearchTerm={setSearchTerm}/>
                    <div className='pastriesConfig'>
                        {renderPastryItems()}
                    </div>
                </div>  
            ) : isEditing ? (
                <EditPastry
                    editedItem={editedItem}
                    setEditedItem={setEditedItem}
                    setIsEditing={setIsEditing}
                />   
            ) : isAdding ? (
                <AddPastry 
                    editedItem={editedItem}
                    setEditedItem={setEditedItem}
                    setIsAdding={setIsAdding}
                /> 
            ) : (
                <></>
            )
        }
    </div>
  );
}

export default Dashboard;