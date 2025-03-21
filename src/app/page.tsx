import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ChickenCare Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden lg:block">
        {/* Background Image */}
        <Image
          src="/new-horizons-site.jpg"
          alt="Background image"
          fill
          priority
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/10 to-transparent z-10" />

        {/* Animated Shapes */}
        <div className="absolute inset-0 z-20">
          {/* Circle */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse delay-1000" />

          {/* Squares */}
          <div className="absolute right-1/4 top-1/4 h-64 w-64 rotate-12 bg-primary/5 blur-2xl animate-pulse delay-500" />
          <div className="absolute left-1/4 bottom-1/4 h-64 w-64 -rotate-12 bg-primary/5 blur-2xl animate-pulse delay-700" />

          {/* Triangles */}
          <div className="absolute right-1/3 bottom-1/3 h-0 w-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[173px] border-t-primary/10 blur-xl animate-pulse delay-300" />
          <div className="absolute left-1/3 top-1/3 h-0 w-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[173px] border-b-primary/10 blur-xl animate-pulse delay-900" />
        </div>

        {/* Additional Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-30" />
      </div>
    </div>
  );
}
