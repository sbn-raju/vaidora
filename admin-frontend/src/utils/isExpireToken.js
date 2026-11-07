export const isTokenExpired = (expiryTime) => {
    const currentTime = new Date().getTime();
    return currentTime > expiryTime;
}
