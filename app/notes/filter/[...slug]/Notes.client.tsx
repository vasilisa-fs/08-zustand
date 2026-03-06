'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './Notes.module.css';
import { NoteTag } from '@/types/note';
import Link from 'next/link';

interface NotesClientProps {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [query, setQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);

  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes({ page, perPage, search: query, tag }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        {
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        }
      </div>

      {isLoading && <p>Loading, please wait...</p>}

      {error && <p>Something went wrong.</p>}

      {!isLoading && !error && notes.length === 0 && (
        <p>No matching notes found.</p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesClient;
