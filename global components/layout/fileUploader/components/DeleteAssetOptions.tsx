"use client";

import { ButtonLight, ButtonRed } from "@global components/ui/Button";
import useFileUploader from "../hooks/useFileUploader";
import { getAssetReferences, getReferenceLabel } from "../utils/references";

type DeleteAssetOptionsProps = {
  forceDelete: () => void;
  unlinkAndDelete: () => void;
};

export default function DeleteAssetOptions({
  forceDelete,
  unlinkAndDelete,
}: DeleteAssetOptionsProps) {
  const { uploaderState } = useFileUploader();
  const targetAsset = uploaderState.targetAsset;

  if (!targetAsset) return;

  const references = getAssetReferences(targetAsset);
  const isLinked = references.length > 0;

  return (
    <div
      className="feature-container-vertical min-w-100 min-h-50 text-style__small-text"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex-1">
        This file is being used:{" "}
        <strong className="text-(--secondary-blue)">{references.length}</strong>{" "}
        references
        {isLinked && (
          <ul className="ml-4 text-style__small-text text-(--primary-grey) flex flex-col gap-1">
            {references.slice(0, 5).map((reference) => (
              <li key={reference.id} className="list-disc">
                {getReferenceLabel(reference)}
              </li>
            ))}
            {references.length > 5 && (
              <div>{references.length - 5} view more</div>
            )}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <ButtonLight
          buttonText="Unlink and delete"
          clickAction={unlinkAndDelete}
        />
        <ButtonRed buttonText="Delete anyway" clickAction={forceDelete} />
      </div>
    </div>
  );
}
