
import client from "prom-client";

export const intentsTotal = new client.Counter({
  name: "uip_intents_total",
  help: "Total intents processed"
});

export const engineLatency = new client.Histogram({
  name: "uip_engine_latency",
  help: "Engine execution latency"
});
