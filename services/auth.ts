import axios from "axios";

export const loginUser = async (username: string, password: string) => {
  const data = {
    username: username,
    password: password,
    id_jns_mobile: 4,
  };

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
    data
  );
};
