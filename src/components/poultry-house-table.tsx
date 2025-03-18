"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Download,
  Search,
  Bird,
  Activity,
  Scale,
  AlertTriangle,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { poultryData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PoultryHouseTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("all");

  // Calculate statistics
  const totalBirds = poultryData.reduce(
    (acc, curr) => acc + curr.birdsSlaughtered,
    0
  );
  const avgEfficiency =
    poultryData.reduce((acc, curr) => {
      const efficiency =
        (curr.birdsSlaughtered /
          (curr.birdsSlaughtered + curr.mortalityReceived)) *
        100;
      return acc + efficiency;
    }, 0) / poultryData.length;
  const totalWeight = poultryData.reduce(
    (acc, curr) => acc + curr.slaughteredWeight,
    0
  );
  const avgLoss =
    poultryData.reduce((acc, curr) => acc + curr.lossPercentage, 0) /
    poultryData.length;

  // Filter data based on search term and view
  const filteredData = poultryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cycle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchTerm.toLowerCase());

    if (view === "all") return matchesSearch;
    return matchesSearch && item.status === view;
  });

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Birds</CardTitle>
            <Bird className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBirds.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all houses</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Efficiency
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgEfficiency.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Performance metric</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
            <Scale className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalWeight / 1000).toFixed(1)}t
            </div>
            <p className="text-xs text-muted-foreground">Slaughtered weight</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Loss</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgLoss.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Mortality rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Poultry Houses</CardTitle>
                <CardDescription>
                  Manage and monitor all your poultry houses and their cycles
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync
                </Button>
                <Button variant="default" size="sm" className="h-8">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search houses or cycles..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs
                value={view}
                onValueChange={setView}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full sm:w-auto grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem checked>
                      Name
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Cycle
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Age
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Birds Slaughtered
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Slaughtered Weight
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Mortality
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Loss %
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Breed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Cycle</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">
                    Birds Slaughtered
                  </TableHead>
                  <TableHead className="text-right">
                    Slaughtered Weight
                  </TableHead>
                  <TableHead className="text-right">Mortality</TableHead>
                  <TableHead className="text-right">Loss %</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.cycle}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell className="text-right">
                      {item.birdsSlaughtered.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.slaughteredWeight.toLocaleString()}kg
                    </TableCell>
                    <TableCell className="text-right">
                      {item.mortalityReceived}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.lossPercentage}%
                    </TableCell>
                    <TableCell>{item.breed}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "active" ? "default" : "secondary"
                        }
                        className={cn(
                          "capitalize",
                          item.status === "active" &&
                            "bg-green-500/10 text-green-500 hover:bg-green-500/15",
                          item.status === "completed" &&
                            "bg-gray-500/10 text-gray-500 hover:bg-gray-500/15"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
