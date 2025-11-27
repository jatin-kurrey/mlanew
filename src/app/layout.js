import { Poppins } from 'next/font/google';
import './globals.css'
import BackToTop from './components/BackToTop'
import Providers from './Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: "MLA Rikesh Sen - Vaishali Nagar, Bhilai",
  description: "Official Page of MLA Rikesh Sen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${poppins.className} bg-gray-50`}>
        <Providers>
          {children}
        </Providers>
        <BackToTop />
      </body>
    </html>
  );
}
