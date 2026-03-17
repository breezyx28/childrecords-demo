// utils/crypto.ts
import crypto from "crypto";

// Fixed secret key (32 characters for AES-256)
const SECRET_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"; // Replace with your actual secret key

// Fixed initialization vector (16 bytes for AES-256-CBC)
const IV = Buffer.from("abcdef1234567890abcdef1234567890", "hex"); // Replace with your actual IV

if (SECRET_KEY.length !== 32) {
  throw new Error("SECRET_KEY must be exactly 32 characters long.");
}

if (IV.length !== 16) {
  throw new Error("IV must be exactly 16 bytes long.");
}

/**
 * Encrypts a string using AES-256-CBC.
 * @param text - The plaintext string to encrypt.
 * @returns The encrypted string in Base64 format.
 */
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    IV
  );
  let encrypted = cipher.update(text, "utf-8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * Decrypts a string using AES-256-CBC.
 * @param encryptedText - The encrypted string in Base64 format.
 * @returns The decrypted plaintext string.
 */
export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    IV
  );
  let decrypted = decipher.update(encryptedText, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
