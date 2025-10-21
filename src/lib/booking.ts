// src/lib/booking.ts
import { BOOKING_URL } from "@/config/links";
export const openBooking = () => window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
