import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: `https://08-zustand-theta-ebon.vercel.app/404`,
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

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
