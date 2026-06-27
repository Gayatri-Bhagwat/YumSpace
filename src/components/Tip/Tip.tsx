import "./Tip.css";
import { useState } from "react";
import { generateContent } from "../../services/gemini";
import "../GenerateRecipe/GenerateRecipeButton.css";

export default function Tip() {
  const [tip, setTip] = useState<string>(
    `Season as you go, not just at the end. Adding salt at each stage of cooking builds deeper, 
    more balanced flavor than a single pinch at the finish.`,
  );
  const handleGenerate = async () => {
    setTip("Loading tip...");
    try {
      const text = await generateContent(`System:

        You are a culinary expert. Each day, generate one practical recipe tip. Keep it:

        Short (2–3 sentences max)
        Actionable (something the cook can apply immediately)
        Varied (rotate across topics: knife skills, storage, seasoning, substitutions, timing, texture, plating)

        Never repeat the same tip twice.`);
      setTip(text);
    } catch (error) {
      console.error("AI Error:", error);
    }
  };
  return (
    <div className="TipClass">
      <div className="TipHeader">
        <span style={{ color: "#e8773d" }}>
          <span style={{ fontSize: "1.5rem" }}>💡</span>
          Chef's Tip
        </span>
      </div>
      <p>{tip || "Loading tip..."}</p>
      <button className="gen-btn" onClick={handleGenerate}>
        ✦ Generate Tip
      </button>
    </div>
  );
}
