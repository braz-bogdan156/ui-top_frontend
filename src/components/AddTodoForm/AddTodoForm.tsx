import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import { Category } from '../../types/types';
import styles from './AddTodoForm.module.css';

type Props = { categories: Category[]; onCreated?: () => void; onCategoryCreated?: () => void };
type FormValues = { text: string; categoryId: string; newCategory?: string };

export default function AddTodoForm({ categories, onCreated, onCategoryCreated }: Props) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: { text: '', categoryId: categories[0]?.id?.toString() || '' },
  });

  useEffect(() => {
    if (categories.length) {
      setValue('categoryId', categories[0].id.toString());
    }
  }, [categories, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      // If user typed a newCategory (non-empty) create it first
      let categoryId = Number(data.categoryId);
      if (data.newCategory && data.newCategory.trim()) {
        const res = await api.post<Category>('/categories', { name: data.newCategory.trim() });
        categoryId = res.data.id;
        if (onCategoryCreated) onCategoryCreated();
      }

      await api.post('/todos', { text: data.text, categoryId });
      reset({ text: '', categoryId: categoryId.toString(), newCategory: '' });
      if (onCreated) onCreated();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Error creating todo';
      alert(msg);
    }
  };

  const showNewCat = watch('categoryId') === 'new';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input {...register('text', { required: true })} placeholder="Task text" className={styles.input} />
      <select {...register('categoryId')} className={styles.select}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
        <option value="new">+ Add new category</option>
      </select>

      {showNewCat && <input {...register('newCategory')} placeholder="New category name" className={styles.input} />}

      <button type="submit" className={styles.addBtn}>Add</button>
    </form>
  );
}