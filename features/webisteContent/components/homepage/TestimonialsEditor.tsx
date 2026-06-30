"use client";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { Buttonize } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

import useHomepage from "../../hooks/homepage/useHomepage";
import LinkedAssetField from "../LinkedAssetField";

export default function TestimonialsEditor() {
  const { state, actions } = useHomepage();

  if (!state.testimonials) return;

  return (
    <FormWrapper
      subtitle={`Testimonial Section `}
      subtitleChildren={
        <Button
          buttonText="+ Add Testimonial "
          clickAction={actions.handleAddTestimonial}
          disabled={state.addingTestimonials}
        >
          {state.addingTestimonials && <Loader />}
        </Button>
      }
    >
      <div className="text-(--secondary-blue) text-style__small-text">
        {state.hasTestimonialsChanged &&
          "changes have been made, save before exiting"}

        {state.addTestimonialsError &&
          "an error occured while adding a testimonial"}
      </div>

      <div
        className={`${state.hasTestimonialsChanged ? "border-2 border-(--secondary-blue)" : "border border-(--terciary-grey)"}  rounded-[10px] p-2.5 h-150 overflow-y-auto section-scrollbar`}
      >
        {state.testimonials.map((testimonial, index) => (
          <div key={index} className="vertical-layout__inner container-layout">
            <div className="text-style__big-text flex">
              <div className="flex-1"> Testimonial {index + 1}</div>

              <Buttonize
                clickFunc={() =>
                  actions.handleDeleteTestimonial(testimonial._id)
                }
                className="hover:text-(--secondary-red) text-(--primary-red)/80"
              >
                <FontAwesomeIcon icon={["far", "trash-can"]} />
              </Buttonize>
            </div>

            <div className="flex gap-5">
              <div className="flex-1">
                <LinkedAssetField
                  label="Profile Image"
                value={testimonial.profilePic}
                uploadPath={`homepage/testimonials/${testimonial._id}`}
                onChange={(asset) => {
                  actions.updateTestimonial(
                    "profilePic",
                    asset,
                      testimonial._id,
                    );
                  }}
                />
              </div>

              <InputArea
                label="Name"
                val={testimonial.name}
                changeFunc={(val) =>
                  actions.updateTestimonial("name", val, testimonial._id)
                }
              />
            </div>

            <div className="flex gap-5">
              <InputArea
                label="Position"
                val={testimonial.position}
                changeFunc={(val) =>
                  actions.updateTestimonial("position", val, testimonial._id)
                }
              />
              <InputArea
                label="Industry / Project"
                val={testimonial.industry}
                changeFunc={(val) =>
                  actions.updateTestimonial("industry", val, testimonial._id)
                }
              />
            </div>

            <InputArea
              label="Testimonial Text"
              val={testimonial.testimonial}
              changeFunc={(val) =>
                actions.updateTestimonial("testimonial", val, testimonial._id)
              }
            />

            {index !== state.testimonials.length - 1 && <SeparatorLine />}
          </div>
        ))}
      </div>
    </FormWrapper>
  );
}
