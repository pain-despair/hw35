const userData = {
	USD: 1000,
	EUR: 900,
	UAH: 15000,
	BIF: 20000,
	AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
};

function getMoney() {
    return new Promise((resolve, reject) => {
        const answer = prompt('Подивитися баланс карті? (так/ні)');
        if (answer.toLowerCase() === 'так') {
            const currency = prompt('Введіть валюту (USD, EUR, UAH, BIF, AOA):');
            if (currency in userData) {
                console.log(`Баланс становить: ${userData[currency]} ${currency}`);
                resolve();
            } else {
                console.log('Дана валюта недоступна для вас.');
                reject();
            }
        } else if (answer.toLowerCase() === 'ні') {
            const currency = prompt('Введіть валюту для зняття (USD, EUR, UAH, GBP):');
            if (currency in userData && currency in bankData && bankData[currency].max !== 0) {
                const amount = Number(prompt(`Введіть суму для зняття (${bankData[currency].min} - ${bankData[currency].max}):`));
                if (amount > bankData[currency].max) {
                    console.log(`Введена сума більша за доступну. Максимальна сума зняття: ${bankData[currency].max}`);
                    reject();
                } else if (amount < bankData[currency].min) {
                    console.log(`Введена сума менша за доступну. Мінімальна сума зняття: ${bankData[currency].min}`);
                    reject();
                } else if (amount > userData[currency]) {
                    console.log(`Ви ввели суму більшу за ваш баланс у валюті ${currency}`);
                    reject();
                } else {
                    console.log(`От Ваші гроші ${amount} ${currency} ${bankData[currency].img}`);
                    resolve();
                }
            } else {
                console.log('Дана валюта недоступна для вас або для зняття.');
                reject();
            }
        } else {
            console.log('Невірна відповідь.');
            reject();
        }
    });
}

getMoney()
    .then(() => console.log('Дякую, гарного дня 😊'))
    .catch(() => console.log('Дякую, гарного дня 😊'));