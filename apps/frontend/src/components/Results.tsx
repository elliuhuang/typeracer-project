import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import '../style/results.css'
import React from "react"
import { useAuth } from '../context/AuthContext.tsx';


const defaultState = {
    timer: 0,
    sentence: {
        author: "",
        text: ""
    }, 
    mistakes: 0
}


const Results = () => {
    const [results, setResults] = useState(defaultState)
    const navigate = useNavigate();
    const { signedIn } = useAuth();

    useEffect(() => {
        const timer = JSON.parse(localStorage.getItem("timer")!)
        const sentence = JSON.parse(localStorage.getItem("sentence-info")!)
        const mistakes = JSON.parse(localStorage.getItem("count-wrong")!)
        
        setResults({
            timer: timer,
            sentence: sentence,
            mistakes: mistakes
        });

        if (signedIn) {
            saveResults(timer, sentence.text, mistakes);
        }
    }, []);

    const calculateWPM = (text: string, timer: number) => {
        const words = text.split(' ');
        const wpm = Math.floor((words.length / timer) * 60);
        return wpm;
    };

    const saveResults = (timer: number, sentence: string, mistakes: number) => {
        const wpm = calculateWPM(sentence, timer);

        const userResults = {
            wpm: wpm,
            mistakes: mistakes
        };

        fetch('/api/account/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userResults)
        })
        .then(response => {
            if (response.ok) {
                console.log('Results saved successfully');
            } else {
                console.error('Failed to save results');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <div className="results-container">
            <main>
                <p className="wpm">WPM: {calculateWPM(results.sentence.text, results.timer)}</p> 
                <p className="mistakes" style={{color: "#ff4c4c"}}>Mistakes: {results.mistakes}</p>
                <br />
                <p className="quote">You typed {results.sentence.author}'s quote</p>
                <p style={{fontSize: "1.2rem"}}>{results.sentence.text}</p>
                <button style={{transform: "translateY(20px)"}} onClick={() => navigate("/race")}>Play Again</button>
                <button style={{transform: "translateY(20px)"}} onClick={() => navigate("/")}>Home</button>
            </main>
        </div>
    )
}

export default Results