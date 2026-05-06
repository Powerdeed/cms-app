"use client";

import useFileUploader from "../../hooks/useFileUploader";

export default function SetPaths() {
  const { uploaderState } = useFileUploader();
  const targetAsset = uploaderState.targetAsset;

  if (!targetAsset) return null;
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-2.5">
      <select
        value={uploaderState.firstPath}
        onChange={(e) => {
          uploaderState.setFirstPath(e.target.value);
          uploaderState.setSecondPath("");
        }}
        className="input-style w-full"
      >
        <option value={undefined}>select specific location</option>

        {[...new Set(uploaderState.firstPathArr)].map((paths) => (
          <option key={paths} value={paths}>
            {paths}
          </option>
        ))}
      </select>

      {uploaderState.firstPath && uploaderState.secondPaths.length > 0 && (
        <select
          value={uploaderState.secondPath}
          onChange={(e) => uploaderState.setSecondPath(e.target.value)}
          className="input-style w-full"
        >
          <option value={undefined}>which {uploaderState.firstPath}?</option>

          {uploaderState.secondPaths.map((path) => {
            return (
              <option key={path} value={path}>
                {path}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
