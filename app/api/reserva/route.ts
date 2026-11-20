import { NextResponse } from "next/server";

/**
 * Recibe las solicitudes de reserva del sitio y las envía por correo al hotel.
 *
 * Usa Resend (https://resend.com) si están configuradas en Vercel:
 *   RESEND_API_KEY   → clave de la cuenta
 *   RESERVAS_EMAIL   → correo del hotel que recibe las solicitudes (p. ej. hotel@gardnerhills.co)
 *   RESERVAS_FROM    → remitente verificado en Resend (p. ej. "Gardners Hills <reservas@gardnerhills.co>")
 * Sin esas variables responde 503 y la página ofrece enviar la solicitud por correo o WhatsApp.
 */
type Solicitud = {
  cabana?: string;
  llegada?: string;
  salida?: string;
  adultos?: number;
  ninos?: number;
  codigo?: string;
  nombre?: string;
  correo?: string;
  telefono?: string;
  pais?: string;
  notas?: string;
  idioma?: string;
  resumen?: string;
};

const limpio = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max).trim() : "");

export async function POST(req: Request) {
  let body: Solicitud;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  const nombre = limpio(body.nombre, 120);
  const correo = limpio(body.correo, 160);
  const llegada = limpio(body.llegada, 10);
  const salida = limpio(body.salida, 10);
  if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !/^\d{4}-\d{2}-\d{2}$/.test(llegada) || !/^\d{4}-\d{2}-\d{2}$/.test(salida)) {
    return NextResponse.json({ ok: false, error: "datos" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESERVAS_EMAIL;
  const from = process.env.RESERVAS_FROM;
  if (!key || !to || !from) {
    return NextResponse.json({ ok: false, error: "sin-configurar" }, { status: 503 });
  }

  const resumen = limpio(body.resumen, 4000);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: correo,
      subject: `Solicitud de reserva · ${limpio(body.cabana, 80) || "Gardners Hills"} · ${llegada} → ${salida}`,
      text: resumen,
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, error: "envio" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
