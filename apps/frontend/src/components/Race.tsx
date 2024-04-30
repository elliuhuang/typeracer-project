import { useState, useEffect, FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/race.css";
import React from "react";
import axios from "axios";

interface quotesProps {
  text: string;
  author: string;
}

const Letter: FC<{ letter: string }> = ({ letter }) => {
  return <span className="typeracer-letter">{letter}</span>;
};

const Race = () => {
  const typeRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<number>(3);
  const [timer, setTimer] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countWrong, setCountWrong] = useState<number>(0);
  const [sentence, setSentence] = useState<quotesProps>({
    text: "",
    author: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    if (
      currentIndex === sentence.text.length - 1 &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {
      localStorage.setItem("timer", (timer - 3).toString());
      localStorage.setItem("sentence-info", JSON.stringify(sentence));
      localStorage.setItem("count-wrong", countWrong.toString());
      navigate("/results");
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const keyBind = (e: any) => {
    if(e.keyCode === 16) return
    if (start !== 0) return;

    if (
      e.key === sentence.text[currentIndex] &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {
      setCurrentIndex(currentIndex + 1);
      typeRef!.current?.children[currentIndex].classList.add("correct");

    } else if (
      e.key !== sentence.text[currentIndex] &&
      e.key !== "Backspace" &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {

      typeRef!.current?.children[currentIndex].classList.add("wrong");
      setCountWrong(countWrong + 1);
  
    } else if (e.key === "Backspace" && currentIndex >= 0) {
      typeRef!.current?.children[currentIndex].classList.remove("wrong");
    }
  };

  useEffect(() => {
    if (start !== 0) return;

    window.addEventListener("keyup", keyBind);
    return () => window.removeEventListener("keyup", keyBind);
  });

  const getQuotes = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/quotes/random");
      const quote = response.data[0];
      const filterResponse: quotesProps = {
        text: quote.content,
        author: quote.author
      };
      setSentence(filterResponse);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    let startTimer: number;

    startTimer = window.setTimeout(() => {
      setStart(start - 1);
    }, 1000);

    if (start === 0) clearTimeout(startTimer);
  });

  return (
    <div className="pg-container">
      <div className="letter-container" ref={typeRef}>
        {start === 0
          ? sentence.text.split("").map((letter: string, i: number) => {
              return <Letter letter={letter} key={i} />;
            })
          : null}
      </div>
      {start !== 0 ? <h1>{start}</h1> : null}
    </div>
  );
};

export default Race;