import { HardHat, Ruler } from "lucide-react";

export type SolutionType = "design" | "construction";

export interface SolutionTypeDef {
  id: SolutionType;
  label: string;
  categoryUrl: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Ruler;
}

export const SOLUTION_TYPES: SolutionTypeDef[] = [
  {
    id: "design",
    label: "Design",
    categoryUrl: "/solutions/design",
    href: "/solutions/design",
    eyebrow: "Design Gallery",
    title: "Browse Design Drawings",
    description:
      "A curated gallery of design drawings for you to browse and reference — find inspiration and the right look for your space.",
    image: "/images/living.jpg",
    icon: Ruler,
  },
  {
    id: "construction",
    label: "Construction",
    categoryUrl: "/solutions/construction",
    href: "/solutions/construction",
    eyebrow: "Craftsmanship & Technology",
    title: "Built by Skilled Hands",
    description:
      "Design-build construction combining licensed trades crews with modern technology — BIM, laser layout, and precision quality control on every project.",
    image: "/images/living.jpg",
    icon: HardHat,
  },
];
