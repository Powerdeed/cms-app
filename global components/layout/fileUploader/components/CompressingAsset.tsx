"use client";

import useFileUploader from "../hooks/useFileUploader";

export default function CompressingAsset() {
  const { uploaderState } = useFileUploader();

  const progress = uploaderState.compressionProgress;
  const angle = progress !== null ? (progress / 100) * 360 : 0;

  return (
    <div className="w-full h-80 justify-center items-center feature-container-vertical">
      <div
        className="grid place-items-center w-32 h-32 rounded-full"
        style={{
          background: `conic-gradient(rgb(59, 130, 246) ${angle}deg, transparent 0)`,
        }}
      >
        <div className="w-30 h-30 bg-(--terciary-grey) rounded-full grid place-items-center text-center text-(--primary-blue)">
          <div>
            <div style={{ fontStyle: "italic", fontSize: "13px" }}>
              progress
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {progress !== null && `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
