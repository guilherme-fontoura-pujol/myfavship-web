import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../contexts/AuthContext";
import { registerUser } from "../services/auth.service";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "O nome deve ter pelo menos 3 caracteres.")
      .max(80, "O nome deve ter no máximo 80 caracteres."),

    email: z
      .string()
      .trim()
      .min(1, "Informe o e-mail.")
      .email("Informe um e-mail válido."),

    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres."),

    passwordConfirmation: z
      .string()
      .min(1, "Confirme a senha."),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error;

    if (typeof message === "string") {
      return message;
    }

    if (error.code === "ERR_NETWORK") {
      return "Não foi possível conectar à API.";
    }
  }

  return "Não foi possível criar a conta.";
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { authenticate, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess(data) {
      authenticate(data);
      navigate("/", { replace: true });
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function onSubmit(data: RegisterFormData) {
    registerMutation.mutate({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    });
  }

  return (
    <main className="page">
      <section className="auth-card">
        <header>
          <p className="eyebrow">MyFavShip</p>
          <h1>Criar conta</h1>

          <p>
            Cadastre-se para votar nos seus ships favoritos.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="field">
            <label htmlFor="name">Nome</label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
            />

            {errors.name && (
              <span className="field-error">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email && (
              <span className="field-error">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />

            {errors.password && (
              <span className="field-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="passwordConfirmation">
              Confirmar senha
            </label>

            <input
              id="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              {...register("passwordConfirmation")}
            />

            {errors.passwordConfirmation && (
              <span className="field-error">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>

          {registerMutation.isError && (
            <div className="form-error" role="alert">
              {getErrorMessage(registerMutation.error)}
            </div>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Criando conta..."
              : "Criar conta"}
          </button>
        </form>

        <footer>
          Já possui conta?{" "}
          <Link to="/login">Entrar</Link>
        </footer>
      </section>
    </main>
  );
}9