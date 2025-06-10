import { FC, useEffect, useCallback, useState } from "react";
import useUserSoLBalanceStore from "../../stores/useUserSolBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { notify } from "../../utils/notifications";
import { AiOutlineClose } from "react-icons/ai";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";

//INTERNAL IMPORT
import { InputView } from "../index";
import Branding from "../../components/Branding";

interface DonateViewProps {

  setOpenSendTransaction: (value: boolean) => void;

}

export const DonateView: FC<DonateViewProps> = ({ setOpenSendTransaction }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("0.0");

  const balance = useUserSoLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSoLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const solInputValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const monstrosity = /((^\.(\d+)?$)|(^\d+(\.\d*)?$)|(^$))/;
  const res = new RegExp(monstrosity).exec(e.target.value);
  res && setAmount(e.target.value);
};

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    const creatorAddress = new PublicKey(
      "9DivFequxGbkSbGbcXCUen54KmxRSDecYv8f9CHzaHt5"
    );
    let signature: TransactionSignature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transaction, connection);

      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, amount, sendTransaction, connection]);

  //COMPONENT
  const CloseModal = () => (
    <a
      onClick={() => setOpenSendTransaction(false)}
      className="absolute top-4 right-4 group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60"
    >
      <i className="mdi mdi-facebook text-2xl text-white group-hover:text-white">
        <AiOutlineClose />
      </i>
    </a>
  );

  return (
    <>
    <CloseModal />
    <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
      <div className="container">
        <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <Branding
              image="img-51"
              title="to build your marketing strategy"
              message="Try all paid functions for free. just register and
                            create your first widget, it simple and fast."
            />

            <div className="lg:ps-0 flex h-full flex-col p-10">
              <div className="pb-10">
                <a href="index.html" className="flex">
                  <img
                    src={"assets/images/newlogosol.png"}
                    alt="dark logo"
                    className="h-10"
                  />
                </a>
              </div>
              <div className="my-auto pb-6 text-center">
                <h4 className="mb-4 text-2xl font-bold text-white">
                  {wallet && (
                    <p>SOL Balance: {(balance || 0).toLocaleString()}</p>
                  )}
                </h4>
                <p className="text-default-300 mx-auto mb-5 max-w-sm">
                  You are now successfully Create your solana token.
                </p>
                <div className="flex items-start justify-center">
                  <img src={"assets/images/newlogosol.png"} alt="" className="h-40" />
                </div>
                <div className="text-start">
                  <InputView
                    name="Amount"
                    placeholder=" amount"
                    clickhandle={() => {}}
                  />
                </div>
                <div className="mt-5 w-full text-center">
                  <div className="mb-6 text-center">
                    <button
                      onClick={onClick}
                      disabled={!publicKey}
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                    >
                      <span className="fw-bold">Donate</span>{" "}
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></>
  );
};