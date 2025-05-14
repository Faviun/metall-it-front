import { Link } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Регистрация", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto space-y-4">
      <Typography variant="h4">Регистрация</Typography>
      <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
      <Input type="password" label="Пароль" name="password" value={formData.password} onChange={handleChange} />
      <Button type="submit" className="bg-blue-gray-600" fullWidth>
        Зарегистрироваться
      </Button>

      <div className="mt-4 text-center">
        <Typography variant="small">
          Уже есть аккаунт? <Link to="/login" className="text-blue-500">Войти</Link>
        </Typography>
      </div>
    </form>
  );
}

export default RegisterForm;


// import { Link } from "react-router-dom";
// import { Input, Button, Typography } from "@material-tailwind/react";
// import { useState } from "react";

// function RegisterForm() {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Регистрация", formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-lg shadow-lg border border-blue-gray-200 max-w-sm w-full mx-auto space-y-6"
//     >
//       <Typography variant="h4" className="text-center text-blue-gray-700">
//         Регистрация
//       </Typography>
      
//       <Input
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="bg-blue-gray-50"
//       />
      
//       <Input
//         type="password"
//         label="Пароль"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         className="bg-blue-gray-50"
//       />

//       <Button type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700 text-white">
//         Зарегистрироваться
//       </Button>

//       <div className="mt-4 text-center">
//         <Typography variant="small" className="text-blue-gray-600">
//           Уже есть аккаунт?{" "}
//           <Link to="/login" className="text-blue-500 hover:text-blue-700">
//             Войти
//           </Link>
//         </Typography>
//       </div>
//     </form>
//   );
// }

// export default RegisterForm;
