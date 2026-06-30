"use client";

import DraftifyReact from "draftify-react";
import "draftify-react/styles.css";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { Buttonize } from "@global components/ui/Button";

import useAboutPage from "../../hooks/aboutPage/useAboutPage";

import {
  isObjectOrDraftifyArr,
  isStringArray,
  isStringMatrix,
} from "../../../../globals/helper functions/typeCheckers";

export default function OverviewSubsectionEditor() {
  const { state, actions } = useAboutPage();

  if (!state.aboutUs) return;

  return state.aboutUs.map(({ title, description }, index) => {
    // 🔹 STRING or DraftifyBlock[]
    if (isObjectOrDraftifyArr(description)) {
      if (typeof description === "string") {
        return (
          <FormWrapper
            key={index}
            keyVal={index}
            subtitle={title}
            separatorLine={false}
          >
            <InputArea
              key={index}
              keyVal={index}
              val={description}
              changeFunc={(val) => actions.updateDescription(val, index)}
            />
          </FormWrapper>
        );
      }

      return (
        <FormWrapper
          key={index}
          keyVal={index}
          subtitle={title}
          separatorLine={false}
        >
          <DraftifyReact
            draftifyDoc={state.aboutOverviewDoc}
            setDoc={(setter) => {
              const resolved =
                typeof setter === "function"
                  ? setter(state.aboutOverviewDoc)
                  : setter;

              actions.updateDescription(resolved.blocks, index);
            }}
            options={["paragraph"]}
          />
        </FormWrapper>
      );
    }

    // 🔹 string[]
    if (isStringArray(description)) {
      return (
        <FormWrapper
          key={index}
          keyVal={index}
          subtitle={title}
          subtitleChildren={
            <Button
              buttonType="light"
              buttonText="+ Add Item"
              clickAction={() => actions.handleDescriptionArray("add", index)}
            />
          }
        >
          {description.map((reason, i) => (
            <div key={i} className="flex gap-2.5 p-2.5 items-center">
              <InputArea
                label=""
                val={reason}
                changeFunc={(val) => actions.updateDescription(val, index, [i])}
              >
                <Buttonize
                  clickFunc={() =>
                    actions.handleDescriptionArray("delete", index, i)
                  }
                  className="hover:text-(--secondary-red) text-(--primary-red)/80"
                >
                  <FontAwesomeIcon icon={["far", "trash-can"]} />
                </Buttonize>
              </InputArea>
            </div>
          ))}
          <SeparatorLine />
        </FormWrapper>
      );
    }

    // 🔹 string[][]
    if (isStringMatrix(description)) {
      return (
        <FormWrapper
          key={index}
          keyVal={index}
          subtitle={title}
          subtitleChildren={
            <Button
              buttonType="light"
              buttonText="+ Add Item"
              clickAction={() => actions.handleDescriptionArray("add", index)}
            />
          }
        >
          {description.map((reason, i) => (
            <div key={i} className="flex gap-2.5 p-2.5 items-center">
              <InputArea
                label=""
                val={reason[0]}
                changeFunc={(val) =>
                  actions.updateDescription(val, index, [i, 0])
                }
              >
                <InputArea
                  label=""
                  val={reason[1]}
                  changeFunc={(val) =>
                    actions.updateDescription(val, index, [i, 1])
                  }
                />
                <Buttonize
                  clickFunc={() =>
                    actions.handleDescriptionArray("delete", index, i)
                  }
                  className="hover:text-(--secondary-red) text-(--primary-red)/80"
                >
                  <FontAwesomeIcon icon={["far", "trash-can"]} />
                </Buttonize>
              </InputArea>
            </div>
          ))}
          <SeparatorLine />
        </FormWrapper>
      );
    }

    return null;
  });
}
