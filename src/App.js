import React, { useState, useEffect } from 'react';
import './App.css';
import urls from './constants/urls';


function App() {
  const [menus, setMenus] = useState([]);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMenus();
  }, [sort, search]);

  const fetchMenus = async () => {
    let url = urls.MenuManagementAPIUrl;

    if (sort) {
      url += `?sort=${sort}`;
    }

    if (search) {
      url += `${sort ? '&' : '?'}search=${search}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Menu Management System</h1>
      <label>
        Sort by Price:
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">None</option>
          <option value="low_to_high_price">Low to High</option>
          <option value="high_to_low_price">High to Low</option>
        </select>
      </label>
      <br />
      <label>
        Search by Name:
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </label>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            {menu.name} - ${menu.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
