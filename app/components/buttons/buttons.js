export const amountButtons = {
    reply_markup: {
        inline_keyboard: [
            [{text: '100 рублей', callback_data: '100'}, {text: '300 рублей', callback_data: '300'}],
            [{text: '500 рублей', callback_data: '500'}, {text: '1000 рублей', callback_data: '1000'}],
            [{text: '3000 рублей', callback_data: '3000'}, {text: '5000 рублей', callback_data: '5000'}],
        ]
    }
}

export const sendContactsButtons = {
    disable_web_page_preview: true,
    reply_markup: {
        inline_keyboard: [
            [{text: 'Отправить контакты', callback_data: 'sendContacts'}],
            [{text: 'Не отправлять', callback_data: 'notSendContacts'}]
        ]
    }
}

export const checkContactsButtons = {
    reply_markup: {
        inline_keyboard: [
            [{text: 'Данные верны', callback_data: 'Yes'}],
            [{text: 'Ввести данные ещё раз', callback_data: 'No'}]
        ]
    }
}

export const repeatedDonationButtons = {
    reply_markup: {
        inline_keyboard: [
            [{text: 'Отправить ещё раз', callback_data: 'Again'}],
        ]
    }
}