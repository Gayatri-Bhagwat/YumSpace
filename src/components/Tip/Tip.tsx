import "./Tip.css"
import React from "react";
import { generateContent } from "../../services/gemini";


export default function Tip() {
    const [tip, setTip] = React.useState<string>("Tip: Always read the full recipe before you start cooking!");
    const handleGenerate = async () => {
        setTip("Loading tip...");
        try {
            const text = await generateContent(`
                Give one cooking tip in exactly one short sentence. Be specific and useful.`
            );
            setTip(text);
        } catch (error) {
            console.error("AI Error:", error);
        }
    };
    return (
        <div className="TipClass">
            <div className="TipHeader">
                <span>
                    <span style={{fontSize:"1.5rem"}}>💡</span> Tip of the Day
                </span>
            </div>
            <p>
                {tip || "Loading tip..."}
            </p>
            <button style={{
                background: "#e8773d",
                outline: "none",
                border: "none",
                color: "white",
                height: "2.3rem",
                fontSize: "medium",
                borderRadius: "0.5rem",
                cursor: "pointer",
            }} onClick={handleGenerate}>Generate Tip</button>
        </div>
    )
}



