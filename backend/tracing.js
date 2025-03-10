const { NodeSDK } = require("@opentelemetry/sdk-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { FastifyInstrumentation } = require("@opentelemetry/instrumentation-fastify");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces", // URL do Jaeger ou OTEL Collector
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [
    new FastifyInstrumentation(), // Rastreia requisições do Fastify
  ],
});

sdk.start();
console.log(" OpenTelemetry configurado e rodando!");
