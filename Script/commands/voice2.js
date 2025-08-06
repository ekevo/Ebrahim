const axios = require("axios");
const fs = require("fs");
const request = require("request");

const emojiAudioMap = {
 "Nayeem": {
 url: "https://drive.google.com/uc?export=download&id=1cLH8jhll8IT_gH3MYCVaY_2xZa7Ca-sM",
 caption: "ggggggg ...Nayeem"
 },
 "Sharif": {
 url: "https://drive.google.com/uc?export=download&id=1L4ybAV5JDTHIuaAyKwZnu3SQcpGV0IhD",
 caption: "এক সময় প্রচুর হেন্ডেল মারতাম ... Sharif"
 },
 "Sorry ": {
 url: "https://drive.google.com/uc?export=download&id=1zyOn5zEGMd_N4-gpzQkVU5xZV0AokmJM",
 caption: "Sorry bellei ki sob seah hoya jai ... Sorry"
 },
 "🫦": {
 url: "https://drive.google.com/uc?export=download&id=1-wabirLTn3UxA6UVFNDJNcsQPLf7bf-7",
 caption: "রাগ কমাও, মাফ করাই বড়ত্ব... 🫦"
 },
 "😙": {
 url: "https://drive.google.com/uc?export=download&id=1wQVxoKZb_kNXsoMR4QdGe0SE5wBP8yB5",
 caption: "এত ছোট উম্মা ... 😙"
 },
 "Antor": {
 url: "https://drive.google.com/uc?export=download&id=19Bg3w9-IwQNN5S4zpddFQXDY0oFVmJkT",
 caption: "সারা জীবন হেন্ডেল মেরে .... Antor "
 },
 "😒": {
 url: "https://drive.google.com/uc?export=download&id=1tbKe8yiU0RbINPlQgOwnig7KPXPDzjXv",
 caption: "বিরক্ত করো না জান... ❤️"
 },
 "Noman": {
 url: "https://drive.google.com/uc?export=download&id=1uWIRbvoDBCZ3EsPjOPXg1bv_DLxN4aKJ",
 caption: "হাসলে তোমাকে পাগল এর মতো লাগে... Noman"
 },
 "Ebrahim": {
 url: "https://drive.google.com/uc?export=download&id=1WuC0YUrWlE9XiVDSMZyt1ql5U20IcBoE",
 caption: "বড় ভাই ... Ebrahim "
 },
 "Rajon": {
 url: "https://drive.google.com/uc?export=download&id=1WXOnNs9LJS-KOJGD4u25Tlj9ZeXiGqBB",
 caption: "মারিয়ার জামাই ... Rajon"
 }
};

module.exports.config = {
 name: "emoji_voice",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Islamick Chat Modified by Cyber-Sujon",
 description: "10 emoji = 10 voice response",
 commandCategory: "noprefix",
 usages: "🥺 😍 😭 etc.",
 cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
 const { threadID, messageID, body } = event;
 if (!body) return;

 const emoji = body.trim();
 const audioData = emojiAudioMap[emoji];

 if (!audioData) return;

 const filePath = `${__dirname}/cache/${encodeURIComponent(emoji)}.mp3`;

 const callback = () => api.sendMessage({
 body: `╭•┄┅════❁🌺❁════┅┄•╮\n\n${audioData.caption}\n\n╰•┄┅════❁🌺❁════┅┄•╯`,
 attachment: fs.createReadStream(filePath)
 }, threadID, () => fs.unlinkSync(filePath), messageID);

 const stream = request(encodeURI(audioData.url));
 stream.pipe(fs.createWriteStream(filePath)).on("close", () => callback());
};

module.exports.run = () => {};
