import './globals.css'
import BackToTop from './components/BackToTop'
import Providers from './providers';

export const metadata = {
  title: "MLA Rikesh Sen - Vaishali Nagar, Bhilai",
  description: "Official Page of MLA Rikesh Sen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" style={{ scrollBehavior: 'smooth' }}>
      <body className="bg-gray-50">
         <Providers>
        {children}
        </Providers>
        <BackToTop />
      </body>
    </html>
  );
}
