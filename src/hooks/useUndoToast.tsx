import { toast } from 'react-toastify';
import { ReactNode } from 'react';

export function useUndoToast() {
  const showUndoToast = (
    message: string | ReactNode,
    onUndo: () => Promise<void> | void,
    duration = 5000
  ) => {
    const toastId = toast.info(
      <div>
        {message}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await onUndo();
            toast.dismiss(toastId);
          }}
          style={{
            marginLeft: 10,
            textDecoration: 'underline',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Undo
        </button>
      </div>,
      { autoClose: duration }
    );

    return toastId;
  };

  return { showUndoToast };
}