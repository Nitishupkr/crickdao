import React from "react";
import styles from "../styles/card.module.css";

export const Card = ({
  image,
  name,
  position,
  price,
  address,
  description,
}) => {
  return (
    <div>
      <a href="" className={styles.card}>
        <img src={image} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <div className="card__header-text">
              <h2 className={styles.card__thumb}>{price} matic</h2>
              <h3 className={styles.card__title}>{name}</h3>
              <span className="card__status">{position}</span>
            </div>
          </div>
          <p className="card__description">
            {description ? description.slice(0, 200) : "No Description"}
          </p>
        </div>
      </a>
    </div>
  );
};
