// loadtest-heavy.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp-up to 100 users
    { duration: '1m', target: 100 },  // Stay at 100 users
    { duration: '30s', target: 200 }, // Ramp-up to 200 users
    { duration: '1m', target: 200 },  // Stay at 200 users
    { duration: '30s', target: 0 },   // Ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% ของ request ควรเร็วกว่าภายใน 1 วินาที
  },
};

export default function () {
  const res = http.get('https://api.prodspace.online/api/galleries');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1); // delay เล็กน้อยระหว่างรอบ
}
