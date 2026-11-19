import Image, { type ImageProps } from "next/image";
import { MOSTRAR_FOTOS } from "@/lib/brand";

/** Envoltura de next/image que respeta el interruptor MOSTRAR_FOTOS (lib/brand.ts) */
export function Foto(props: ImageProps) {
  if (!MOSTRAR_FOTOS) return null;
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
}
