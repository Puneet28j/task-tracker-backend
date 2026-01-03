export function startPreventIdle(intervalMs = 12 * 60 * 1000) {
  const baseUrl = process.env.BACKEND_URL ?? "http://localhost:5000";
  const url = `${baseUrl}/health`;

  const ping = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      console.log(`[IdlePing] OK @ ${new Date().toISOString()}`);
    } catch (err) {
      console.error("[IdlePing] Failed:", err);
    }
  };

  ping();
  const id = setInterval(ping, intervalMs);
  return () => clearInterval(id);
}
