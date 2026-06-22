import {
  activeBranches,
  branches,
  money,
  rooms,
  type Branch,
  type Room
} from "@/lib/tete-data";

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
};

export type BookingStatus = "Đã xác nhận" | "Chờ cọc" | "Đang ở" | "Hoàn tất";

export type BookingSnapshot = {
  id: string;
  guestName: string;
  room: Room;
  branch: Branch;
  dateLabel: string;
  timeRange: string;
  channel: string;
  status: BookingStatus;
  amount: number;
};

export type BranchSummary = {
  branch: Branch;
  city: string;
  address: string;
  roomCount: number;
  averageFrom: number;
  topRoom: Room | null;
  status: "Đang mở" | "Tạm ngưng";
  classic: boolean;
};

export type RoomSummary = {
  room: Room;
  branch: Branch;
  amenityCount: number;
  priceBand: string;
  highlight: string;
  isFeatured: boolean;
};

export type TrendPoint = {
  month: string;
  bookings: number;
  premium: number;
  occupancy: number;
};

export type AlertItem = {
  title: string;
  detail: string;
  tone: "info" | "warning" | "critical";
};

export type GuestSummary = {
  guestName: string;
  bookings: number;
  branches: string[];
  latestStay: string;
  totalSpent: number;
};

const bookingStatuses: BookingStatus[] = ["Đã xác nhận", "Chờ cọc", "Đang ở", "Hoàn tất"];
const bookingChannels = ["Đặt trực tiếp", "Zalo", "Facebook", "Khách quay lại"];
const guestNames = [
  "Minh Anh",
  "Hoàng Nam",
  "Thảo Vy",
  "Gia Huy",
  "Ngọc Linh",
  "Quang Minh",
  "Thùy Trang",
  "Văn Phúc"
];
const timeSlots = [
  "08:00 - 11:00",
  "11:15 - 14:15",
  "14:30 - 17:30",
  "17:45 - 20:45",
  "21:00 - 00:00"
];
const months = ["T1", "T2", "T3", "T4", "T5", "T6"];

function activeCatalogRooms() {
  return rooms.filter((room) => room.is_classic === 0);
}

function splitBranchName(name: string) {
  const [city, ...rest] = name.split(" - ");

  return {
    city,
    address: rest.join(" - ") || name
  };
}

function getPriceBand(priceFrom: number) {
  if (priceFrom < 200000) return "Dưới 200k";
  if (priceFrom < 250000) return "200k - 249k";
  if (priceFrom < 300000) return "250k - 299k";
  return "Từ 300k";
}

export function getDashboardMetrics(): DashboardMetric[] {
  const catalogRooms = activeCatalogRooms();
  const averagePriceFrom = Math.round(
    catalogRooms.reduce((sum, room) => sum + room.price_from, 0) / Math.max(catalogRooms.length, 1)
  );
  const premiumRooms = catalogRooms.filter((room) => room.price_from >= 250000).length;
  const contentCompleteRooms = catalogRooms.filter((room) => room.images.length > 1).length;

  return [
    {
      label: "Chi nhánh đang mở",
      value: String(activeBranches.length),
      note: `${branches.length} cơ sở trong hệ thống`
    },
    {
      label: "Phòng đang bán",
      value: String(catalogRooms.length),
      note: `Tổng ${rooms.length} phòng trong catalogue`
    },
    {
      label: "Giá khởi điểm TB",
      value: `${money(averagePriceFrom)}đ`,
      note: "Dựa trên các phòng đang active"
    },
    {
      label: "Phòng đủ nội dung",
      value: String(contentCompleteRooms),
      note: `${premiumRooms} phòng premium từ 250k`
    }
  ];
}

export function getBranchSummaries(limit = 6): BranchSummary[] {
  return [...branches]
    .map((branch) => {
      const branchRooms = activeCatalogRooms().filter((room) => room.branch_id === branch.id);
      const { city, address } = splitBranchName(branch.name);
      const averageFrom = branchRooms.length
        ? Math.round(branchRooms.reduce((sum, room) => sum + room.price_from, 0) / branchRooms.length)
        : 0;

      return {
        branch,
        city,
        address,
        roomCount: branchRooms.length,
        averageFrom,
        topRoom: branchRooms.sort((a, b) => b.price_from - a.price_from)[0] ?? null,
        status: branch.active === 1 ? ("Đang mở" as const) : ("Tạm ngưng" as const),
        classic: branch.classic_booking_enabled === 1
      };
    })
    .sort((a, b) => b.roomCount - a.roomCount || b.averageFrom - a.averageFrom)
    .slice(0, limit);
}

export function getRoomSummaries(limit = 8): RoomSummary[] {
  return [...activeCatalogRooms()]
    .sort((a, b) => b.price_from - a.price_from || b.room_amenities.length - a.room_amenities.length)
    .slice(0, limit)
    .map((room) => {
      const branch = branches.find((item) => item.id === room.branch_id) ?? activeBranches[0];
      const amenityCount = room.room_amenities.length;

      return {
        room,
        branch,
        amenityCount,
        priceBand: getPriceBand(room.price_from),
        highlight: room.room_amenities[0] ?? "Chưa gắn tiện ích",
        isFeatured: room.price_from >= 250000 || amenityCount >= 8
      };
    });
}

export function getBookingSnapshots(limit = 12): BookingSnapshot[] {
  const catalogRooms = activeCatalogRooms();

  return catalogRooms.slice(0, limit).map((room, index) => {
    const branch = branches.find((item) => item.id === room.branch_id) ?? activeBranches[0];
    const date = new Date();
    date.setDate(date.getDate() + index - 2);

    return {
      id: `BK-${room.id}-${index + 1}`,
      guestName: guestNames[index % guestNames.length],
      room,
      branch,
      dateLabel: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }),
      timeRange: timeSlots[index % timeSlots.length],
      channel: bookingChannels[index % bookingChannels.length],
      status: bookingStatuses[index % bookingStatuses.length],
      amount: room.price_from + (index % 3) * 20000
    };
  });
}

export function getBookingStatusSummary(limit = 12) {
  const snapshots = getBookingSnapshots(limit);

  return bookingStatuses.map((status) => {
    const count = snapshots.filter((snapshot) => snapshot.status === status).length;

    return {
      status,
      count,
      share: snapshots.length ? Math.round((count / snapshots.length) * 100) : 0
    };
  });
}

export function getPriceBands() {
  const catalogRooms = activeCatalogRooms();
  const bands = [
    {
      label: "Dưới 200k",
      count: catalogRooms.filter((room) => room.price_from < 200000).length
    },
    {
      label: "200k - 249k",
      count: catalogRooms.filter((room) => room.price_from >= 200000 && room.price_from < 250000).length
    },
    {
      label: "250k - 299k",
      count: catalogRooms.filter((room) => room.price_from >= 250000 && room.price_from < 300000).length
    },
    {
      label: "Từ 300k",
      count: catalogRooms.filter((room) => room.price_from >= 300000).length
    }
  ];

  return bands.map((band) => ({
    ...band,
    share: catalogRooms.length ? Math.round((band.count / catalogRooms.length) * 100) : 0
  }));
}

export function getAmenityLeaderboard(limit = 6) {
  const tally = new Map<string, number>();

  for (const room of activeCatalogRooms()) {
    for (const amenity of room.room_amenities) {
      const key = amenity.trim();
      tally.set(key, (tally.get(key) ?? 0) + 1);
    }
  }

  return [...tally.entries()]
    .map(([label, count]) => ({
      label,
      count,
      share: activeCatalogRooms().length ? Math.round((count / activeCatalogRooms().length) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "vi"))
    .slice(0, limit);
}

export function getTrendPoints(): TrendPoint[] {
  const catalogRooms = activeCatalogRooms();
  const base = Math.max(catalogRooms.length, 1);

  return months.map((month, index) => {
    const bookings = Math.round(base * (0.28 + index * 0.045));
    const premium = Math.round(
      (catalogRooms.filter((room) => room.price_from >= 250000).length || 1) * (0.65 + index * 0.04)
    );
    const occupancy = Math.min(100, Math.round(46 + index * 5 + (base % 7) * 2));

    return {
      month,
      bookings,
      premium,
      occupancy
    };
  });
}

export function getOperationalAlerts(limit = 6): AlertItem[] {
  const alerts: AlertItem[] = [];
  const placeholderRooms = activeCatalogRooms().filter((room) => room.main_image.includes("placehold.co"));
  const emptyAmenityRooms = activeCatalogRooms().filter((room) => room.room_amenities.length === 0);
  const inactiveBranches = branches.filter((branch) => branch.active === 0);
  const classicOffBranches = activeBranches.filter((branch) => branch.classic_booking_enabled === 0);

  if (placeholderRooms.length > 0) {
    alerts.push({
      title: "Ảnh phòng còn placeholder",
      detail: `${placeholderRooms.length} phòng vẫn đang dùng ảnh mẫu, nên thay trước khi đẩy lên site.`,
      tone: "warning"
    });
  }

  if (emptyAmenityRooms.length > 0) {
    alerts.push({
      title: "Phòng thiếu tiện ích",
      detail: `${emptyAmenityRooms.length} phòng chưa gắn tiện ích, dễ làm nội dung bị mỏng.`,
      tone: "critical"
    });
  }

  if (inactiveBranches.length > 0) {
    alerts.push({
      title: "Chi nhánh tạm ngưng",
      detail: `${inactiveBranches.length} cơ sở đang tắt trạng thái hoạt động.`,
      tone: "info"
    });
  }

  if (classicOffBranches.length > 0) {
    alerts.push({
      title: "Chưa bật booking classic",
      detail: `${classicOffBranches.length} chi nhánh đang chờ kích hoạt booking theo giờ.`,
      tone: "warning"
    });
  }

  const premiumRooms = activeCatalogRooms().filter((room) => room.price_from >= 250000).length;
  alerts.push({
    title: "Ưu tiên phòng premium",
    detail: `${premiumRooms} phòng có giá từ 250k trở lên, nên đưa lên vị trí nổi bật.`,
    tone: "info"
  });

  return alerts.slice(0, limit);
}

export function getRevenueSummary(limit = 12) {
  const bookings = getBookingSnapshots(limit);
  const total = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const average = bookings.length ? Math.round(total / bookings.length) : 0;
  const highest = bookings.reduce((max, booking) => Math.max(max, booking.amount), 0);
  const lowest = bookings.reduce((min, booking) => Math.min(min, booking.amount), bookings[0]?.amount ?? 0);

  return {
    total,
    average,
    highest,
    lowest,
    bookings
  };
}

export function getGuestSummaries(limit = 8): GuestSummary[] {
  const bookings = getBookingSnapshots(18);
  const guests = new Map<string, GuestSummary>();

  for (const booking of bookings) {
    const current = guests.get(booking.guestName);
    const nextTotal = (current?.totalSpent ?? 0) + booking.amount;
    const nextBookings = (current?.bookings ?? 0) + 1;
    const nextBranches = new Set([...(current?.branches ?? []), booking.branch.name]);

    guests.set(booking.guestName, {
      guestName: booking.guestName,
      bookings: nextBookings,
      branches: [...nextBranches],
      latestStay: booking.dateLabel,
      totalSpent: nextTotal
    });
  }

  return [...guests.values()]
    .sort((a, b) => b.totalSpent - a.totalSpent || b.bookings - a.bookings || a.guestName.localeCompare(b.guestName, "vi"))
    .slice(0, limit);
}

export function moneyRange(room: Room) {
  return `${money(room.price_from)}đ - ${money(room.price_to)}đ`;
}
