import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import { api } from './api/api';
import { Category } from './types/types';
import styles from './App.module.css';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<number | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>('/categories');
      setCategories(res.data);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={4000} />
      <Layout>
        <div className={styles.topRow}>
          <label>Filter:</label>
          <select
            value={filter ?? ''}
            onChange={(e) =>
              setFilter(e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className={styles.refreshBtn} onClick={() => setRefreshKey((k) => k + 1)}>
            Refresh
          </button>
        </div>

        <AddTodoForm categories={categories} onCreated={() => setRefreshKey((k) => k + 1)} onCategoryCreated={fetchCategories} />

        <div key={refreshKey}>
          <TodoList categoryFilter={filter} />
        </div>
      </Layout>
    </>
  );
}

export default App;