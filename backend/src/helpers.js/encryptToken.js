const crypto  = require("crypto");

// Configuration
const algorithm = 'aes-256-cbc'; // Advanced Encryption Standard (AES)
const key = crypto.randomBytes(32); // Generate a 256-bit key
const iv = crypto.randomBytes(16); // Generate a random Initialization Vector (IV)



async function encryptToken(token) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(token);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}




async function decryptToken(encryptedToken) {
    let iv = Buffer.from(encryptedToken.iv, 'hex');
    let encryptedText = Buffer.from(encryptedToken.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


module.exports = {
    encryptToken,
    decryptToken
}