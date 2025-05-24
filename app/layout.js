import "./globals.css";

export const metadata = {
  title: "PAKCS - Gestion des stocks",
  description: "Application de gestion des stocks PAKCS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
