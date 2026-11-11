require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { json } = require("stream/consumers");

// Initialise client and intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})

const DB_FILE = "./birthdays.json";
const LAST_RUN_FILE = ".last-run.json";

// Helper to read birthdays database
const getBirthdays = () => {
    return fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : {};
};

// Helpers to check if bot has ran today
const getLastRunDate = () => {
    // If file does not exist return null
    if (!fs.existsSync(LAST_RUN_FILE)) return null;
    return JSON.parse(fs.readFileSync(LAST_RUN_FILE)).date;
};

const setLastRunDate = (dateString) => {
    fs.writeFileSync(LAST_RUN_FILE, JSON.stringify({ date: dateString }, null, 2));
};

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}. Running startup check...`)

    // Get todays date "YYYY-MM-DD" aand month/day as "MM-DD"
    const todayFull = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowFull = tomorrow.toISOString().slice(0, 10);
    const tomorrowMonthDay = tomorrowFull.slice(5, 10);
    const todayMonthDay = todayFull.slice(5, 10);

    // If ran today, exit
    if (getLastRunDate() === todayFull) {
        console.log("Bot has ran today, shutting down...")
        client.destroy();
        process.exit(0);
    }

    try {
        // Fetch target channel
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if (!channel) {
            console.error("Error: Could not find discod channel, shutting down...")
            client.destroy();
            process.exit(0);
        }

        // Scan birthdays for matches today
        const birthdays = getBirthdays();
        const matchingUsers = [];
        const tomorrowMatchingUsers = []

        for (const [userId, userData] of Object.entries(birthdays)) {
            if (userData.birthday === todayMonthDay) {
                matchingUsers.push(userId);
            }
        }

        for (const [userId, userData] of Object.entries(birthdays)) {
            if (userData.birthday === tomorrowMonthDay) {
                tomorrowMatchingUsers.push(userId);
            }
        }

        // Build confirmation message
        let messageText = `**Startup Check:** Bot ran successfully on PC startup!\n`;

        // Check to see if birthdays are today, and map them
        if (matchingUsers.length > 0) {
            const todayMentions = matchingUsers.map(id => `<@${id}>`).join(",");
            messageText += `**ALERT <@${process.env.ADMIN_USER_ID}>:** Today is ${todayMentions}'s birthday!`
        } else {
            messageText += `No birthdays registered for today (${todayMonthDay})`;
        }

        // Check to see if birthdays are tomorrow, and map them        
        if (tomorrowMatchingUsers.length > 0) {
            const tomorrowMentions = tomorrowMatchingUsers.map(id => `<@${id}>`).join(",")
            messageText += `\n**ALERT <@${process.env.ADMIN_USER_ID}>:** Tomorrow is ${tomorrowMentions}'s birthday!`
        } else {
            messageText += `\nNo birthdays registered for tomorrow (${tomorrowMonthDay})`
        }

        // Send message to channel
        await channel.send(messageText);
        console.log("Confirmation message and birthday check send to Discord");

        // Save todays date so won't run till tomorrow
        setLastRunDate(todayFull);

    } catch (error) {
        console.error("Error runing startup task:", error);
    } finally {
        // Exit program
        console.log("Shutting down script...");
        client.destroy();
        process.exit(0);
    }
});

// Log into discord
client.login(process.env.DISCORD_TOKEN);