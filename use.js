const path = require('path');
const dataLoader = require('./dataLoader');
const { sortStringsNoSpaces } = require('./stringSorter');
const fm = require('./fileManager'); 

async function run() {
    console.log('--- Запуск итогового сценария ---');

    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await dataLoader(url);

    if (response.error) {
        console.error('Ошибка при загрузке данных:', response.error);
        return;
    }

    console.log(`Загружено пользователей: ${response.data.length}`);

    const rawNames = response.data.map(user => user.name);
    const sortedNames = sortStringsNoSpaces(rawNames);

    const sortedEmails = sortedNames.map(name => {
        const user = response.data.find(u => u.name === name);
        return user.email;
    });
    const usersDirPath = path.join(__dirname, 'users');
    const namesFilePath = path.join(usersDirPath, 'names.txt');
    const emailsFilePath = path.join(usersDirPath, 'emails.txt');

    try {
        fm.createDirSync(usersDirPath);
        fm.writeFileSync(namesFilePath, sortedNames.join('\n'));
        fm.writeFileSync(emailsFilePath, sortedEmails.join('\n'));
        console.log('Успех!');
        console.log('Папка "users" создана.');
        console.log('Файлы "names.txt" и "emails.txt" заполнены отсортированными данными.');
    } catch (err) {
        console.error('Ошибка при работе с файлами:', err);
    }
}
run();