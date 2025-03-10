import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 50, // 50 usuários simultâneos
  duration: "30s", // Teste dura 30 segundos
};

export default function () {
  let res = http.get("http://localhost:3000/videos");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "tempo de resposta menor que 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
