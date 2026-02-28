// Временное хранилище для кодов подтверждения
const tempStorage = new Map();
const usedCodes = new Map();

module.exports = { tempStorage, usedCodes };