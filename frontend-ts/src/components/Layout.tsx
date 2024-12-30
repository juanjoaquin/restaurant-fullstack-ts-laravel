import { Link } from "react-router-dom";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
  }
  
  export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 text-white py-4 px-6 shadow-lg w-full md:max-w-screen-md md:mx-auto lg:max-w-screen-lg lg:mx-auto">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        <main className="flex-grow p-6">{children}</main>
        <footer className="bg-blue-700 text-white text-center font-semibold py-2">
          &copy; {new Date().getFullYear()} <Link to="https://github.com">Github</Link>
        </footer>
      </div>
    );
  };
  