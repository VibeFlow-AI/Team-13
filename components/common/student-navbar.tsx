"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// shadcn-ui components from ui folder
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface StudentNavbarProps {
  /** Pending/upcoming sessions badge */
  sessionCount?: number;
  /** Whether to display onboarding banner */
  onboardingIncomplete?: boolean;
  /** User display name */
  userName?: string;
  /** Avatar image URL */
  avatarUrl?: string;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find Mentors", href: "/mentors" },
  { label: "My Sessions", href: "/sessions" },
  { label: "Messages", href: "/messages" },
];

export default function StudentNavbar({
  sessionCount = 0,
  onboardingIncomplete = false,
  userName = "Student",
  avatarUrl,
}: StudentNavbarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);
  const [mobileOpen, setMobileOpen] = useState(false);

  const MobileMenu = (
    <ul className="flex flex-col gap-4 text-base">
      {navItems.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
              isActive(href) && "bg-accent text-accent-foreground"
            )}
          >
            {label}
            {label === "My Sessions" && sessionCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {sessionCount}
              </Badge>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            EduVibe
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {navItems.map(({ label, href }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                          isActive(href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        {label}
                        {label === "My Sessions" && sessionCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {sessionCount}
                          </Badge>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 rounded-md hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-8">
              {MobileMenu}
            </SheetContent>
          </Sheet>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md p-1 focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="User avatar" />
                  ) : (
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden text-sm font-medium md:inline-block">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Account Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help &amp; Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" asChild>
                <Link href="/logout" className="flex items-center gap-2">
                  <LogOutIcon className="size-4" /> Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Onboarding banner */}
      {onboardingIncomplete && (
        <div className="bg-yellow-50 py-2 text-center text-sm text-yellow-900">
          Complete your onboarding to get personalized mentor recommendations!
        </div>
      )}
    </header>
  );
}
