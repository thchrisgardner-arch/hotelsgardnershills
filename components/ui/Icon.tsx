import {
  Droplets,
  Footprints,
  Landmark,
  Moon,
  Mountain,
  Music,
  Sunrise,
  Trees,
  UtensilsCrossed,
  type LucideProps,
} from "lucide-react";

/** Iconografía única: Lucide en trazo fino (1.1) para todo el sitio */
const map = {
  moon: Moon,
  trees: Trees,
  utensils: UtensilsCrossed,
  sunrise: Sunrise,
  mountain: Mountain,
  music: Music,
  footprints: Footprints,
  droplets: Droplets,
  landmark: Landmark,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.1} aria-hidden {...props} />;
}
