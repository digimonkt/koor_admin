import { SolidButton } from "@components/button";
import { SearchInput, LabeledInput, SelectInput } from "@components/input";
import { Box, Stack } from "@mui/material";
import SelectDropDown from "@components/financialtools/SelectDropDown";

const OptionsFilter = ({
  searchProps,
  inputProps,
  optionsProps,
  tender,
  csvProps,
  inputPropsRole,
  tenderPost,
  faq,
  news,
  selectPropsCountry,
  country,
  tenderProps,
}) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      flexWrap={"wrap"}
      useFlexGap
    >
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
        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", gap: 2 }}
          alignItems={"center"}
          spacing={1}
        >
          <SearchInput
            placeholder="Search tender"
            widthInput="100%"
            {...searchProps}
          />
          <Box className="job_location_box">
            <SelectInput
              placeholder="Location"
              search
              value=""
              {...selectPropsCountry}
              className="loca_job"
            />
          </Box>
          <SolidButton
            className="csvButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...csvProps}
          />
          <SolidButton
            title={(tenderProps || {}).title}
            className="resetButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...tenderProps}
          />
          <SolidButton
            title={(tenderPost || {}).title}
            className="resetButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...tenderPost}
          />
        </Stack>
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
              value={inputPropsRole.value.addFAQRole}
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
