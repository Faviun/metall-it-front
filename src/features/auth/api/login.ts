import axios from "axios";
import type { LoginData } from "../types/auth";

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post("/api/login", data);
    console.log("Успешный вход:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};