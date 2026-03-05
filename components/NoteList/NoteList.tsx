import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };
  return (
    <>
      {deleteMutation.isError && <p>Failed to delete note.</p>}
      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
