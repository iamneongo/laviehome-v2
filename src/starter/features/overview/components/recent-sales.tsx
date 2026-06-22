import { Avatar, AvatarFallback } from '@/starter/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/starter/components/ui/card';
import { getBookingSnapshots } from '@/lib/homestay-dashboard';
import { money } from '@/lib/tete-data';

export function RecentSales() {
  const bookings = getBookingSnapshots(6);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Booking gần đây</CardTitle>
        <CardDescription>6 lượt đặt mẫu mới nhất theo dữ liệu catalogue hiện tại.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {bookings.map((booking) => {
            const initials = booking.guestName
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('');

            return (
              <div key={booking.id} className='flex items-center'>
                <Avatar className='h-9 w-9'>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm leading-none font-medium'>{booking.guestName}</p>
                  <p className='text-muted-foreground text-sm'>
                    {booking.room.card_name} · {booking.branch.name}
                  </p>
                </div>
                <div className='ml-auto text-right font-medium'>
                  <p>{money(booking.amount)}đ</p>
                  <p className='text-muted-foreground text-xs'>{booking.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
