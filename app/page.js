"use client";
import Image from "next/image";
import DailyVerse from "./components/Dailyverse";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let canvas = document.getElementById("miCanvas");
    let context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseCoords = {
      x: undefined,
      y: undefined,
    };

    window.addEventListener("mousemove", (e) => {
      if (mouseCoords.x < e.x) {
        puntos.forEach((punto) => {
          punto.x -= -0.6;
        });
      }

      if (mouseCoords.x > e.x) {
        puntos.forEach((punto) => {
          punto.x += -0.6;
        });
      }

      if (mouseCoords.y < e.y) {
        puntos.forEach((punto) => {
          punto.y -= -0.6;
        });
      }

      if (mouseCoords.y > e.y) {
        puntos.forEach((punto) => {
          punto.y += -0.6;
        });
      }

      mouseCoords.x = e.x;
      mouseCoords.y = e.y;
    });

    function Punto() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3;
      this.floatX = Math.random() * 0.3 - 0.1;
      this.floatY = Math.random() * 0.3 - 0.1;
      this.color = randomColor();

      this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 360);
        context.fill();
      };

      this.update = function () {
        if (this.x > canvas.width) this.x = -10;
        if (this.x < -20) this.x = canvas.width;
        if (this.y > canvas.height) this.y = -10;
        if (this.y < -20) this.y = canvas.height;

        this.x += this.floatX;
        this.y += this.floatY;
        this.draw();
      };
    }

    let puntos = [];
    for (let i = 0; i < 150; i++) puntos[i] = new Punto();

    function move() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      puntos.forEach((punto) => {
        punto.update();
      });

      requestAnimationFrame(move);
    }

    move();

    function randomColor() {
      let random = Math.random() * 3;
      if (random > 2) return "rgb(206, 206, 206)";
      if (random < 2 && random > 1) return "#1E293B";
      if (random < 1) return "#7db424";
    }
  }, []);

  return (
    <div className="">
      <canvas id="miCanvas"></canvas>
      <video src="/bganimation.mp4" autoPlay muted loop className="brightness-90 w-full saturate-100 object-cover h-screen absolute top-0"/>
      {/* <Image
        src="/images/home.jpg"
        alt="bg image"
        className="brightness-90 w-full h-screen absolute top-0"
        // layout="fill"
        width={1000}
        height={1000}
      /> */}
      <main className="">
        {/* Kids Background Image */}
        <div className="relative -top-10 h-max w-fit mx-auto inset-0 flex items-center justify-center">
          <Image
            src="/images/kidsbg.png"
            alt="bg image"
            width={1000}
            height={1000}
            className="w-full  md:w-[67vw] object-contain"
          />
          <div className="absolute top-16 right-16 flex flex-col justify-between items-end gap-5">
            <Image
              src="/images/readthebible.png"
              alt="bg image"
              width={500}
              height={500}
              className="w-[25rem] animate-shake animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-normal  duration-200"
            />

            <DailyVerse />
          </div>
        </div>

        {/* Read the Bible Image */}
      </main>
    </div>
  );
}
