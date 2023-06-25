export function getInvoice(id, amount, email) {
    console.log('getInvoice', id, amount, email)
    console.log('send_email_to_provider', email !== undefined, email)

    return {
        chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
        provider_token: process.env.PROVIDER_TOKEN, // токен выданный через бот @SberbankPaymentBot
        start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
        title: 'Пожертвование в фонд «Нужна Помощь»', // Название продукта, 1-32 символа
        description: 'Пожертвование в фонд  «Нужна Помощь»', // Описание продукта, 1-255 знаков
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{label: 'Пожертвование', amount: 100 * amount}], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: process.env.PROVIDER_TOKEN
        },
        // send_email_to_provider: email !== 'undefined',
        provider_data: {
            email: email,
            receipt: {
                items: [
                    {
                        description: 'Пожертвование в фонд «Нужна Помощь»',
                        quantity: '1.00',
                        amount: {
                            value: amount,
                            currency: 'RUB'
                        },
                        vat_code: 1
                    }
                ]
            }
        },
        metadata: {
            email: email,
            sum: amount,
            case_id: process.env.CASE_ID || 1,
            ref: 'https://t.me/NuzhnaPomoshDonationsBot',
            chat_id: id
        }
    }
}
