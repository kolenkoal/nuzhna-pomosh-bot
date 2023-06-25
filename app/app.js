import {Telegraf} from 'telegraf';
import dotenv from 'dotenv';

dotenv.config()

// Подключение сообщений для вывода пользователю из файла messages.js
import {
    donationMessage,
    getDataMessage,
    successfulPaymentMessage
} from './components/messages/messages.js';

// Подключение кнопок для вывода пользователю из файла buttons.js
import {
    amountButtons,
    sendContactsButtons,
    // checkContactsButtons,
    repeatedDonationButtons
} from './components/buttons/buttons.js';

// Подключение функции для вывода пользователю из файла getInvoice.js
import {getInvoice} from './components/functions/getInvoiceFunction.js';

// Используем метод Telegraf, чтобы запустить бота, при этом также используем токен для работы с ботом
const bot = new Telegraf(process.env.BOT_TOKEN)

// Сумма, которую пользователю необходимо будет заплатить
let amountToPay = 0

// Объявление данных пользователя
let email = '',
    flag = false

// Функция для проверки контактов, введенных пользователем
// const checkingContacts = () => {
//     bot.on('text', ctx => {
//         console.log('checkingContacts >>> ', ctx.message.text)
//         if (ctx.message.text.indexOf('@') > -1 && ctx.message.text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
//             // Проверка на email пользователя
//             email = ctx.message.text
//             // if (email !== '') {
//             //     ctx.reply(`Проверьте корректность введённых данных: \ne-mail — ${email}`, checkContactsButtons)
//             //     return
//             // }
//             let invoice = getInvoice(ctx.from.id, amountToPay, email)
//             console.log('invoice', invoice)
//             ctx.replyWithInvoice(invoice)
//             return;
//         }
//
//         ctx.reply('Введите корректный e-mail')
//     })
// }

// Как только бот запускается, выводится сообщение о том, как пожертвовать сумму
bot.command('start', (ctx) => {
    console.log('start command')
    ctx.reply(donationMessage, amountButtons)
})
// Если пользователь выбрал команду '/donation', то пользователю выводится сообщение о том, как пожертвовать сумму
bot.hears('/donation', (ctx) => {
    console.log('donation command')
    email = ''
    ctx.reply(donationMessage, amountButtons)
})
// Обработка нажатий пользователем кнопок
bot.on('callback_query', async (ctx) => {
    console.log('callback_query >>> ', ctx.update.callback_query.data)

    let invoice

    if (['100', '300', '500', '1000', '3000', '5000'].includes(ctx.update.callback_query.data)) {
        // Если пользователь выбрал сумму, то ему предлагается ввести контактные данные
        amountToPay = Number(ctx.update.callback_query.data)
        ctx.replyWithInvoice(getInvoice(ctx.from.id, amountToPay))
        let invoice = getInvoice(ctx.from.id, amountToPay, email)
        console.log('invoice', invoice)
        //return
    }

    switch (ctx.update.callback_query.data) {
        // Если пользователь нажал кнопку 'Отправить контактные данные', то программа начинает запрашивать у него данные
        // case 'sendContacts':
        //     ctx.reply('Введите ваш e-mail')
        //     checkingContacts()
        //     break;

        // Если пользователь не желает отправлять контакты, то ему сразу выставляется счет на оплату
        // case 'notSendContacts':
        //     invoice = getInvoice(ctx.from.id, amountToPay)
        //     console.log('invoice', invoice)
        //     ctx.replyWithInvoice(invoice)
        //     break;

        // Если после проверки данных пользователь удостоверился в своих данных, то ему выставляется счет на оплату
        // case 'Yes':
        //     invoice = getInvoice(ctx.from.id, amountToPay, email)
        //     console.log('invoice', invoice)
        //     ctx.replyWithInvoice(invoice)
        //     break;

        // Если пользователь ошибся в своих данных, необходимо ввести их еще раз
        // case 'No':
        //     ctx.reply('Введите ваш e-mail')
        //     email = ''
        //     checkingContacts()
        //     break;

        // Если пользователь нажал кнопку 'Отправить еще раз'
        case 'Again':
            ctx.reply(donationMessage, amountButtons)
            flag = true
            break;
    }
})

// Если вы хотите, чтобы каждый раз когда пользователь писал что-то - вам приходил отчет по его сообщению, то нужно убрать комментарий
// bot.use(Telegraf.log())

// Ответ на предварительный запрос по оплате
bot.on('pre_checkout_query', async (ctx) => ctx.answerPreCheckoutQuery(true))

// В случае удачной оплаты выводится сообщение
bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
    console.log('successful_payment command')
    await ctx.replyWithHTML(successfulPaymentMessage, repeatedDonationButtons)
})

// Запуск бота
bot.launch()

