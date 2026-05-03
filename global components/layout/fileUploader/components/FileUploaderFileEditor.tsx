"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";

// hooks
import useFileUploader from "../hooks/useFileUploader";

// utils
import { removeExtensionName } from "../utils/removeExtensionName";

export default function FileUploaderFileEditor({
  changeFunc,
}: {
  changeFunc: (val: string) => void;
}) {
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changeFunc(uploaderState.fileName);
        uploaderActions.fileUploadingHandler();
        console.log(uploaderState.targetAsset);
      }}
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
        >
          {uploaderActions.fileExtension}
        </InputArea>
      </div>

      <Button type="submit" className="flex-1" buttonText="Add File">
        {uploaderState.uploadingFile && <Loader />}
      </Button>
    </form>
  );
}
