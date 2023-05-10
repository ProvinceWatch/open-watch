import { FC } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: any
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div style={{ position: 'relative', height: '100vh' }}>
    <NavBar />
    {children}
  </div>
);

export default Layout;