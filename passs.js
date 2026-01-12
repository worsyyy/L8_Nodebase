const bcrypt = require('bcrypt');

const passwords = [
    'pass1', 'pass2', 'pass3', 'pass4', 'pass5', 
    'pass6', 'pass7', 'pass8', 'pass9', 'pass10', 
    'pass11', 'pass12', 'pass13'
];

async function hashPasswords() {

    for (let i = 0; i < passwords.length; i++) {
        const start = performance.now(); 
        
        await bcrypt.hash(passwords[i], 10);
        
        const end = performance.now(); 
        const timeTaken = (end - start).toFixed(2);
        
        console.log(`Пароль №${i + 1}: зашифрован за ${timeTaken} мс`);
    }

}

hashPasswords();