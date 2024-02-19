export const otpGenerator = (length: number) => {
  let defaultLength = 4;
  if (length) {
    defaultLength = length;
  }
  let otp = '';
  for (let i = 0; i < defaultLength; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
