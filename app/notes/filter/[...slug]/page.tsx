import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const queryClient = new QueryClient();
  const selectedTag = (await params).slug[0];

  // ⚡ исправленная логика
  const tag: NoteTag | undefined =
    selectedTag === 'all' ? undefined : (selectedTag as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
