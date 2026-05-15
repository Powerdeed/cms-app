"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";

// hooks
import useFileUploader from "../hooks/useFileUploader";

// utils
import { removeExtensionName } from "../utils/removeExtensionName";
import { Asset } from "../types/asset.types";

type FileRenameAndUploadProps = {
  onAssetUploaded?: (asset: Asset) => void;
};

export default function FileRenameAndUpload({
  onAssetUploaded,
}: FileRenameAndUploadProps = {}) {
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <form
      onSubmit={(e) =>
        uploaderActions.uploadFileAndSetStates(e, onAssetUploaded)
      }
      className="feature-container-vertical h-fit text-style__body"
    >
      <div className="relative">
        <FontAwesomeIcon
          icon={["fas", "xmark"]}
          className="absolute right-0 text-(--primary-blue) cursor-pointer"
          onClick={() => uploaderActions.handleResetAssetStates("cancel")}
        />
      </div>

      <div className="vertical-layout__inner">
        <InputArea
          label={`Rename your file? (optional), don't include the "${uploaderActions.fileExtension}" file extension name`}
          val={removeExtensionName(uploaderState.fileName)}
          changeFunc={(val) => {
            uploaderState.setFileName(`${val}${uploaderActions.fileExtension}`);
          }}
          autoFocus
        >
          {uploaderActions.fileExtension}
        </InputArea>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          type="submit"
          className="flex-1"
          buttonText="Add File"
          disabled={uploaderState.isAssetUploading}
        >
          {uploaderState.isAssetUploading && <Loader />}
        </Button>

        <ButtonLight
          className="flex-1"
          buttonText="re-upload"
          clickAction={() =>
            uploaderActions.handleResetAssetStates("re-upload")
          }
          disabled={uploaderState.isAssetUploading}
        />
      </div>
    </form>
  );
}
