import { customAlphabet } from "nanoid";

const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const REF_LENGTH = 6;

const nanoidRef = customAlphabet(REF_ALPHABET, REF_LENGTH);

export function generateTicketRef(): string {
  return `TKT-${nanoidRef()}`;
}
