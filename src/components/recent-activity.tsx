"use client";

import type React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { poultryData } from "@/lib/data";
import {
  ArrowUpRight,
  ArrowDownRight,
  Thermometer,
  Droplets,
  Wheat,
} from "lucide-react";

type RecentActivityProps = React.HTMLAttributes<HTMLDivElement>;

export function RecentActivity({ className }: RecentActivityProps) {
  const recentEntries = [...poultryData]
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 5);

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Atividade Recente
          <Badge variant="outline" className="ml-2">
            Últimas 24h
          </Badge>
        </CardTitle>
        <CardDescription>
          Atualizações mais recentes dos aviários
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentEntries.map((entry, i) => (
            <div key={i} className="relative">
              {i !== recentEntries.length - 1 && (
                <span className="absolute left-4 top-10 h-full w-px bg-muted" />
              )}
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-primary" />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{entry.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(entry.lastUpdated), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Status do Aviário
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          entry.trend === "up"
                            ? "text-green-500"
                            : "text-red-500",
                          "flex items-center gap-1"
                        )}
                      >
                        {entry.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        Score {entry.healthScore}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3" />
                        {entry.temperature}°C
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        {entry.humidity}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Wheat className="h-3 w-3" />
                        {(entry.feedConsumption / 1000).toFixed(1)}t
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
