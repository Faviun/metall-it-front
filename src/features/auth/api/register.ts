import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post("/api/register", data);
    return response.data; // или можно вернуть полный ответ, если нужно
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error; // обработка ошибок
  }
};
