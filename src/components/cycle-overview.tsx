"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { poultryData } from "@/lib/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

type CycleOverviewProps = React.HTMLAttributes<HTMLDivElement>;

type CycleData = {
  cycle: string;
  birdsSlaughtered: number;
  slaughteredWeight: number;
  mortalityReceived: number;
  efficiency: number;
  feedConsumption: number;
  count: number;
  fcr?: number;
};

export function CycleOverview({ className, ...props }: CycleOverviewProps) {
  const chart1Color = "hsl(var(--chart-1))";
  const chart2Color = "hsl(var(--chart-2))";
  const destructiveColor = "hsl(var(--destructive))";

  const cycleData = poultryData.reduce((acc, item) => {
    if (!acc[item.cycle]) {
      acc[item.cycle] = {
        cycle: item.cycle.replace("Cycle ", ""),
        birdsSlaughtered: 0,
        slaughteredWeight: 0,
        mortalityReceived: 0,
        efficiency: 0,
        feedConsumption: 0,
        count: 0,
      };
    }

    acc[item.cycle].birdsSlaughtered += item.birdsSlaughtered;
    acc[item.cycle].slaughteredWeight += item.slaughteredWeight;
    acc[item.cycle].mortalityReceived += item.mortalityReceived;
    acc[item.cycle].efficiency += item.efficiency;
    acc[item.cycle].feedConsumption += item.feedConsumption;
    acc[item.cycle].count += 1;

    return acc;
  }, {} as Record<string, CycleData>);

  Object.values(cycleData).forEach((cycle: CycleData) => {
    cycle.efficiency = cycle.efficiency / cycle.count;
    cycle.fcr = cycle.feedConsumption / cycle.slaughteredWeight;
  });

  const cycleArray = Object.values(cycleData)
    .sort((a: CycleData, b: CycleData) => {
      const numA = Number.parseInt(a.cycle);
      const numB = Number.parseInt(b.cycle);
      return numA - numB;
    })
    .slice(-10);

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Visão Geral dos Ciclos</CardTitle>
            <CardDescription>
              Análise comparativa entre ciclos de produção
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            Últimos 10 ciclos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="production">Produção</TabsTrigger>
            <TabsTrigger value="mortality">Mortalidade</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cycleArray}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="cycle"
                    tickFormatter={(value) => `Ciclo ${value}`}
                    stroke="hsl(var(--foreground))"
                  />
                  <YAxis yAxisId="left" stroke="hsl(var(--foreground))" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="efficiency"
                    name="Eficiência (%)"
                    stroke={chart1Color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="fcr"
                    name="Conversão Alimentar"
                    stroke={chart2Color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="production">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cycleArray}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="cycle"
                    tickFormatter={(value) => `Ciclo ${value}`}
                    stroke="hsl(var(--foreground))"
                  />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="birdsSlaughtered"
                    name="Aves Abatidas"
                    stroke={chart1Color}
                    fill={chart1Color}
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="slaughteredWeight"
                    name="Peso Total (kg)"
                    stroke={chart2Color}
                    fill={chart2Color}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="mortality">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cycleArray}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="cycle"
                    tickFormatter={(value) => `Ciclo ${value}`}
                    stroke="hsl(var(--foreground))"
                  />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="mortalityReceived"
                    name="Mortalidade"
                    fill={destructiveColor}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
