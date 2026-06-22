import OverviewLayout from "@/starter/app/dashboard/overview/layout";
import AreaStats from "@/starter/app/dashboard/overview/@area_stats/page";
import BarStats from "@/starter/app/dashboard/overview/@bar_stats/page";
import PieStats from "@/starter/app/dashboard/overview/@pie_stats/page";
import Sales from "@/starter/app/dashboard/overview/@sales/page";

export default function DashboardPage() {
  return (
    <OverviewLayout
      sales={<Sales />}
      pie_stats={<PieStats />}
      bar_stats={<BarStats />}
      area_stats={<AreaStats />}
    />
  );
}
