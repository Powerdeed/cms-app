"use client";

import Button, { ButtonRed, DeleteIconBtn } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";
import Toggle from "@global components/ui/Toggle";
import {
  FileUploader,
  useFileUploader,
} from "@global components/layout/fileUploader";

import useService from "../hooks/useService";

import { toPascalCase } from "@globals";

export default function ServiceEditor() {
  const { state, actions } = useService();
  const { uploaderState } = useFileUploader();

  return (
    <div
      className={`flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 ${state.hasServiceChanged ? "border-(--secondary-blue)" : "border-(--terciary-grey)"} border bg-white rounded-[10px] text-style__body`}
    >
      <div className="text-(--secondary-blue) text-style__small-text">
        {state.hasServiceChanged &&
          "changes have been made, save before exiting"}
      </div>

      <div className="text-style__subheading">
        {state.isNewService ? "Add New Service" : "Edit Service"}
      </div>

      {!state.selectedService && <div>Select a service to start editing</div>}

      {state.selectedService && (
        <div className="vertical-layout__outer">
          <InputArea
            label={toPascalCase("name")}
            changeFunc={(val) => actions.modifyService("name", val)}
            val={state.selectedService.name}
          />

          <InputArea
            label={toPascalCase("description")}
            changeFunc={(val) => actions.modifyService("description", val)}
            val={state.selectedService.description}
          />

          <div className="vertical-layout__outer">
            <div className="flex-1 text-style__body">Images</div>
            {state.selectedService.images.map((image, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 hover:cursor-pointer"
              >
                <div
                  className="flex-1 p-2 bg-(--secondary-grey)/30 rounded-[10px] hover:bg-(--secondary-grey)/50 duration-300"
                  onClick={() => {
                    uploaderState.setSelectedAssetId(image[0]);
                  }}
                >
                  {image[1]}
                </div>

                {uploaderState.isAssetDeleting && <Loader />}

                <DeleteIconBtn
                  deleteFunc={() => {
                    actions.handleDeleteImage(image[0]);
                  }}
                />
              </div>
            ))}

            <FileUploader />
          </div>

          <div className="flex">
            <div className="flex-1 text-style__body">Set as active</div>

            <Toggle
              state={state.selectedServiceStatus}
              stateSetter={state.setSelectedServiceStatus}
            />
          </div>

          <div className="flex justify-between">
            <Button
              buttonText={state.isNewService ? "Add Service" : "Save Changes"}
              clickAction={() => {
                if (state.isNewService) {
                  actions.handleUploadNewService();
                } else {
                  actions.handleUploadServiceChanges();
                }
              }}
              disabled={state.isUploading}
            >
              {state.isUploading && <Loader />}
            </Button>

            <ButtonRed
              buttonText={
                state.isNewService ? "Ignore Service" : "Delete Service"
              }
              clickAction={() => {
                if (state.isNewService) {
                  actions.handleIgnoreNewService();
                } else {
                  actions.handleDeleteService();
                }
              }}
              disabled={state.isDeleting}
            >
              {state.isDeleting && <Loader />}
            </ButtonRed>
          </div>

          {state.error && (
            <div className="text-(--primary-red)">*{state.error}*</div>
          )}
        </div>
      )}
    </div>
  );
}
