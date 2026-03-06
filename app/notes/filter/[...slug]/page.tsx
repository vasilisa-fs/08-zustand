import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const tag = (await params).slug[0];

  const title =
    tag === 'all' ? 'All Notes - NoteHub' : `${tag} Notes - NoteHub`;

  const description =
    tag === 'all'
      ? 'Browse all notes in NoteHub.'
      : `Browse ${tag} notes in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub is a simple and efficient application for managing personal notes.',
        },
      ],
    },
  };
};

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const queryClient = new QueryClient();
  const selectedTag = (await params).slug[0];

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
