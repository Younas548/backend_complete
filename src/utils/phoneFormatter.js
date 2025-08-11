import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhone(input, defaultCountry = "PK") {
  try {
    const pn = parsePhoneNumberFromString(input, defaultCountry);
    if (!pn || !pn.isValid()) return null;
    return pn.number; // E.164 format
  } catch {
    return null;
  }
}
