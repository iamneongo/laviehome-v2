import KBar from '@/starter/components/kbar';
import AppSidebar from '@/starter/components/layout/app-sidebar';
import Header from '@/starter/components/layout/header';
import { InfoSidebar } from '@/starter/components/layout/info-sidebar';
import { InfobarProvider } from '@/starter/components/ui/infobar';
import { SidebarInset, SidebarProvider } from '@/starter/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Lavie Home Admin',
  description: 'Khu quản trị vận hành homestay của Lavie Home.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <InfobarProvider defaultOpen={false}>
            {children}
            <InfoSidebar side='right' />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
