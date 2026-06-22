import { NavGroup } from '@/starter/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Vận hành homestay',
    items: [
      {
        title: 'Tổng quan',
        url: '/dashboard/overview',
        icon: 'dashboard',
        shortcut: ['d', 'd'],
        isActive: false,
        items: []
      },
      {
        title: 'Booking',
        url: '/dashboard/bookings',
        icon: 'calendar',
        shortcut: ['b', 'b'],
        isActive: false,
        items: []
      },
      {
        title: 'Phòng',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
        items: []
      },
      {
        title: 'Chi nhánh',
        url: '/dashboard/workspaces',
        icon: 'workspace',
        shortcut: ['c', 'c'],
        isActive: false,
        items: []
      },
      {
        title: 'Khách lưu trú',
        url: '/dashboard/users',
        icon: 'teams',
        shortcut: ['k', 'k'],
        isActive: false,
        items: []
      },
      {
        title: 'Vận hành',
        url: '/dashboard/kanban',
        icon: 'kanban',
        shortcut: ['o', 'o'],
        isActive: false,
        items: []
      },
      {
        title: 'Doanh thu',
        url: '/dashboard/billing',
        icon: 'billing',
        shortcut: ['r', 'r'],
        isActive: false,
        items: []
      },
      {
        title: 'Cảnh báo',
        url: '/dashboard/notifications',
        icon: 'notification',
        shortcut: ['n', 'n'],
        isActive: false,
        items: []
      },
      {
        title: 'Thư viện ảnh',
        url: '/dashboard/elements/icons',
        icon: 'media',
        shortcut: ['i', 'i'],
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Tài khoản',
    items: [
      {
        title: 'Hồ sơ admin',
        url: '/dashboard/profile',
        icon: 'profile',
        shortcut: ['m', 'm'],
        isActive: false,
        items: []
      },
      {
        title: 'Đăng xuất',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'logout',
        isActive: false,
        items: []
      }
    ]
  }
];
