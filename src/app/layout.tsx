import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { RoleProvider } from '@/context/RoleContext';
import { Toast } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Venturely — Try Innovative Startup Products Before They Scale | Trial & Discovery Platform',
  description:
    'Discover Trial Packs from innovative startups on Venturely. Get 6 free trial points, try sample products across hardware, wellness, audio, workspace & more. 100% cashback on authentic feedback.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${poppins.variable} font-[Inter,Poppins,sans-serif] antialiased bg-white text-black h-full flex flex-col`}>
        <RoleProvider>
          {children}
          <Toast />
        </RoleProvider>
      </body>
    </html>
  );
}
