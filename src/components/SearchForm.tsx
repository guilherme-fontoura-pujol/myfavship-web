import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(normalizedQuery)}`
    );
  }

  return (
    <form
      className="header-search-form"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Pesquisar..."
        aria-label="Pesquisar obras, personagens e ships"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button
        type="submit"
        aria-label="Pesquisar"
        disabled={query.trim().length < 2}
      >
        Buscar
      </button>
    </form>
  );
}