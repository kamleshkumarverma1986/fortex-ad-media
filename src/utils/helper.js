export const PENDING_CONTACT_STATUS = "PENDING";
export const ATTENDED_CONTACT_STATUS = "ATTENDED";
export const SPAM_CONTACT_STATUS = "SPAM";

export const CONTACT_STATUSES = [
  PENDING_CONTACT_STATUS,
  ATTENDED_CONTACT_STATUS,
  SPAM_CONTACT_STATUS,
];

export const helpCenterWhatsappLink =
  "https://api.whatsapp.com/send?phone=+15558610964&text=👋 Hey, I want to know more about your service.";

export const validatePhoneNumber = (phone) => {
  // Remove all spaces and special characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it's a valid Indian phone number (10 digits starting with 6-9)
  const indianPhoneRegex = /^[6-9]\d{9}$/;

  return indianPhoneRegex.test(cleaned);
};
