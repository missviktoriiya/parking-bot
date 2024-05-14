require('dotenv').config();
const {Bot, GrammyError, HttpError, Keyboard} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);


// bot.on('msg').filter((ctx) => {
//     return ctx.from.id === 5041286903
// }, async (ctx) => {
//     await ctx.reply('Привет, админ!')
// })

bot.api.setMyCommands([
{
    command: 'start', description: 'Запуск бота',
},
{
    command: 'message', description: 'Любое сообщение',
},
])

bot.command('start', async (ctx) => {
    await ctx.react('❤‍🔥')
    await ctx.reply('Привет! Я - бот.')
})

bot.command('mood', async (ctx) => {
const moodKeyboard = new Keyboard().text('Хорошо').row().text('Норм').row().text('Супер').resized().oneTime()
await ctx.reply('Как настроение?', {
reply_markup: moodKeyboard 
})
})


bot.on('edit', async (ctx) => {
    await ctx.reply('Сообщение отредактировано')
});

bot.catch((err) => {
const ctx = err.ctx;
console.error(`Error while handling update ${ctx.update.update_id}:`);
const e = err.error;

if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
} else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
} else {
    console.error("Unknown error:", e);
}
});


bot.start();