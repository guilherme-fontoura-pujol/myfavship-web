import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <main className="page">
      <section className="panel">
        <h1>Criar conta</h1>
        <p>O formulário de cadastro será o próximo passo.</p>
        <Link to="/login">Voltar para o login</Link>
      </section>
    </main>
  );
}