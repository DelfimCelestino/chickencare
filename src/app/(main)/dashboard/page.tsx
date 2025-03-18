import { PoultryMetrics } from "@/components/poultry-metrics";
import { CycleOverview } from "@/components/cycle-overview";
import { RecentActivity } from "@/components/recent-activity";
import { PoultryHouseTable } from "@/components/poultry-house-table";

export default function DashboardPage() {
  return (
    <div className="container p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Painel de Gestão Avícola
        </h1>
        <p className="text-muted-foreground">
          Monitore e gerencie seus aviários e métricas de produção.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PoultryMetrics />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CycleOverview className="lg:col-span-4" />
        <RecentActivity className="lg:col-span-3" />
      </div>

      <div>
        <PoultryHouseTable />
      </div>
    </div>
  );
}
