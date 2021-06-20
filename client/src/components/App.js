import React from 'react';
import sortBy from 'lodash/sortBy';

function App() {
  const [storeId, setStoreId] = React.useState('4475-olathe-ks');
  const [item, setItem] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [rerender, setRerender] = React.useState(0);
  const itemsWithLocation = React.useRef([]);
  const itemRef = React.useRef();

  const addItem = async (e) => {
    e.preventDefault();
    setItems([...items, { name: item }]);
    setItem('');
    itemRef.current.focus();
    const response = await fetch(
      `http://localhost:3001/store/${storeId}?item=${item}`
    );
    const { aisle } = await response.json();
    console.log(`${item} - ${aisle}`);
    const [section, row] = aisle.split('.');
    itemsWithLocation.current = sortBy(
      [
        ...itemsWithLocation.current,
        { name: item, section, row: parseInt(row) },
      ],
      ['section', 'row']
    );
    setRerender(rerender + 1);
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
          {itemsWithLocation.current
            .concat(
              items.filter(
                (i) =>
                  !itemsWithLocation.current.some((iwl) => iwl.name === i.name)
              )
            )
            .map((i) => (
              <li key={`${i.name}-${i.section}`}>
                {i.name} - {i.section && `${i.section}.${i.row}`}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
