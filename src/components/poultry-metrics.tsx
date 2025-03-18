"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bird,
  Scale,
  Skull,
  Target,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { poultryData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PoultryMetrics() {
  const totalBirdsSlaughtered = poultryData.reduce(
    (sum, item) => sum + item.birdsSlaughtered,
    0
  );
  const totalSlaughteredWeight = poultryData.reduce(
    (sum, item) => sum + item.slaughteredWeight,
    0
  );
  const totalMortalityReceived = poultryData.reduce(
    (sum, item) => sum + item.mortalityReceived,
    0
  );
  const avgEfficiency =
    poultryData.reduce((sum, item) => sum + item.efficiency, 0) /
    poultryData.length;

  const metrics = [
    {
      title: "Aves Abatidas",
      value: totalBirdsSlaughtered.toLocaleString(),
      target: 50000,
      change: 5.2,
      icon: Bird,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Peso Total",
      value: `${(totalSlaughteredWeight / 1000).toFixed(1)}t`,
      target: 150000,
      change: -2.3,
      icon: Scale,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Mortalidade",
      value: totalMortalityReceived.toLocaleString(),
      target: 1000,
      change: 1.8,
      icon: Skull,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Eficiência",
      value: `${avgEfficiency.toFixed(1)}%`,
      target: 98,
      change: 0.5,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <div className={cn("absolute inset-0 opacity-10", metric.bgColor)} />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className={cn("h-4 w-4", metric.color)} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span
                  className={cn(
                    "flex items-center text-xs",
                    metric.change > 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {metric.change > 0 ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <AlertCircle className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
              </div>
              <Progress
                value={
                  (parseFloat(metric.value.replace(/[^\d.-]/g, "")) /
                    metric.target) *
                  100
                }
                className="h-1"
              />
              <p className="text-xs text-muted-foreground">
                Meta: {metric.target.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
