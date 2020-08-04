//For the Test Run
const Telegraf = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
const axios = require('axios')

require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('text', ctx => {
    ctx.reply("Thank you for your interest in the tPlace beta. Unfortunately, the beta ended on Sunday 3/8 and is currently being run for TWW. You can " +
        "still view the canvas made during the beta or watch the juniors make their own legacy in realtime in the link below!\n\n" +
        "Beta Canvas : tww2020.site/headquarters/tplaceseniors\n" +
        "TWW Canvas : tww2020.site/headquarters/tplace")
})


bot.launch().then(() => console.log('Bot running'))
