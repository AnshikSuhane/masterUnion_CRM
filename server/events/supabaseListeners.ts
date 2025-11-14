
import { Server } from "socket.io";
import { supabase } from "../config/supbase";


 const listenToSupabaseEvents = (io: Server) => {
  const channel = supabase
    .channel("public:lead_changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "Lead" }, (payload) => {
      try {
        const data = payload.new ?? payload.old ?? null;
        io.emit("lead:refresh", { event: payload.eventType, data });
      } catch (e) {
        console.error("Error handling supabase payload:", e);
      }
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        console.log("🟢 Subscribed to Supabase realtime for Lead table");
      } else {
        console.log("Supabase channel status:", status);
      }
    });

  return channel;
};

export default listenToSupabaseEvents;