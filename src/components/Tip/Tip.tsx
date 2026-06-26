import "./Tip.css"
import React from "react";
import { generateContent } from "../../services/gemini";
import "../GenerateRecipe/GenerateRecipeButton.css"

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
                <span style={{color:'#e8773d'}}>
                    <span style={{fontSize:"1.5rem"}}>💡</span> 
                    Chef's Tip
                </span>
            </div>
            <p>
                {tip || "Loading tip..."}
            </p>
            <button className="gen-btn" onClick={handleGenerate}>✦ Generate Tip</button>
        </div>
    )
}



