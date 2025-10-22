import { useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { useTodos } from '../../hooks/useTodos';
import { useTemporaryDelete } from '../../hooks/useTemporaryDelete';

type Props = { categoryFilter?: number };

export default function TodoList({ categoryFilter }: Props) {
  const { todos, loading, error, fetchTodos, setTodos } = useTodos(categoryFilter);

  
  const { handleTemporaryRemove, cleanup } = useTemporaryDelete(setTodos, fetchTodos);

  useEffect(() => cleanup, [cleanup]);

  if (loading) return <div className={styles.info}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!todos || todos.length === 0) return <div className={styles.info}>No tasks</div>;

  return (
    <div>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onChanged={fetchTodos}
          onTemporaryDelete={(id, undoFn) => handleTemporaryRemove(id, undoFn)}
        />
      ))}
    </div>
  );
}