import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Catena Language Partners - Medical Interpretation Services',
  description: 'Professional Spanish medical interpretation services for healthcare providers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
