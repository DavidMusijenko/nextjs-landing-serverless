import axios from "axios";

export const SendEmail = async ({
  fullName,
  email,
  phone,
  message,
  setSend,
}) => {
  try {
    const datas = { fullName, email, phone, message };
    let res = await axios.post(
      `https:/nextjs-landing-server.vercel.app:443/send`,
      datas
    );
    if (res) {
      setSend(res);
    }
  } catch (error) {}
};
