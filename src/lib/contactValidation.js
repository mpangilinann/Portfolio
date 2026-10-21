export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { min: 3, max: 254 },
  message: { min: 10, max: 5000 },
};

export function isValidEmail(value) {
  if (typeof value !== "string" || value.length > contactLimits.email.max) return false;
  const [local] = value.split("@");
  return local.length <= 64 && !local.startsWith(".") && !local.endsWith(".") && !local.includes("..") &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/.test(value);
}

// This module is safe for both the browser and server: no configuration or secrets.
export function validateContactFields(input) {
  const values = {};
  const errors = {};
  for (const [field, limits] of Object.entries(contactLimits)) {
    const raw = input?.[field];
    const label = field === "name" ? "name" : field === "email" ? "email address" : "message";
    if (typeof raw !== "string") {
      values[field] = "";
      errors[field] = `Please enter your ${label}.`;
      continue;
    }
    const normalized = raw.normalize("NFC").replace(/\r\n?/g, "\n");
    // Allow message line breaks/tabs; reject control characters and header injection.
    const invalidControls = field === "message"
      // eslint-disable-next-line no-control-regex -- Intentionally reject unsafe control characters.
      ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(normalized)
      // eslint-disable-next-line no-control-regex -- Names and addresses must remain single-line.
      : /[\u0000-\u001f\u007f]/u.test(normalized);
    let value = normalized.trim();
    if (field === "name") value = value.replace(/\s+/gu, " ");
    if (field === "email" && value.includes("@")) {
      const at = value.lastIndexOf("@");
      value = value.slice(0, at) + value.slice(at).toLowerCase();
    }
    values[field] = value;
    if (!value) errors[field] = `Please enter your ${label}.`;
    else if (invalidControls) errors[field] = `Please remove unsupported characters from your ${label}.`;
    else if (raw.length > limits.max || value.length > limits.max) errors[field] = `Please use no more than ${limits.max} characters for your ${label}.`;
    else if (value.length < limits.min) errors[field] = `Please use at least ${limits.min} characters for your ${label}.`;
    else if (field === "email" && !isValidEmail(value)) errors[field] = "Please enter a valid email address.";
  }
  return { values, errors };
}
