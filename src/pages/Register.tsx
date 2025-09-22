import RegisterForm from "@/features/auth/components/RegisterForm";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

function RegisterPage() {

  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  return (
    <div
      className={`max-w-sm mx-auto mt-10 p-6 rounded-lg shadow-lg border transition-colors duration-300
        ${currentThemeColors.secondaryBackground}
        ${currentThemeColors.bordersDividers}`}
    >
        <RegisterForm />
      </div>
  );
}

export default RegisterPage;
