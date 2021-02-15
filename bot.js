const { Telegraf, Markup } = require('telegraf')
const config = require('./config');

const bot = new Telegraf(config.telegraf_token)

//main menu
const main_menu = Markup.inlineKeyboard([
  [Markup.button.callback('--banner--', 'null')],
  [Markup.button.callback('button#1', 'one')],
  [Markup.button.url('button#2', 'LINK HERE'), Markup.button.url('button#3', 'LINK HERE')]
])
//first year menu
const one_menu = Markup.inlineKeyboard([
  [Markup.button.callback('--banner--', 'null')],
  [Markup.button.url('groupname#1', 'GROUP LINK HERE')],
  [Markup.button.url('groupname#2', 'GROUP LINK HERE'), Markup.button.url('groupname#3', 'GROUP LINK HERE')],
  [Markup.button.callback('Previous', 'back')]
])

//only back button menu
const text_menu = Markup.inlineKeyboard([
  [Markup.button.callback('Previous', 'back')]
])

//bot's commands
//initialization and restart
bot.start((ctx) => ctx.reply('WELCOME TEXT HERE', main_menu))
//support and troubleshooting
bot.help((ctx) => ctx.reply('SUPPORT TEXT HERE'))

//inline keyboard
//main menu
bot.action('back', (ctx) => { ctx.editMessageText('WELCOME TEXT HERE', main_menu)
    ctx.answerCbQuery() })
//one menu
bot.action('one', (ctx) => { ctx.editMessageText('TEXT HERE', one_menu)
    ctx.answerCbQuery() })
//banner fake button
bot.action('null', (ctx) => {
    ctx.answerCbQuery() })

//lanuch bot
bot.launch()
//enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
