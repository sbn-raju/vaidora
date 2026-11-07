import CryptoJS from "crypto-js";


const secretKey = import.meta.env.VITE_SECRET_KEY_ENCRYPT;



export const encryptData = async(data) => {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encodeURIComponent(encrypted);
};


export const decryptData = async(encryptedData) => {
    const decodedData = decodeURIComponent(encryptedData); // Decode the URL encoded string
    const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };