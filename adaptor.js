"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const SERIAL_PORT = '/dev/ttyUSB0';
const BAUD_RATE = 9600;
const MQTT_BROKER_IP = process.env.MQTT_BROKER_IP || 'localhost';
const MQTT_URL = `mqtt://{MQTT_BROKER_IP}:1883`;
const ACCESS_TOKEN = 'YC6o3ZWlSKhCBrI3TwRk'; // device access token
const client = mqtt_1.default.connect(MQTT_URL, {
    username: ACCESS_TOKEN,
});
let temperature = 20;
client.on('connect', () => {
    console.log('connected to thingsboard mqtt');
    setInterval(() => {
        temperature += 1; // 온도를 1씩 증가
        const payload = JSON.stringify({ temperature });
        client.publish('v1/devices/me/telemetry', payload, () => {
            console.log(`📡 Published: ${payload}`);
        });
    }, 1000); // 1초마다 실행
});
client.on('error', (err) => {
    console.error('Mqtt error:', err);
});
