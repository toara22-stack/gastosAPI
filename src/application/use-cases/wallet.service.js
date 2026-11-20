import WalletEntity from "../../domain/entities/wallet.entity.js";

export default class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(data) {
        if (!data.name) {
            throw new Error("Wallet name is required");
        }
        if (data.balance !== undefined && Number(data.balance) < 0) {
            throw new Error("Initial balance cannot be negative");
        }

        const wallet = new WalletEntity(data);
        return await this.walletRepository.save(wallet);
    }

    async getWallets(userId) {
        return await this.walletRepository.findByUserId(userId);
    }

    async deleteWallet(id, userId) {
        const wallet = await this.walletRepository.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.userId !== userId) {
            throw new Error("Unauthorized: You can only delete your own wallets");
        }

        await this.walletRepository.delete(id);
        return { message: "Wallet deleted successfully" };
    }
}