const fromPath = './dist'
const toPath = '../board-server-tsoa/src/www'
// const fs = require('fs');
const util = require('util');
const fse = require('fs-extra')

console.log(`                                                                                               
  ___  _   _ _____ _____  ______ ___________ _     _______   __
 / _ \| | | |_   _|  _  | |  _  \  ___| ___ \ |   |  _  \ \ / /
/ /_\ \ | | | | | | | | | | | | | |__ | |_/ / |   | | | |\ V / 
|  _  | | | | | | | | | | | | | |  __||  __/| |   | | | | \ /  
| | | | |_| | | | \ \_/ / | |/ /| |___| |   | |___\ \_/ / | |  
\_| |_/\___/  \_/  \___/  |___/ \____/\_|   \_____/\___/  \_/  
                                                              
                                                              
                                                                     `);

fse.copy(fromPath, toPath, err => {
    if (err) {
        console.log('copy error', err.message);
    } else {
        console.log('copy done');
    }
})