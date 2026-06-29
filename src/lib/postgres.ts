import 'server-only';

import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __laviePgPool: Pool | null | undefined;
}

const connectionString = process.env.DATABASE_URL;

function createPool() {
  if (!connectionString) {
    console.warn('⚠️ DATABASE_URL is not set. Running in MOCK mode.');
    return null;
  }

  return new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export const pool = globalThis.__laviePgPool !== undefined ? globalThis.__laviePgPool : createPool();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__laviePgPool = pool;
}

// Realistic mock data for previewing the interface without database setup
const mockBranches = [
  {
    id: 1,
    name: 'Hà Nội - Tây Hồ',
    active: 1,
    hotline: '0901.123.456',
    google_maps_link: 'https://maps.google.com/?q=Tay+Ho+Ha+Noi',
    classic_booking_enabled: 1
  },
  {
    id: 2,
    name: 'Hà Nội - Hoàn Kiếm',
    active: 1,
    hotline: '0901.123.457',
    google_maps_link: 'https://maps.google.com/?q=Hoan+Kiem+Ha+Noi',
    classic_booking_enabled: 1
  },
  {
    id: 3,
    name: 'TP. HCM - Quận 1',
    active: 1,
    hotline: '0901.123.458',
    google_maps_link: 'https://maps.google.com/?q=District+1+HCMC',
    classic_booking_enabled: 1
  },
  {
    id: 4,
    name: 'Đà Nẵng - Hải Châu',
    active: 0,
    hotline: '0901.123.459',
    google_maps_link: 'https://maps.google.com/?q=Hai+Chau+Da+Nang',
    classic_booking_enabled: 0
  }
];

const mockRooms = [
  {
    id: 1,
    branch_id: 1,
    card_name: 'Phòng Honey',
    branch_name: 'Hà Nội - Tây Hồ',
    room_amenities: ['Bồn tắm', 'View hồ Tây', 'Máy chiếu 4K', 'Smart TV', 'Wifi tốc độ cao', 'Điều hòa 2 chiều', 'Giường King Size'],
    price_from: 350000,
    price_to: 500000,
    full_day_price: 900000,
    main_image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 2,
    branch_id: 1,
    card_name: 'Phòng Squid',
    branch_name: 'Hà Nội - Tây Hồ',
    room_amenities: ['Máy chiếu 4K', 'Bếp nhỏ', 'Wifi tốc độ cao', 'Điều hòa 2 chiều', 'Sofa bed'],
    price_from: 240000,
    price_to: 350000,
    full_day_price: 650000,
    main_image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 3,
    branch_id: 2,
    card_name: 'Phòng Candy',
    branch_name: 'Hà Nội - Hoàn Kiếm',
    room_amenities: ['Bồn tắm gỗ', 'Phong cách Đông Dương', 'Smart TV', 'Wifi tốc độ cao', 'Điều hòa', 'Ban công'],
    price_from: 290000,
    price_to: 420000,
    full_day_price: 800000,
    main_image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 4,
    branch_id: 3,
    card_name: 'Phòng VIP',
    branch_name: 'TP. HCM - Quận 1',
    room_amenities: ['Bể bơi mini', 'Sky View', 'Bồn tắm Jacuzzi', 'Quầy bar', 'Smart TV 75 inch', 'Hệ thống âm thanh Marshall'],
    price_from: 450000,
    price_to: 650000,
    full_day_price: 1200000,
    main_image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
    ]
  }
];

const mockBookings = [
  {
    id: 'bk-01',
    room_id: 1,
    branch_id: 1,
    guest_name: 'Nguyễn Văn A',
    stay_date: '2026-06-28',
    time_range: '14:00 - 18:00',
    channel: 'Direct',
    status: 'Đang ở',
    amount: 350000,
    created_at: '2026-06-28 10:00:00',
    card_name: 'Phòng Premium Lake View',
    branch_name: 'Hà Nội - Tây Hồ',
    room_amenities: ['Bồn tắm', 'View hồ Tây', 'Máy chiếu 4K', 'Smart TV', 'Wifi tốc độ cao', 'Điều hòa 2 chiều', 'Giường King Size'],
    price_from: 350000,
    price_to: 500000,
    full_day_price: 900000,
    main_image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60'
    ],
    branch_hotline: '0901.123.456',
    branch_maps: 'https://maps.google.com/?q=Tay+Ho+Ha+Noi',
    branch_active: 1,
    branch_classic: 1
  },
  {
    id: 'bk-02',
    room_id: 2,
    branch_id: 1,
    guest_name: 'Trần Thị B',
    stay_date: '2026-06-28',
    time_range: 'Qua đêm',
    channel: 'Airbnb',
    status: 'Đã xác nhận',
    amount: 650000,
    created_at: '2026-06-28 09:30:00',
    card_name: 'Phòng Studio Cozy',
    branch_name: 'Hà Nội - Tây Hồ',
    room_amenities: ['Máy chiếu 4K', 'Bếp nhỏ', 'Wifi tốc độ cao', 'Điều hòa 2 chiều', 'Sofa bed'],
    price_from: 240000,
    price_to: 350000,
    full_day_price: 650000,
    main_image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60'
    ],
    branch_hotline: '0901.123.456',
    branch_maps: 'https://maps.google.com/?q=Tay+Ho+Ha+Noi',
    branch_active: 1,
    branch_classic: 1
  },
  {
    id: 'bk-03',
    room_id: 3,
    branch_id: 2,
    guest_name: 'Lê Hoàng C',
    stay_date: '2026-06-27',
    time_range: '19:00 - 22:00',
    channel: 'Facebook',
    status: 'Hoàn tất',
    amount: 290000,
    created_at: '2026-06-27 18:00:00',
    card_name: 'Phòng Suite Classic',
    branch_name: 'Hà Nội - Hoàn Kiếm',
    room_amenities: ['Bồn tắm gỗ', 'Phong cách Đông Dương', 'Smart TV', 'Wifi tốc độ cao', 'Điều hòa', 'Ban công'],
    price_from: 290000,
    price_to: 420000,
    full_day_price: 800000,
    main_image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60'
    ],
    branch_hotline: '0901.123.457',
    branch_maps: 'https://maps.google.com/?q=Hoan+Kiem+Ha+Noi',
    branch_active: 1,
    branch_classic: 1
  },
  {
    id: 'bk-04',
    room_id: 4,
    branch_id: 3,
    guest_name: 'Phạm Minh D',
    stay_date: '2026-06-29',
    time_range: 'Cả ngày',
    channel: 'TikTok',
    status: 'Chờ cọc',
    amount: 1200000,
    created_at: '2026-06-28 11:15:00',
    card_name: 'Phòng Penthouse Vista',
    branch_name: 'TP. HCM - Quận 1',
    room_amenities: ['Bể bơi mini', 'Sky View', 'Bồn tắm Jacuzzi', 'Quầy bar', 'Smart TV 75 inch', 'Hệ thống âm thanh Marshall'],
    price_from: 450000,
    price_to: 650000,
    full_day_price: 1200000,
    main_image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60',
    is_classic: 0,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
    ],
    branch_hotline: '0901.123.458',
    branch_maps: 'https://maps.google.com/?q=District+1+HCMC',
    branch_active: 1,
    branch_classic: 1
  }
];

function getMockRows<T extends Record<string, unknown>>(text: string, params: unknown[] = []) {
  const normalizedText = text.toLowerCase().trim();

  if (normalizedText.includes('from branches')) {
    return mockBranches as unknown as T[];
  }

  if (normalizedText.includes('from rooms')) {
    let rooms = [...mockRooms];

    if (normalizedText.includes('where is_classic = 0')) {
      rooms = rooms.filter((room) => room.is_classic === 0);
    }

    if (normalizedText.includes('where id = $1')) {
      const roomId = Number(params[0]);
      rooms = rooms.filter((room) => room.id === roomId);
    }

    return rooms as unknown as T[];
  }

  if (normalizedText.includes('from bookings')) {
    const limit = Number(params[0] ?? 12);
    return mockBookings.slice(0, limit) as unknown as T[];
  }

  return [] as T[];
}

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  if (!pool) {
    return getMockRows<T>(text, params);
  }

  try {
    const result = await (pool as Pool).query<T>(text, params);
    return result.rows;
  } catch (error) {
    console.warn('Database query failed, falling back to mock data:', error);
    return getMockRows<T>(text, params);
  }
}

export async function queryOne<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
