"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";

// hooks
import useMediaAssets from "@features/mediaAndAssets/hooks/useAssets";
// import useImageUploader from "../hooks/useImageUploader";

export default function ImageUploaderFileEditor({
  changeFunc,
}: {
  changeFunc: (val: string) => void;
}) {
  const { state, actions } = useMediaAssets();
  // const { imageUploaderState } = useImageUploader();

  // console.log(imageUploaderState.newEmptyAsset);

  const currentAsset = state.currentAsset;
  if (!currentAsset) return;

  return (
    <form
      onSubmit={(e) => actions.handleSubmitMediaAsset(e, currentAsset)}
      className="feature-container-vertical h-fit text-style__body"
    >
      <div className="relative">
        <FontAwesomeIcon
          icon={["fas", "xmark"]}
          className="absolute right-0 text-(--primary-blue) cursor-pointer"
          onClick={() => actions.handleResetAssetStates("re-upload")}
        />
      </div>

      <div className="vertical-layout__inner">
        <InputArea
          label={`Rename your file? (optional), don't include the "${currentAsset.contentType}" file extension name`}
          val={state.fileName.split(".").slice(0, -1).join(".")}
          changeFunc={(val) =>
            state.setFileName(`${val}${currentAsset.contentType}`)
          }
        >
          {currentAsset.contentType}
        </InputArea>
      </div>

      <Button
        type="submit"
        className="flex-1"
        buttonText="Add Image"
        clickAction={() => changeFunc(currentAsset.name)}
      >
        {state.uploadingStatus && <Loader />}
      </Button>
    </form>
  );
}
