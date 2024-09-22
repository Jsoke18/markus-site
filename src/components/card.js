import React from "react";
import { useSpring, animated } from "react-spring";
import styles from "./Card.module.css";

function Card({ imagen, title }) {
  const [props, set] = useSpring(() => ({
    transform: "scale(1)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)"
  }));

  return (
    <animated.div
      className={styles.cardWrapper}
      style={props}
      onMouseEnter={() => set({
        transform: "scale(1.03)",
        boxShadow: "0 20px 25px rgba(0, 0, 0, 0.25)"
      })}
      onMouseLeave={() => set({
        transform: "scale(1)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)"
      })}
    >
      <div className={styles.card}>
        <img src={imagen} alt={title} className={styles.cardImage} />
        <div className={styles.titleOverlay}>
          <p>{title}</p>
        </div>
      </div>
    </animated.div>
  );
}

export default Card;