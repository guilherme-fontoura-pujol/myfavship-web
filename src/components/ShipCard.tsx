import { Link } from "react-router-dom";
import type { DashboardShip } from "../types/dashboard";
import { EntityImage } from "./EntityImage";

interface ShipCardProps {
  ship: DashboardShip;
  position: number;
}

export function ShipCard({
  ship,
  position,
}: ShipCardProps) {
  return (
    <article className="ship-card">
      <span className="ranking-position">
        #{position}
      </span>

      <EntityImage
        className="ship-card-image"
        src={ship.imageUrl}
        alt={ship.name}
      />

      <div className="ship-card-content">
        <p className="card-category">
          {ship.work.category}
        </p>

        <h3>{ship.name}</h3>

        <Link
          className="card-work-link"
          to={`/works/${ship.work.slug}`}
        >
          {ship.work.title}
        </Link>

        <p className="vote-count">
          {ship.votes} {ship.votes === 1 ? "voto" : "votos"}
        </p>
      </div>
    </article>
  );
}