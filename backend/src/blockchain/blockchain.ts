import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// In-memory storage to simulate blockchain
const blockchainStorage = new Map();
let accountCounter = 1000;

export async function storeUserOnSolana(user: any) {
  try {
    const userData = {
      name: user.name,
      aadhaar: user.aadhaar,
      timestamp: Date.now()
    };

    // Generate a simulated blockchain address
    const simulatedAddress = `SOL${accountCounter.toString().padStart(8, '0')}${crypto.randomBytes(16).toString('hex')}`;
    accountCounter++;

    // Generate verification hash
    const verificationHash = crypto
      .createHash('sha256')
      .update(`${userData.name}:${userData.aadhaar}:${simulatedAddress}`)
      .digest('hex');

    // Store in our simulated blockchain
    blockchainStorage.set(simulatedAddress, {
      userData,
      verificationHash,
      createdAt: new Date(),
      txSignature: `SIG${crypto.randomBytes(32).toString('hex')}`
    });

    console.log("✅ User data stored on simulated Solana at:", simulatedAddress);
    console.log("🔐 Verification hash:", verificationHash);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      blockchainAddress: simulatedAddress,
      verificationHash: verificationHash,
      transactionSignature: `SIG${crypto.randomBytes(32).toString('hex')}`
    };
  } catch (error: any) {
    console.error("Error in simulated blockchain storage:", error);
    throw new Error(`Simulated blockchain error: ${error.message}`);
  }
}

export async function getUserFromSolana(accountPubkey: string) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const storedData = blockchainStorage.get(accountPubkey);
    
    if (!storedData) {
      console.log("Account not found in simulated blockchain");
      return null;
    }

    console.log("Retrieved user data from simulated blockchain");
    return storedData.userData;
  } catch (error: any) {
    console.error("Error getting user from simulated blockchain:", error);
    return null;
  }
}

export async function verifyUserHash(blockchainAddress: string, expectedHash: string) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    // Check if account exists in our simulated blockchain
    const storedData = blockchainStorage.get(blockchainAddress);
    
    if (!storedData) {
      return { 
        valid: false, 
        reason: "Account not found in simulated blockchain",
        userData: null
      };
    }

    const userData = storedData.userData;

    // Calculate hash and verify
    const calculatedHash = crypto
      .createHash('sha256')
      .update(`${userData.name}:${userData.aadhaar}:${blockchainAddress}`)
      .digest('hex');

    const isValid = calculatedHash === expectedHash;

    console.log("🔍 Simulated Verification Details:");
    console.log("Expected hash:", expectedHash);
    console.log("Calculated hash:", calculatedHash);
    console.log("Stored hash:", storedData.verificationHash);
    console.log("Match:", isValid);

    return {
      valid: isValid,
      userData: isValid ? userData : null,
      reason: isValid ? "Hash verified successfully in simulation" : "Hash verification failed in simulation"
    };
  } catch (error: any) {
    console.error("Error in simulated verification:", error);
    return {
      valid: false,
      reason: `Simulated verification error: ${error.message}`,
      userData: null
    };
  }
}

// Helper functions for simulation
export function getSimulatedBlockchainStats() {
  return {
    totalAccounts: blockchainStorage.size,
    accountsCreated: accountCounter - 1000,
    storageSize: JSON.stringify([...blockchainStorage.entries()]).length
  };
}

export function clearSimulatedBlockchain() {
  blockchainStorage.clear();
  accountCounter = 1000;
  console.log("🧹 Simulated blockchain cleared");
}

// Export storage for debugging (remove in production)
export function getSimulatedStorage() {
  return [...blockchainStorage.entries()];
}