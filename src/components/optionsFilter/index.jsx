import { SolidButton } from "@components/button";
import { SearchInput, LabeledInput } from "@components/input";
import { Stack } from "@mui/material";
import SelectDropDown from "@components/financialtools/SelectDropDown";

const OptionsFilter = ({
  searchProps,
  inputProps,
  optionsProps,
  tender,
  csvProps,
  inputPropsRole,
  faq,
  news,
}) => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      {news && tender ? (
        <>
          <SearchInput
            placeholder="Search skills"
            widthInput="100%"
            {...searchProps}
          />
          <SolidButton
            className="csvButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...csvProps}
          />
        </>
      ) : tender ? (
        <SearchInput
          placeholder="Search skills"
          widthInput="100%"
          {...searchProps}
        />
      ) : (
        <>
          <SearchInput
            placeholder="Search skills"
            widthInput="100%"
            {...searchProps}
          />
          <LabeledInput
            placeholder="skill Level"
            type="text"
            {...inputProps}
            inputstyles="styles_input"
          />
          {faq ? (
            <SelectDropDown
              content={inputPropsRole.content.faqCategoryTable}
              setContentId={inputPropsRole.setContentId.setAddFAQRole}
              faq={faq}
            />
          ) : (
            ""
          )}

          <SolidButton
            sx={{
              background: "#fff",
              borderRadius: "73px",
              border: "solid 1px ",
              fontFamily: "Bahnschrift",
              fontSize: "16px",
              color: "#274593",
              padding: "10px 30px",
              fontWeight: 600,
              "&:hover": {
                background: "#f7f7f7",
                borderColor: "#f7f7f7",
              },
            }}
            {...optionsProps}
          />
        </>
      )}
    </Stack>
  );
};

export default OptionsFilter;
