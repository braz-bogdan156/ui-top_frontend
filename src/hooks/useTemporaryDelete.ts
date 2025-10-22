import api from '../api/api';
import { Todo } from '../types/types';
import { useDeleteTimers } from './useDeleteTimers';
import { useUndoToast } from './useUndoToast';

export function useTemporaryDelete(
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>,
  fetchTodos: () => Promise<void>
) {
  const { schedule, cancel, cleanup } = useDeleteTimers();
  const { showUndoToast } = useUndoToast();

  const scheduleFinalDelete = (id: number) => {
    schedule(id, async () => {
      try {
        await api.delete(`/todos/${id}`);
        setTodos((prev) => prev?.filter((x) => x.id !== id) ?? null);
      } catch (e) {
        console.error('Final delete failed', e);
      }
    });
  };

  const handleTemporaryRemove = (id: number, undoCallback?: () => Promise<void> | void) => {
    showUndoToast('Task will be removed', async () => {
      cancel(id);
      try {
        if (undoCallback) await undoCallback();
        await fetchTodos();
      } catch (err) {
        console.error('Undo failed', err);
      }
    });

    scheduleFinalDelete(id);
  };

  return { handleTemporaryRemove, cleanup };
}