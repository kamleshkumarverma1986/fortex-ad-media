export const sendSMS = async ({ otp, mobileNumbers }) => {
  try {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${
      process.env.FAST2SMS_API_KEY
    }&variables_values=${otp}&route=otp&numbers=${mobileNumbers.join(",")}`;
    await fetch(url);
  } catch (error) {
    console.error({
      message: `There are some issues while sending SMS: ${error.message}`,
      badge: true,
    });
  }
};

export const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < Number(process.env.OTP_LENGTH); i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

/* This method will expire the OTP after OTP_LIFETIME */
export const invalidateOTP = (userObj) => {
  return setTimeout(() => {
    userObj.otp.isExpire = true;
    userObj.save();
  }, Number(process.env.OTP_LIFETIME));
};

export const getFileType = (file) => {
  return file?.type.includes("image") ? "image" : "video";
};
