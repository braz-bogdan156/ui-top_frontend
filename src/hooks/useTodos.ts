import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Todo } from '../types/types';

export function useTodos(categoryFilter?: number) {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Todo[]>('/todos', {
        params: categoryFilter ? { category: categoryFilter } : {},
      });
      setTodos(res.data);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  return { todos, loading, error, fetchTodos, setTodos };
}