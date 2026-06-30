"use client";

import useAboutPage from "../../hooks/aboutPage/useAboutPage";

import FormWrapper, {
  InputArea,
  SeparatorLine,
} from "@global components/layout/FormWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { Buttonize } from "@global components/ui/Button";

export default function CompanyStructureEditor() {
  const { state, actions } = useAboutPage();

  if (!state.companyStructure) return;

  return state.companyStructure.map((level) => (
    <FormWrapper
      key={level.id}
      keyVal={level.id}
      subtitle={`Level ${level.id}`}
      subtitleChildren={
        <Buttonize
          clickFunc={() => actions.deleteHierarchyLevel(level.id)}
          className="hover:text-(--secondary-red) text-(--primary-red)/80"
        >
          <FontAwesomeIcon icon={["far", "trash-can"]} />
        </Buttonize>
      }
    >
      <InputArea
        label="Level Name"
        val={level.levelName}
        changeFunc={(val) => actions.updateStructure(level.id, val)}
      />

      <FormWrapper
        subtitle="Positions"
        subtitleChildren={
          <Button
            buttonType="light"
            buttonText="+ Add Position"
            clickAction={() => actions.addLevelPosition(level.id)}
          />
        }
      >
        {level.positions.map((position, index) => (
          <InputArea
            key={index}
            keyVal={index}
            val={position}
            label=""
            changeFunc={(val) =>
              actions.updateStructure(level.id, level.levelName, index, val)
            }
          >
            <Buttonize
              clickFunc={() => actions.deleteLevelPosition(level.id, index)}
              className="hover:text-(--secondary-red) text-(--primary-red)/80"
            >
              <FontAwesomeIcon icon={["far", "trash-can"]} />
            </Buttonize>
          </InputArea>
        ))}
      </FormWrapper>

      <SeparatorLine />
    </FormWrapper>
  ));
}
