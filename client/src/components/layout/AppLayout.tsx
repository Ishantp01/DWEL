
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PageContainer from './PageContainer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background antialiased">
      <Sidebar />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <PageContainer sidebarCollapsed={sidebarCollapsed}>
        {children}
      </PageContainer>
    </div>
  );
};

export default AppLayout;
