"use client";
import type { MenuItem } from "@/types/menu";
import { buttonVariants } from "@components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import { slugify } from "@lib/slugify";
import { cn } from "@lib/utils";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
export function MenuItem(props: {
  variant?: "main" | "secondary";
  menu: MenuItem;
  active?: boolean;
  level?: number;
  parentLink?: string;
}) {
  const { menu, variant = "main", active, level = 0, parentLink } = props;
  const pathname = usePathname();
  const useCategoryQuery =
    (menu as MenuItem & { useCategoryQuery?: boolean }).useCategoryQuery ===
    true;
  const linkId = useMemo(() => `trigger_${menu.id}`, [menu.id]);
  const hoverCardRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element) return;
      element.style.minWidth = `${
        document.getElementById(linkId)?.offsetWidth ?? 0
      }px`;
    },
    [linkId]
  );

  const childItems =
    (menu as MenuItem & { categories?: MenuItem[] }).children ||
    (menu as MenuItem & { categories?: MenuItem[] }).categories ||
    [];
  const hasChildren = childItems.length > 0;

  const menuLink = useMemo(() => {
    if (useCategoryQuery && level > 0 && parentLink) {
      const categoryId =
        (menu as MenuItem & { id?: string }).id || slugify(menu.name);
      return `${parentLink}?category=${categoryId}`;
    }

    if (menu.link) {
      return menu.link.startsWith("/") ? menu.link : `/${menu.link}`;
    }

    const menuWithCode = menu as MenuItem & { code?: string };
    if (menuWithCode.code) {
      const code = menuWithCode.code;
      return code.startsWith("/") ? code : `/${code}`;
    }

    return `/${slugify(menu.name)}`;
  }, [menu, level, parentLink, useCategoryQuery]);

  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Link
          aria-selected={active || pathname == menuLink}
          id={linkId}
          target={menuLink.startsWith("/") ? "_self" : "_blank"}
          href={menuLink}
          className={cn(menuItemTriggerVariant({ variant }), "group")}
        >
          <span className="inline-flex items-center gap-2">
            <span>{menu.name}</span>
            {hasChildren && (
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            )}
          </span>
        </Link>
      </HoverCardTrigger>

      {hasChildren && (
        <HoverCardContent
          ref={hoverCardRef}
          className={cn(menuItemHoverBoxVariant({ variant }), "z-[100]")}
          side={level >= 1 ? "right" : "bottom"}
          align={level >= 1 ? "start" : "center"}
          sideOffset={8}
          alignOffset={0}
          collisionPadding={16}
          avoidCollisions={true}
          forceMount={undefined}
        >
          {childItems.map((subMenu: MenuItem & { categories?: MenuItem[] }) => {
            const subMenuWithId = subMenu as MenuItem & { id?: string };
            const subMenuUseCategoryQuery = (subMenuWithId as MenuItem & { useCategoryQuery?: boolean }).useCategoryQuery === true;
            const subMenuLink = subMenuWithId.id
              ? `${menu.link}?category=${subMenuWithId.id}`
              : `${menu.link}?category=${slugify(subMenu.name)}`;

            return (subMenu.children && subMenu.children.length > 0) ||
              ((subMenu as MenuItem & { categories?: MenuItem[] }).categories &&
                (subMenu as MenuItem & { categories?: MenuItem[] }).categories!
                  .length > 0) ? (
              <MenuItem
                key={subMenu.id}
                menu={subMenu}
                variant={variant}
                level={level + 1}
                parentLink={menu.link}
              />
            ) : (
              <Link
                key={subMenu.id}
                href={subMenuUseCategoryQuery ? subMenuLink : (subMenu.link ? (subMenu.link.startsWith("/") ? subMenu.link : `/${subMenu.link}`) : `/${slugify(subMenu.name)}`)}
                className={menuItemChildVariant({ variant })}
              >
                {subMenu.name}
              </Link>
            );
          })}
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

const menuItemTriggerVariant = cva(
  cn(
    buttonVariants({ variant: "ghost" }),
    "focus-visible:ring-0 focus-visible:ring-offset-0"
  ),
  {
    variants: {
      variant: {
        main: cn(
          "text-blue-800 !text-base !font-medium tracking-tight hover:text-blue-600 hover:bg-gray-100 hover:rounded-full uppercase",
          "aria-selected:text-white aria-selected:!font-semibold aria-selected:bg-blue-600 aria-selected:rounded-full aria-selected:shadow-md"
        ),
        secondary: cn(
          "text-primary border-t-2 border-t-transparent rounded-none",
          "hover:text-primary/90",
          "aria-selected:border-t-secondary aria-selected:bg-accent",
          "aria-selected:bg-[#2563EB]"
        ),
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);

const menuItemHoverBoxVariant = cva(
  "flex w-full flex-col gap-0.5 p-3 min-w-[220px]",
  {
    variants: {
      variant: {
        main: "bg-white border border-gray-200 shadow-lg rounded-lg",
        secondary: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);

const menuItemChildVariant = cva(
  cn(
    buttonVariants({ variant: "ghost" }),
    "justify-start text-sm font-normal py-2.5 px-3 rounded-md transition-colors duration-150 uppercase"
  ),
  {
    variants: {
      variant: {
        main: "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
        secondary: "text-accent-foreground hover:text-primary/90",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);
