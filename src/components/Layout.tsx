import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div>
      <Sidebar isVisible={isSidebarVisible} onToggle={() => setIsSidebarVisible(!isSidebarVisible)} />
      <div className={`transition-[padding] duration-300 ${isSidebarVisible ? 'pl-64' : 'pl-16'}`}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}