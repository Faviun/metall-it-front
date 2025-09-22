import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useTheme } from "../context/ThemeContext";
import { colors } from "../constants/themeColors";

const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Токен не найден. Сначала авторизуйтесь!");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ошибка при запросе");
  return data;
}

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { theme } = useTheme();
  const currentThemeColors = colors[theme];


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch("http://185.23.34.85:3000/users/profile");
        setUser(data);
        setEditData(data);
      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await apiFetch("http://localhost:3000/users/profile", {
        method: "PUT",
        body: JSON.stringify(editData),
      });
      setUser(updated);
      setEditData(updated);
      alert("Профиль обновлён!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Загрузка...</p>;

  return (
    <div className={`max-w-sm mx-auto mt-10 space-y-6 p-6 rounded-lg shadow-lg border transition-colors duration-300
        ${currentThemeColors.secondaryBackground}
        ${currentThemeColors.bordersDividers}`}>
      <Typography
        variant="h4"
        className={`text-center mb-6 ${currentThemeColors.primaryText}`}
        {...commonPlaceholderProps}
      >
        Профиль
      </Typography>
      {/* <p><b>Email:</b> {user.email}</p> */}
      <Input
        crossOrigin={undefined} label="email"
        name="email"
        type="email"
        disabled
        value={user.email}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <Input
        crossOrigin={undefined} label="Имя"
        name="firstName"
        type="text"
        value={editData.firstName || ""}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <Input
        crossOrigin={undefined} label="Фамилия"
        name="lastName"
        type="text"
        value={editData.lastName || ""}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <Input
        crossOrigin={undefined} label="Пол"
        name="sex"
        type="text"
        value={editData.sex || ""}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <Input
        crossOrigin={undefined} label="Телефон"
        name="phone"
        type="text"
        value={editData.phone || ""}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <Input
        crossOrigin={undefined} label="Адрес"
        name="address"
        type="text"
        value={editData.address || ""}
        onChange={handleChange}
        className={`${currentThemeColors.primaryText}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      
      />

      <div className="flex justify-between gap-2">
        {user.role === "ADMIN" && 
          <Button
            type="submit"
            fullWidth
            onClick={() => navigate("/admin-panel")}
            className={`mt-4 ${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
            {...commonPlaceholderProps}
          >
            Админская панель
          </Button>
        }

        <Button
          type="submit"
          fullWidth
          onClick={handleSave}
          disabled={saving}
          className={`mt-4 ${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
          {...commonPlaceholderProps}
        >
          {saving ? "Сохраняю..." : "Сохранить"}
        </Button>

        <Button
          type="submit"
          fullWidth
          onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
          className={`mt-4 ${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
          {...commonPlaceholderProps}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}

export default Profile;