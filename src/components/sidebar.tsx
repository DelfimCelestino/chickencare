"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bird,
  Calendar,
  ClipboardList,
  Egg,
  FileText,
  Home,
  LineChart,
  LogOut,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChickenCareSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-card overflow-y-auto shrink-0">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-card">
        <div className="flex items-center gap-2 px-4 py-3">
          <Bird className="h-6 w-6 text-primary" />
          <div className="font-bold text-xl">ChickenCare</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Main Section */}
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Principal
          </div>
          <nav className="space-y-1 mt-1">
            <NavLink
              href="/dashboard"
              icon={Home}
              isActive={pathname === "/dashboard"}
            >
              Painel Principal
            </NavLink>
            <NavLink
              href="/analytics"
              icon={BarChart3}
              isActive={pathname === "/analytics"}
            >
              Análise de Dados
            </NavLink>
            <NavLink
              href="/reports"
              icon={FileText}
              isActive={pathname === "/reports"}
            >
              Relatórios
            </NavLink>
          </nav>
        </div>

        <div className="mx-3 my-2 h-px bg-border" />

        {/* Bird Management Section */}
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Gestão de Aves
          </div>
          <nav className="space-y-1 mt-1">
            <NavLink
              href="/houses"
              icon={Bird}
              isActive={pathname === "/houses"}
            >
              Aviários
            </NavLink>
            <NavLink
              href="/cycles"
              icon={Calendar}
              isActive={pathname === "/cycles"}
            >
              Ciclos de Produção
            </NavLink>
            <NavLink
              href="/production"
              icon={Egg}
              isActive={pathname === "/production"}
            >
              Produção
            </NavLink>
            <NavLink
              href="/health"
              icon={ClipboardList}
              isActive={pathname === "/health"}
            >
              Saúde e Vacinação
            </NavLink>
          </nav>
        </div>

        <div className="mx-3 my-2 h-px bg-border" />

        {/* Operations Section */}
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Operações
          </div>
          <nav className="space-y-1 mt-1">
            <NavLink
              href="/inventory"
              icon={ClipboardList}
              isActive={pathname === "/inventory"}
            >
              Estoque e Ração
            </NavLink>
            <NavLink
              href="/logistics"
              icon={Truck}
              isActive={pathname === "/logistics"}
            >
              Logística
            </NavLink>
            <NavLink
              href="/staff"
              icon={Users}
              isActive={pathname === "/staff"}
            >
              Equipe
            </NavLink>
            <NavLink
              href="/performance"
              icon={LineChart}
              isActive={pathname === "/performance"}
            >
              Desempenho
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="px-3 py-2">
          <nav className="space-y-1">
            <NavLink
              href="/settings"
              icon={Settings}
              isActive={pathname === "/settings"}
            >
              Configurações
            </NavLink>
          </nav>
        </div>

        <div className="mx-3 my-2 h-px bg-border" />

        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage
                src="https://github.com/delfimcelestino.png"
                alt="Delfim Celestino"
              />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Delfim Celestino</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-0"
            asChild
          >
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
  children: React.ReactNode;
}

function NavLink({ href, icon: Icon, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
}
