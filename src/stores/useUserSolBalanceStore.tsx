import { create } from "zustand";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void;
}

const useUserSolBalanceStore = create<UserSOLBalanceStore>((set) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    try {
      const lamports = await connection.getBalance(publicKey, "confirmed");
      const balance = lamports / LAMPORTS_PER_SOL;
      set({ balance }); 
      console.log("Balance:", balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  },
}));

export default useUserSolBalanceStore;
