export default class WalletEntity {
    constructor({ id, name, type, balance, currency, userId }) {
        this.id = id;
        this.name = name;
        this.type = type || "CASH"; 
        this.balance = balance !== undefined ? Number(balance) : 0;
        this.currency = currency || "BOB";
        this.userId = userId;
    }
}

