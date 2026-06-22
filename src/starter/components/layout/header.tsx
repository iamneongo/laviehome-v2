import React from 'react';

import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { NotificationCenter } from '@/starter/features/notifications/components/notification-center';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';

export default function Header() {
  return (
    <header className='bg-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 backdrop-blur-md md:h-14'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <div className='hidden items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-yellow-100 sm:flex'>
          Quản lý homestay
        </div>
        <NotificationCenter />
      </div>
    </header>
  );
}
