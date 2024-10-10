import "@/styles/globals.css"

export const metadata = {
  title: "next.js-Filters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
