import { Navbar } from "@/modules/home/ui/components/navbar";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
