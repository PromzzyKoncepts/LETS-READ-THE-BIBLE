"use client"
import React from "react";
import { useEffect } from "react";
import Script from "next/script";
import styles from "./InteractiveFigures.module.css"; // Import the CSS module

const InteractiveFigures = () => {
  useEffect(() => {
    const figures = document.querySelectorAll(`.${styles.snip1146}`);
    figures.forEach((figure) => {
      figure.addEventListener("mouseleave", () => {
        figure.classList.remove(styles.hover);
      });
    });
  }, []);

  return (
    <div className={`${styles.container} flex px-28 py-7 font-lucky`}>
      <figure className={`${styles.snip1146} rounded-xl `}>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample2.jpg"
          alt="sq-sample2"
        />
        <span>
          <i className="ion-ios-download-outline"></i>Gen 22:1-28
        </span>
        <a href="#"></a>
      </figure>
      <figure className={`${styles.snip1146} rounded-xl ${styles.blue} ${styles.hover} `}>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample4.jpg"
          alt="sq-sample4"
        />
        <span>
          <i className="ion-ios-refresh-empty"></i>PSALM 119:1-50
        </span>
        <a href="#"></a>
      </figure>
      <figure className={`${styles.snip1146} rounded-xl ${styles.green}`}>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg"
          alt="sq-sample3"
        />
        <span>
          <i className="ion-ios-star-outline"></i>Luke 28:1-19
        </span>
        <a href="#"></a>
      </figure>

      <figure className={`${styles.snip1146} rounded-xl `}>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample2.jpg"
          alt="sq-sample2"
        />
        <span>
          <i className="ion-ios-download-outline"></i>Gen 22:1-28
        </span>
        <a href="#"></a>
      </figure>
    </div>
  );
};

export default InteractiveFigures;
