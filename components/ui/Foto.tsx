import Image, { type ImageProps } from "next/image";
import { MOSTRAR_FOTOS } from "@/lib/brand";
import { MAQUETA, fotoAmbiente } from "@/lib/maqueta";

/**
 * Envoltura de next/image que respeta el interruptor MOSTRAR_FOTOS (lib/brand.ts).
 * Con la maqueta local activa, las fotos del sitio (salvo logos) se sustituyen por las de referencia.
 */
export function Foto(props: ImageProps) {
  if (!MOSTRAR_FOTOS) return null;
  let src = props.src;
  if (MAQUETA && typeof src === "string" && !src.startsWith("/maqueta/") && !src.startsWith("/brand/")) {
    src = fotoAmbiente(String(props.alt || "") + src);
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} src={src} />;
}
