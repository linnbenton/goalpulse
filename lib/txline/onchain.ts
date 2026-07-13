import * as anchor from "@coral-xyz/anchor";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import txoracle from "@/idl/txoracle.json";

export const TXLINE_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_TXLINE_PROGRAM_ID ??
    "6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J",
);

export const TXL_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_TXL_MINT ??
    "4Zao8ocPhmMgq7PdsYWyxvqySMGx7xb9cMftPMkEokRG",
);

export function createProgram(
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet,
) {
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  anchor.setProvider(provider);

  return new anchor.Program(txoracle as any, provider);
}

export async function subscribe(
  program: anchor.Program,
  wallet: anchor.Wallet,
  serviceLevelId = 1,
  durationWeeks = 4,
) {
  const [pricingMatrix] = PublicKey.findProgramAddressSync(
    [Buffer.from("pricing_matrix")],
    program.programId,
  );

  const [treasuryPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("token_treasury_v2")],
    program.programId,
  );

  const treasuryVault = getAssociatedTokenAddressSync(
    TXL_MINT,
    treasuryPda,
    true,
    TOKEN_2022_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const userToken = getAssociatedTokenAddressSync(
    TXL_MINT,
    wallet.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const provider = program.provider as anchor.AnchorProvider;

  const accountInfo = await provider.connection.getAccountInfo(userToken);

  if (!accountInfo) {
    const tx = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        userToken,
        wallet.publicKey,
        TXL_MINT,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      ),
    );

    await provider.sendAndConfirm(tx);
  }

  const txSig = await program.methods
    .subscribe(serviceLevelId, durationWeeks)
    .accounts({
      user: wallet.publicKey,

      pricingMatrix,

      tokenMint: TXL_MINT,

      userTokenAccount: userToken,

      tokenTreasuryVault: treasuryVault,

      tokenTreasuryPda: treasuryPda,

      tokenProgram: TOKEN_2022_PROGRAM_ID,

      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,

      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return txSig;
}
