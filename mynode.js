const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: './src/environments/.env'}); ;

const envFile = `export const environment = {
    production: '${process.env.PRODUCTION}',
    apiKey: '${process.env.API_KEY}',
    appUrl: '${process.env.APP_URL}
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        
        console.log(successColor, `${checkSign} Successfully generated environment.ts`);
    }
});
const targetPathProduction = path.join(__dirname, './src/environments/environment.prod.ts');
fs.writeFile(targetPathProduction, envFile, (err) => {
    console.log(process.env.PRODUCTION)
    console.log(process.env.API_KEY)
    console.log(process.env.APP_URL)
    if (err) {
        console.error(err);
        throw err;
    } else {
        
        console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
    }
});