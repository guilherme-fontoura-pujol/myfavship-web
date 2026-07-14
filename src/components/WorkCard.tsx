import { Link } from "react-router-dom";
import { EntityImage } from "./EntityImage";

interface WorkCardProps {
  work: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
    releaseYear?: number | null;
    category:
      | string
      | {
          id: string;
          name: string;
        };
    votes?: number;
  };
}

export function WorkCard({ work }: WorkCardProps) {
  const category =
    typeof work.category === "string"
      ? work.category
      : work.category.name;

  return (
    <Link
      className="work-card"
      to={`/works/${work.slug}`}
    >
      <EntityImage
        className="work-card-image"
        src={work.coverImageUrl}
        alt={work.title}
      />

      <div className="work-card-overlay">
        <p>{category}</p>
        <h3>{work.title}</h3>

        {work.releaseYear && <span>{work.releaseYear}</span>}

        {typeof work.votes === "number" && (
          <span className="work-card-votes">
            {work.votes}{" "}
            {work.votes === 1 ? "voto" : "votos"}
          </span>
        )}
      </div>
    </Link>
  );
}