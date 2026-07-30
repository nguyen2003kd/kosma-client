export interface KosmoSpace {
  name: string;
  href: string;
  image: string;
  tagIds: string[];
}

/**
 * Mapping of KOSMO space slugs to their display info and tag IDs.
 * - `slug` is derived from the last path segment of `href`.
 * - `tagIds` will be used to fetch posts from the backend
 *   via GET /api/v1.0/post/by-tags/:tagIds.
 *
 * TODO: fill in the real tag IDs for each space.
 */
export const kosmoSpaces: KosmoSpace[] = [
  {
    name: "Interior Design",
    href: "/kosmo/spaces/closets",
    image: "/images/kosmo/living.jpg",
    tagIds: [
      "9c5d596e-369b-48cf-97b3-18f7c2809c8e"
    ]
  },
  {
    name: "Commercial Fit-Out",
    href: "/kosmo/spaces/garages",
    image: "/images/kosmo/showroom.jpg",
    tagIds: [
      "d7620550-dace-4836-8429-0c5103cacc37"
    ]
  },
  {
    name: "Residential Renovation",
    href: "/kosmo/spaces/home-offices",
    image: "/images/kosmo/office.jpg",
    tagIds: [
      "3cef5427-cb3a-4196-bcd1-c193c236b081"
    ]
  },
  {
    name: "Custom Joinery",
    href: "/kosmo/spaces/pantries",
    image: "/images/kosmo/kitchen.jpg",
    tagIds: [
      "6bec3c91-62d2-4f12-801c-94322abb04d9"
    ]
  },
  {
    name: "Construction Drawings",
    href: "/kosmo/spaces/laundry-rooms",
    image: "/images/kosmo/lounge.jpg",
    tagIds: [
      "5f19ad5e-9c37-4edf-a790-c804d7d34603"
    ]
  },
  {
    name: "Branding",
    href: "/kosmo/spaces/mudrooms",
    image: "/images/kosmo/living.jpg",
    tagIds: [
      "fc9a640d-2bb1-485d-ae07-66a9d15146c8"
    ]
  },
];

export const getSpaceBySlug = (slug: string): KosmoSpace | undefined =>
  kosmoSpaces.find((s) => s.href.endsWith(`/${slug}`));
