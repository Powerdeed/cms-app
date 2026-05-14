"use client";

import { SectionTitle } from "@global components/ui/Title";
import {
  FileMetaEditor,
  useFileUploader,
} from "@global components/layout/fileUploader";

import HomePage from "./homepage/HomePage";
import ContactPage from "./contactpage/ContactPage";
import AboutPage from "./aboutpage/AboutPage";

import { PAGE_META } from "../constants/PageMetaData";
import { PAGES } from "../constants/pages";

import useWebsiteContent from "../hooks/useWebsiteContent";

export default function WebsiteContentView() {
  const { state } = useWebsiteContent();
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <div className="relative page-layout">
      <SectionTitle title={PAGE_META.title} subtitle={PAGE_META.subtitle} />

      <div className="flex-1 feature-container-vertical text-style__body">
        <div className="text-style__subheading">Page Content Editor</div>

        <div className="flex justify-between bg-(--secondary-grey)/20 p-1 rounded-[10px]">
          {PAGES.map((page) => (
            <div
              key={page}
              onClick={() => state.setActiveSection(page)}
              className={`flex-1 ${state.activeSection === page ? "bg-white" : null} py-2 px-4 rounded-[10px] text-style__small-text text-center cursor-pointer`}
            >
              {page}
            </div>
          ))}
        </div>

        {state.activeSection === "Home Page" && <HomePage />}
        {state.activeSection === "About Page" && <AboutPage />}
        {state.activeSection === "Contact Page" && <ContactPage />}
      </div>

      {uploaderState.selectedAssetId && (
        <div
          className="asset-handling-interface"
          onClick={() => {
            uploaderState.setSelectedAssetId("");
            uploaderActions.handleResetAssetStates("cancel");
          }}
        >
          <FileMetaEditor />
        </div>
      )}
    </div>
  );
}
