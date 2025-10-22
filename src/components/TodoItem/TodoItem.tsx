import { Todo } from '../../types/types';
import { api } from '../../api/api';
import styles from './TodoItem.module.css';

type Props = {
  todo: Todo;
  onChanged?: () => void;
  onTemporaryDelete?: (id: number, undoFn?: () => Promise<void> | void) => void;
};

export default function TodoItem({ todo, onChanged, onTemporaryDelete }: Props) {
  const handleToggle = async () => {
    try {
      // Toggle on server immediately
      await api.patch<Todo>(`/todos/${todo.id}`);
      // prepare undo: toggle back
      const undo = async () => {
        try {
          await api.patch<Todo>(`/todos/${todo.id}`);
        } catch (e) {
          console.error('Undo toggle failed', e);
        }
      };
      if (onTemporaryDelete) onTemporaryDelete(todo.id, undo);
      if (onChanged) onChanged();
    } catch (e) {
      console.error('Toggle error', e);
      alert('Error toggling todo');
    }
  };

  const handleDelete = async () => {
    // We don't call DELETE immediately — schedule with toast
    const undo = async () => {
      // nothing to restore if we never deleted; but we might need to do nothing
      // or re-create via separate endpoint — here we rely on scheduled delete approach
    };
    if (onTemporaryDelete) onTemporaryDelete(todo.id, undo);
  };

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
        <div className={styles.content}>
          <div className={todo.completed ? styles.doneText : ''}>{todo.text}</div>
          <div className={styles.category}>{todo.category?.name}</div>
        </div>
      </div>
      <div>
        <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}