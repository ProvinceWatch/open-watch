// components/Layout.js

import NavBar from './NavBar';

const Layout = ({ children }) => (
  <div style={{ position: 'relative', height: '100vh' }}>
    <NavBar />
    {children}
  </div>
);

export default Layout;