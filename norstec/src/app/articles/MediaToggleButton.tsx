import { MediaType } from "@/types/media";

interface Props {
  mediaType: MediaType;
  selected: MediaType[];
  setSelected: (types: MediaType[]) => void;
}

export const MediaToggleButton = ({
  mediaType,
  selected,
  setSelected,
}: Props) => {
  const isActive = selected.includes(mediaType);

  return (
    <button
      onClick={() =>
        setSelected(
          isActive
            ? selected.filter((t) => t !== mediaType)
            : [...selected, mediaType]
        )
      }
      className={`px-4 py-2 rounded-full text-sm font-medium transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
    >
      {mediaType}
    </button>
  );
};
