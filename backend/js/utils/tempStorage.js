// Временное хранилище для кодов подтверждения
const tempStorage = new Map();
const usedCodes = new Map();
const driverStorage = new Map();
const cookieStorage = new Map();
const userData = new Map();

module.exports = { tempStorage, usedCodes, driverStorage, cookieStorage, userData };