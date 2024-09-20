import React from "react";
import { useSpring, animated } from "react-spring";
import Styles from "./Card.module.css";

function Card({ imagen, title }) {
  const [props3, set] = useSpring(() => ({ 
    transform: "scale(1)",
    boxShadow: "0 2px 10px rgb(0 0 0 / 8%)"
  }));

  return (
    <animated.div
      className={Styles.cardWrapper}
      style={props3}
      onMouseEnter={() => set({ 
        transform: "scale(1.03)", 
        boxShadow: "0 20px 25px rgb(0 0 0 / 25%)"
      })}
      onMouseLeave={() => set({ 
        transform: "scale(1)", 
        boxShadow: "0 2px 10px rgb(0 0 0 / 8%)"
      })}
    >
      <div className={Styles.card}>
        <img src={imagen} alt={title} className={Styles.cardImage} />
        <div className={Styles.titleOverlay}>
          <p>{title}</p>
        </div>
      </div>
    </animated.div>
  );
}

export default Card;