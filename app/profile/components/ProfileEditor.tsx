import { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditorField from "./EditorField";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileEditor({
  name,
  email,
  role,
  initials,
  profileImage,
  phone,
  department,
  jobTitle,
  bio,
  setProfileImage,
  closeEditor,
}: {
  name: string;
  email: string;
  role: string;
  initials: string;
  profileImage: string;
  phone: string;
  department: string;
  jobTitle: string;
  bio: string;
  setProfileImage: (image: string) => void;
  closeEditor: () => void;
}) {
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/20 pl-65 pt-15">
      <div
        className="h-full flex-1"
        onClick={closeEditor}
        aria-hidden="true"
      ></div>

      <aside className="h-full w-full max-w-115 overflow-y-auto border-l border-(--terciary-grey) bg-white p-5 shadow-[-18px_0_50px_-35px_rgba(10,31,68,0.7)]">
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Edit Profile
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Update the operator details shown across the command center.
            </div>
          </div>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[10px] border border-(--terciary-grey) text-(--primary-grey) duration-200 hover:bg-(--background) hover:text-(--primary-blue)"
            onClick={closeEditor}
            aria-label="Close profile editor"
          >
            <FontAwesomeIcon icon={["fas", "xmark"]} />
          </button>
        </div>

        <form className="vertical-layout__outer">
          <div className="feature-container-vertical bg-(--background)">
            <div className="flex items-center gap-4">
              <ProfileAvatar
                initials={initials}
                image={profileImage}
                size="compact"
              />

              <div className="flex-1">
                <div className="text-style__big-text text-(--primary-blue)">
                  Profile Image
                </div>
                <div className="mb-3 text-style__body text-(--primary-grey)">
                  Choose a square image so it crops cleanly in the nav and
                  profile card.
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <label className="flex w-fit cursor-pointer items-center gap-2 rounded-[10px] bg-(--primary-blue) px-4 py-2.5 text-style__small-text text-white duration-200 hover:bg-(--secondary-blue)">
                    <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </label>

                  {profileImage && (
                    <button
                      type="button"
                      className="rounded-[10px] border border-(--primary-red)/40 bg-white px-4 py-2.5 text-style__small-text text-(--primary-red) duration-200 hover:bg-(--primary-red)/5"
                      onClick={() => setProfileImage("")}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="vertical-layout__inner">
            <EditorField label="Display name" defaultValue={name} />
            <EditorField label="Email address" defaultValue={email} />
            <EditorField label="Phone number" defaultValue={phone} />
            <EditorField label="Department" defaultValue={department} />
            <EditorField label="Job title" defaultValue={jobTitle} />
          </div>

          <div className="feature-container-vertical bg-(--background)">
            <div>
              <div className="text-style__big-text text-(--primary-blue)">
                Role Assignment
              </div>
              <div className="text-style__body text-(--primary-grey)">
                Your role is visible here, but role changes must be approved by
                senior departments.
              </div>
            </div>

            <div className="rounded-[10px] border border-(--primary-yellow)/60 bg-(--primary-yellow)/15 p-3">
              <div className="text-style__small-text text-(--primary-grey)">
                Current role
              </div>
              <div className="text-style__body--bold text-(--primary-blue)">
                {role}
              </div>
            </div>
          </div>

          <div className="feature-container-vertical bg-(--background)">
            <div>
              <div className="text-style__big-text text-(--primary-blue)">
                Operator Bio
              </div>
              <div className="text-style__body text-(--primary-grey)">
                Short internal note for handovers and account reviews.
              </div>
            </div>
            <textarea
              className="input-style min-h-28 resize-none text-style__body"
              defaultValue={bio}
            />
          </div>

          <div className="sticky bottom-0 -mx-5 mt-2 flex justify-end gap-2.5 border-t border-(--terciary-grey) bg-white p-5">
            <button
              type="button"
              className="rounded-[10px] border border-(--secondary-blue) bg-white px-4 py-2.5 text-style__small-text text-(--primary-blue) duration-200 hover:bg-(--background)"
              onClick={closeEditor}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-[10px] bg-(--primary-blue) px-4 py-2.5 text-style__small-text text-white duration-200 hover:bg-(--secondary-blue)"
              onClick={closeEditor}
            >
              Save changes
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
