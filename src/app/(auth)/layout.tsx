interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
