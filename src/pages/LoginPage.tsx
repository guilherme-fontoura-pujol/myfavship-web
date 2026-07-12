import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/auth.service";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe o e-mail.")
    .email("Informe um e-mail válido."),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LocationState {
  from?: string;
}

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

  return "Não foi possível realizar o login.";
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate, isAuthenticated } = useAuth();

  const state = location.state as LocationState | null;
  const destination = state?.from ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess(data) {
      authenticate(data);
      navigate(destination, { replace: true });
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data);
  }

  return (
    <main className="page">
      <section className="auth-card">
        <header>
          <p className="eyebrow">MyFavShip</p>
          <h1>Entrar</h1>
          <p>Acesse sua conta para votar nos seus ships.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              autoComplete="current-password"
              {...register("password")}
            />

            {errors.password && (
              <span className="field-error">
                {errors.password.message}
              </span>
            )}
          </div>

          {loginMutation.isError && (
            <div className="form-error" role="alert">
              {getErrorMessage(loginMutation.error)}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending
              ? "Entrando..."
              : "Entrar"}
          </button>
        </form>

        <footer>
          Ainda não possui conta?{" "}
          <Link to="/register">Cadastre-se</Link>
        </footer>
      </section>
    </main>
  );
}