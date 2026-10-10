import { useSyncExternalStore } from "react";

const storageKey = "tutorin-activity-v1";
const listeners = new Set();
export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function relativeDate(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return dateKey(date);
}
const seedTransactions = [
  { id: "tx-9", title: "Sesi belajar - Matematika", detail: "Dengan Sarah Putri", amount: -12, date: relativeDate(-1) },
  { id: "tx-8", title: "Mengajar - Bahasa Inggris", detail: "Sesi bersama Nadia", amount: 12, date: relativeDate(-2) },
  { id: "tx-7", title: "Sesi belajar - Fisika", detail: "Dengan Angela Wilkins", amount: -12, date: relativeDate(-3) },
  { id: "tx-6", title: "Sesi belajar - Kalkulus", detail: "Dengan Angela Wilkins", amount: -12, date: relativeDate(-4) },
  { id: "tx-5", title: "Mengajar - Bahasa Inggris", detail: "Dua sesi bersama Raka", amount: 24, date: relativeDate(-5) },
  { id: "tx-4", title: "Sesi belajar - Kimia", detail: "Dengan Budi Santoso", amount: -12, date: relativeDate(-6) },
  { id: "tx-3", title: "Bonus belajar", detail: "Target belajar tercapai", amount: 10, date: relativeDate(-8) },
  { id: "tx-2", title: "Sesi belajar - Sejarah", detail: "Dengan Citra Mandira", amount: -10, date: relativeDate(-9) },
  { id: "tx-1", title: "Saldo awal", detail: "Kredit belajar Tutor.in", amount: 60, date: relativeDate(-14) },
];
const seedSessions = [
  { id: "session-1", subject: "Algoritma dan Pemrograman", tutor: "Bill Smith", date: relativeDate(0), time: "10:00", duration: 120, credits: 12, status: "Dikonfirmasi" },
  { id: "session-2", subject: "Fisika", tutor: "Angela Wilkins", date: relativeDate(1), time: "10:00", duration: 120, credits: 10, status: "Dikonfirmasi" },
  { id: "session-3", subject: "Matematika Diskrit", tutor: "Sara Pieters", date: relativeDate(1), time: "14:00", duration: 120, credits: 12, status: "Dikonfirmasi" },
  { id: "session-4", subject: "Matematika", tutor: "Sarah Putri", date: relativeDate(-1), time: "10:00", duration: 120, credits: 12, status: "Selesai" },
  { id: "session-5", subject: "Fisika", tutor: "Angela Wilkins", date: relativeDate(-3), time: "09:00", duration: 120, credits: 12, status: "Selesai" },
  { id: "session-6", subject: "Kalkulus", tutor: "Angela Wilkins", date: relativeDate(-4), time: "13:00", duration: 120, credits: 12, status: "Selesai" },
];

const teachingSessions = [
  { id: "teaching-1", role: "mentor", subject: "Bahasa Inggris", learner: "Nadia Putri", date: relativeDate(0), time: "16:00", duration: 60, credits: 12, status: "Dikonfirmasi" },
  { id: "teaching-2", role: "mentor", subject: "Percakapan Bahasa Inggris", learner: "Raka Aditya", date: relativeDate(1), time: "18:00", duration: 60, credits: 12, status: "Dikonfirmasi" },
  { id: "teaching-3", role: "mentor", subject: "Bahasa Inggris", learner: "Nadia Putri", date: relativeDate(-2), time: "16:00", duration: 60, credits: 12, status: "Selesai" },
  { id: "teaching-4", role: "mentor", subject: "Bahasa Inggris", learner: "Raka Aditya", date: relativeDate(-5), time: "13:00", duration: 120, credits: 24, status: "Selesai" },
];

function migrateSessionRoles(state) {
  const sessions = state.sessions.map((session) => ({ ...session, role: session.role === "mentor" ? "mentor" : "mentee" }));
  if (!state.sessionRolesVersion) {
    teachingSessions.forEach((session) => {
      if (!sessions.some((existing) => existing.id === session.id)) sessions.push(session);
    });
  }
  return { ...state, sessions, sessionRolesVersion: 1 };
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Array.isArray(saved.transactions) && Array.isArray(saved.sessions) &&
      saved.transactions.every((item) => item && typeof item.id === "string" && Number.isFinite(item.amount) && typeof item.date === "string") &&
      saved.sessions.every((item) => item && typeof item.id === "string" && typeof item.date === "string" && typeof item.status === "string")) return migrateSessionRoles(saved);
  } catch { /* Fall back to demo data when stored data cannot be read. */ }
  let bookings = [];
  try {
    const saved = JSON.parse(localStorage.getItem("tutorin-booking-requests"));
    if (Array.isArray(saved)) bookings = saved.filter((item) => item?.date && item?.time && item?.tutor && item?.subject)
      .map((item, index) => ({ ...item, id: `imported-${index}`, duration: 60, status: "Menunggu konfirmasi" }));
  } catch { /* Older bookings are optional. */ }
  return migrateSessionRoles({ transactions: seedTransactions, sessions: [...seedSessions, ...bookings] });
}
let snapshot = load();
function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }
function getSnapshot() { return snapshot; }
function commit(next) {
  localStorage.setItem(storageKey, JSON.stringify(next));
  snapshot = next;
  listeners.forEach((listener) => listener());
}
window.addEventListener("storage", (event) => {
  if (event.key === storageKey) { snapshot = load(); listeners.forEach((listener) => listener()); }
});
export function useTutorData() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  return { ...state, balance: state.transactions.reduce((sum, item) => sum + item.amount, 0) };
}
export function addBooking(booking) {
  commit({ ...snapshot, sessions: [...snapshot.sessions, { ...booking, role: "mentee", id: crypto.randomUUID(), duration: 60, status: "Menunggu konfirmasi" }] });
}
export function cancelSession(id) {
  commit({ ...snapshot, sessions: snapshot.sessions.map((session) => session.id === id && session.status === "Menunggu konfirmasi"
    ? { ...session, status: "Dibatalkan" } : session) });
}
export function completeDemoPurchase(order) {
  if (snapshot.transactions.some((item) => item.id === order.id)) return;
  commit({ ...snapshot, transactions: [{ id: order.id, title: `Pembelian kredit - ${order.name}`, detail: `Simulasi ${order.method}`,
    amount: order.credits + order.bonus, date: dateKey(new Date()) }, ...snapshot.transactions] });
}
export function formatDate(value, options = {}) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", ...options }).format(new Date(`${value}T00:00:00`));
}
