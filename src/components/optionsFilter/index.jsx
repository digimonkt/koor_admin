import React from "react";
import { SolidButton } from "@components/button";
import { SearchInput, LabeledInput } from "@components/input";
import SelectWithSearch from "@components/input/selectWithsearch";

const OptionsFilter = ({
  searchProps,
  inputProps,
  optionsProps,
  selectProps,
  country,
  selectPropsCities,
  city,
  selectPropsCountry,
  SubCategory,
}) => {
  return (
    <>
      {country ? (
        <SelectWithSearch title="Select Country" {...selectPropsCountry} />
      ) : city ? (
        <div>
          <SelectWithSearch title="Select Country" {...selectPropsCountry} />
          <SelectWithSearch title="Select City" {...selectPropsCities} />
          <SearchInput
            placeholder="Search skills"
            widthInput="100%"
            {...searchProps}
          />
        </div>
      ) : SubCategory ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <SearchInput
            placeholder="Search skills"
            widthInput="100%"
            {...searchProps}
          />
          <SelectWithSearch title="Select  Category" {...selectPropsCountry} />
          <LabeledInput placeholder="skill Level" type="text" {...inputProps} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
          }}
        >
          <SearchInput
            placeholder="Search skills"
            widthInput="100%"
            {...searchProps}
          />
          <LabeledInput placeholder="skill Level" type="text" {...inputProps} />
        </div>
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
  );
};

export default OptionsFilter;
