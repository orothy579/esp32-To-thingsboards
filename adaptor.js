"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mqtt_1 = __importDefault(require("mqtt"));
const SERIAL_PORT = '/dev/ttyUSB0';
const BAUD_RATE = 9600;
const MQTT_BROKER_IP = process.env.MQTT_BROKER_IP || 'localhost';
const MQTT_URL = `mqtt://{MQTT_BROKER_IP}:1883`;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // device access token
const client = mqtt_1.default.connect(MQTT_URL, {
    username: ACCESS_TOKEN,
});
let temp = 20;
client.on('connect', () => {
    console.log('connected to thingsboard mqtt');
    setInterval(() => {
        temp += 1;
        const payload = JSON.stringify({ temp });
        client.publish('v1/devices/me/telemetry', payload, () => {
            console.log(`📡 Published: ${payload}`);
        });
    }, 1000);
});
client.on('error', (err) => {
    console.error('Mqtt error:', err);
});
