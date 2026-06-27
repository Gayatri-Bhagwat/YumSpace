import "./Badge.css";

export default function Badge({
  content,
  isTag,
  isActive,
  setSelectedTag,
}: {
  content: string;
  isTag: boolean;
  isActive?: boolean;
  setSelectedTag?: (content: string) => void;
}) {
  return (
    <button
      onClick={() => setSelectedTag?.(content)}
      className={`${isTag ? "TagBadge" : "IngredientBadge"}${isActive ? " active" : ""}`}
    >
      {content}
    </button>
  );
}
