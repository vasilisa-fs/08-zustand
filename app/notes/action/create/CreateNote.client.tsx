'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

const CreateNoteClient = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <NoteForm onClose={handleClose} />;
};

export default CreateNoteClient;
