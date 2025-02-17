import { Serialport, ReadlineParser } from "serialport";
import mqtt from "mqtt";

const SERIAL_PORT = "/dev/ttyUSB0";
const BAUD_RATE = 9600;

const MQTT_BROKER = "mqtt://thingsboard.cloud";
const ACCESS_TOKEN = "";

const client = mqtt.connect(MQTT_BROKER, {
  username: ACCESS_TOKEN,
});

client.on("connect", () => {
  console.log("connected to thingsboard mqtt");
});
