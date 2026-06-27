import { useState } from "react";
import "./GenerateRecipeButton.css";
import { RxCross2 } from "react-icons/rx";
import DropDown from "../DropDown/DropDown";
import { generateRecipeFromIngredients, type GeneratedRecipe } from "../../services/gemini";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../features/addRecipe/addRecipeSlice";
import { addNewRecipe } from "../../services/APIService";
import { getPlaceholderEmoji } from "../../services/ClassifyRecipeImage";


export default function GenerateRecipeButton() {
  const dispatch = useDispatch();
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [generateRecipeForm, setGenerateRecipeForm] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ servings: number; cuisine: string; dietary: string }>({
    servings: 2,
    cuisine: "Any",
    dietary: "None",
  });

  const handleGenerateRecipe = async () => {
    if (ingredientList.length === 0) return;
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const result = await generateRecipeFromIngredients(
        ingredientList,
        filters.servings,
        filters.cuisine,
        filters.dietary,
      );
      setGeneratedRecipe(result);
    } catch (err) {
      console.error(err);
      setGenerateError("Gemini couldn't build the recipe this time. Try again or adjust your ingredients.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setGenerateRecipeForm(false);
    setGeneratedRecipe(null);
    setGenerateError(null);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!generatedRecipe) return;
    setIsSaving(true);
    setSaveError(null);
    const payload = {
      id: 0,
      title: generatedRecipe.title,
      description: generatedRecipe.description,
      time_minutes: generatedRecipe.time_minutes,
      servings: filters.servings,
      tag: generatedRecipe.tag,
      ingredient: generatedRecipe.ingredient,
      recipe_procedure: generatedRecipe.recipe_procedure,
      image: "",
      likes: 0,
      created_at: new Date().toISOString(),
      user: { name: "", headline: "", email: "" },
    };
    try {
      const result = await addNewRecipe(payload);
      if (result.success) {
        dispatch(addRecipe({ ...payload, id: result.data?.id ?? 0 }));
        handleClose();
      } else {
        setSaveError("Failed to save. Please try again.");
      }
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* ── sidebar card ── */}
      <div className="generateRecipe">
        <span className="generateRecipeHeader">🪄 Generate Recipe</span>
        <span className="generateRecipeContent">
          Have ingredients but no idea what to cook? Let Gemini build a full recipe from what's in your kitchen.
        </span>
        <div className="ingredientPillSection">
          {ingredientList.map((i) => (
            <span key={i} className="ingredientPill">{i}</span>
          ))}
          <span className="ingredientPill">+ Your Ingredients</span>
        </div>
        <button className="gen-btn" onClick={() => setGenerateRecipeForm(true)}>
          ✦ Try it
        </button>
      </div>

      {/* ── modal ── */}
      {generateRecipeForm && (
        <div className="overlay">
          <div className="gen-recipe-modal">

            {/* header */}
            <div className="gen-recipe-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="gen-recipe-icon">🪄</span>
                <div>
                  <div className="m-title">
                    {generatedRecipe ? generatedRecipe.title : "Generate Recipe from Ingredients"}
                  </div>
                  <div className="m-sub">
                    {generatedRecipe ? "AI Generated Recipe" : "Tell Gemini what you have — get a full recipe back"}
                  </div>
                </div>
              </div>
              <RxCross2
                size="1.5rem"
                style={{ cursor: "pointer", flexShrink: 0 }}
                onClick={handleClose}
              />
            </div>

            {/* body */}
            <div className="gen-recipe-body">

              {/* loading */}
              {isGenerating && (
                <Skeleton
                  count={6}
                  height={40}
                  baseColor="#f0e6dc"
                  highlightColor="#faf0e8"
                  borderRadius="12px"
                  style={{ marginBottom: "0.5rem" }}
                />
              )}

              {/* error */}
              {!isGenerating && generateError && (
                <div className="gen-error-box">
                  <span>⚠️ {generateError}</span>
                  <button
                    className="gen-error-retry"
                    onClick={() => { setGenerateError(null); handleGenerateRecipe(); }}
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* input form */}
              {!isGenerating && !generatedRecipe && (
                <>
                  <div className="Ing-body">
                    <span className="m-label">Ingredients you have</span>
                    <span className="input-chips">
                      {ingredientList.map((i) => (
                        <span key={i} className="ingredientPill">
                          {i}{" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setIngredientList((prev) => prev.filter((ing) => ing !== i))
                            }
                          >
                            ✕
                          </span>
                        </span>
                      ))}
                      <input
                        className="chip-input"
                        placeholder="Type and press Enter…"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              setIngredientList((prev) => [...prev, value]);
                              input.value = "";
                            }
                          }
                        }}
                      />
                    </span>
                  </div>

                  <div className="prefs-grid">
                    <div className="pref-group">
                      <label>Servings</label>
                      <DropDown
                        className="pref-select"
                        selectOptions={[1, 2, 4, 6, 8]}
                        value={filters.servings}
                        onChange={(val) => setFilters((prev) => ({ ...prev, servings: Number(val) }))}
                      />
                    </div>
                    <div className="pref-group">
                      <label>Cuisine</label>
                      <DropDown
                        className="pref-select"
                        selectOptions={["Any", "Italian", "Indian", "Chinese", "Korean"]}
                        value={filters.cuisine}
                        onChange={(val) => setFilters((prev) => ({ ...prev, cuisine: String(val) }))}
                      />
                    </div>
                    <div className="pref-group">
                      <label>Dietary</label>
                      <DropDown
                        className="pref-select"
                        selectOptions={["None", "Vegetarian", "Vegan", "Non-Vegetarian"]}
                        value={filters.dietary}
                        onChange={(val) => setFilters((prev) => ({ ...prev, dietary: String(val) }))}
                      />
                    </div>
                  </div>

                  <button
                    className="modal-gen-btn"
                    onClick={handleGenerateRecipe}
                    disabled={ingredientList.length === 0}
                  >
                    ✦ Generate Recipe
                  </button>
                </>
              )}

              {/* result */}
              {!isGenerating && generatedRecipe && (
                <div>
                  {/* banner image */}
                  <div className="r-recipe-img">
                    {getPlaceholderEmoji(generatedRecipe.tag)}
                  </div>

                  {/* title + AI badge */}
                  <div className="r-title-row">
                    <span className="r-title">{generatedRecipe.title}</span>
                    <span className="ai-badge">✦ AI Generated</span>
                  </div>

                  {/* description */}
                  <p className="r-desc">{generatedRecipe.description}</p>

                  {/* meta pills */}
                  <div className="r-meta">
                    <span className="r-pill">⏱ {generatedRecipe.time_minutes} min</span>
                    <span className="r-pill">🍽 {filters.servings} servings</span>
                    {generatedRecipe.tag.map((t) => (
                      <span key={t.name} className="r-pill">{t.name}</span>
                    ))}
                  </div>

                  <hr className="r-divider" />

                  {/* two-column body */}
                  <div className="two-col">
                    {/* ingredients */}
                    <div>
                      <div className="col-label">Ingredients</div>
                      <div className="ing-list">
                        {generatedRecipe.ingredient.map((ing) => (
                          <div key={ing.name} className="ing-item">
                            <div className="ing-dot" />
                            <span>{ing.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* steps */}
                    <div>
                      <div className="col-label">Steps</div>
                      <div className="step-list">
                        {generatedRecipe.recipe_procedure.map((s) => (
                          <div key={s.step} className="step">
                            <div className="step-num">{s.step}</div>
                            <div className="step-text">
                              <div className="step-title">{s.title}</div>
                              {s.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* save error */}
                  {saveError && (
                    <div style={{ fontSize: "0.72rem", color: "#c0392b", marginTop: "0.6rem" }}>
                      ⚠ {saveError}
                    </div>
                  )}

                  {/* actions */}
                  <div className="r-actions">
                    <button
                      className="r-btn"
                      onClick={() => setGeneratedRecipe(null)}
                      disabled={isSaving}
                    >
                      ↺ Regenerate
                    </button>
                    <button
                      className="r-btn primary"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving…" : "＋ Save to YumSpace"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
