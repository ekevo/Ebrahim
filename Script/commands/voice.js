const axios = require("axios");
const fs = require("fs");
const request = require("request");

const emojiAudioMap = {
 "😘": {
 url: "https://drive.google.com/uc?export=download&id=17tACYW27zc7CYR5Ec1pktYMJbi6RK-Qh",
 caption: "কিরে গ্রুপে এত চুম্মা চুম্মি কিসের ...😘"
 },
 "😍": {
 url: "https://drive.google.com/uc?export=download&id=1lIsUIvmH1GFnI-Uz-2WSy8-5u69yQ0By",
 caption: "তোমার প্রতি ভালোবাসা দিনকে দিন বাড়ছে... 😍"
 },
 "🙂": {
 url: "https://drive.google.com/uc?export=download&id=1dW9IKuDuzIyJGq7oHGFKHHLm4a7kI4vr",
 caption: "এই সালা এত সেনটি মারাস কেন ... 🙂"
 },
 "😡": {
 url: "https://drive.google.com/uc?export=download&id=1S_I7b3_f4Eb8znzm10vWn99Y7XHaSPYa",
 caption: "রাগ কমাও, মাফ করাই বড়ত্ব... 😡"
 },
 "🙄": {
 url: "https://drive.google.com/uc?export=download&id=1gtovrHXVmQHyhK2I9F8d2Xbu7nKAa5GD",
 caption: "এভাবে তাকিও না তুমি ভেবে লজ্জা লাগে ... 🙄"
 },
 "😑": {
 url: "https://drive.google.com/uc?export=download&id=1azElOD2QeaMbV2OdCY_W3tErD8JQ3T7P",
 caption: "লেবু খাও জান সব ঠিক হয়ে যাবে 😑"
 },
 "18+": {
 url: "https://drive.google.com/uc?export=download&id=1DFPvY_qCHxuqNL7S020ayPN0MN09L3LK",
 caption: "বিরক্ত করো না জান... 18+"
 },
 "🤣": {
 url: "https://drive.google.com/uc?export=download&id=1Hvy_Xee8dAYp-Nul7iZtAq-xQt6-rNpU",
 caption: "হাসলে তোমাকে পাগল এর মতো লাগে... 🤣"
 },
 "intro": {
 url: "https://drive.google.com/uc?export=download&id=1jRVHV7d3f4w7KGKj2ZhubcbmPR960QiA",
 caption: "যা ভাগ পাগল ছাগল ... intro"
 },
 "nasheed": {
 url: "https://drive.google.com/uc?export=download&id=1jRVHV7d3f4w7KGKj2ZhubcbmPR960QiA",
 caption: "লুঙ্গি খুলে খারাই মুতি ... nasheed"
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
