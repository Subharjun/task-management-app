import React, { useState, ChangeEvent } from 'react';

// Define the type for an item
interface Item {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // List of items
  const [newItem, setNewItem] = useState<string>(''); // New item being added
  const [editItemId, setEditItemId] = useState<number | null>(null); // Item being edited
  const [editItemName, setEditItemName] = useState<string>(''); // Name of the item being edited

  // Add a new item to the list
  const handleAddItem = () => {
    if (newItem.trim() === '') return; // Prevent adding empty items
    const newItemObj: Item = { id: Date.now(), name: newItem };
    setItems([...items, newItemObj]); // Add new item to the list
    setNewItem(''); // Clear the input field
  };

  // Handle input change for new item
  const handleChangeNewItem = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  // Edit an existing item
  const handleEditItem = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItemId(id); // Set the item being edited
      setEditItemName(itemToEdit.name); // Set the existing name in the input field
    }
  };

  // Save changes after editing
  const handleSaveEdit = () => {
    if (editItemId === null) return; // Ensure there's an item being edited
    setItems(
      items.map((item) =>
        item.id === editItemId ? { ...item, name: editItemName } : item
      )
    );
    setEditItemId(null); // Clear the edit state
    setEditItemName(''); // Clear the input field
  };

  // Handle input change for the item being edited
  const handleChangeEditItem = (e: ChangeEvent<HTMLInputElement>) => {
    setEditItemName(e.target.value);
  };

  // Delete an item from the list
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Operations</h1>

      {/* Create */}
      <div className="mb-4">
        <input
          type="text"
          value={newItem}
          onChange={handleChangeNewItem}
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Add a new item"
        />
        <button
          onClick={handleAddItem}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>

      {/* List of Items */}
      <ul className="list-disc ml-5">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {editItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={editItemName}
                  onChange={handleChangeEditItem}
                  className="border border-gray-300 p-1 rounded-md"
                />
                <button
                  onClick={handleSaveEdit}
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {item.name}
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
