import NextAuthProvider from "@/components/NextAuthProvider";
import { Session } from "next-auth";

import "./globals.css";
import { ComplexNavbar } from "@/components/ComplexNavbar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
  session: Session | null;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <body className="p-4 dark:bg-slate-900">
        <NextAuthProvider session={session}>
          <ComplexNavbar />
          <Sidebar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
