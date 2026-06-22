'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { Button } from '@/starter/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/starter/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/starter/components/user-avatar-profile';

export function UserNav() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' sideOffset={10} forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{user.fullName}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>Hồ sơ admin</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/billing')}>Doanh thu</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/notifications')}>Cảnh báo</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/workspaces')}>Chi nhánh</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/sign-in' })}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
