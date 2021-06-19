import React from 'react';
import sortBy from 'lodash/sortBy';

function App() {
  const [storeId, setStoreId] = React.useState('4475-olathe-ks');
  const [item, setItem] = React.useState('');
  const [items, setItems] = React.useState([]);
  const itemRef = React.useRef();

  const addItem = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3001/store/${storeId}?item=${item}`
    );
    const { aisle } = await response.json();
    const [section, row] = aisle.split('.');
    setItems(
      sortBy(
        [...items, { name: item, section, row: parseInt(row) }],
        ['section', 'row']
      )
    );
    setItem('');
    itemRef.current.focus();
  };

  return (
    <div>
      <div>
        <form onSubmit={addItem}>
          <input
            type="text"
            id="store-id"
            name="store-id"
            onChange={(e) => setStoreId(e.target.value)}
            placeholder="Store ID"
            value={storeId}
          />
          <input
            type="text"
            id="item"
            name="item"
            onChange={(e) => setItem(e.target.value)}
            placeholder="Add Item"
            value={item}
            ref={itemRef}
          />
          <button>Add Item</button>
        </form>
      </div>
      <div>
        <ul>
          {items.map((i) => (
            <li key={i.name}>
              {i.name} - {i.section}.{i.row}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
