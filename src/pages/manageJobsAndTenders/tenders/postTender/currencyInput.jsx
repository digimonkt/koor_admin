import { Divider, Stack } from "@mui/material";
import React from "react";
import { SelectInput } from "@components/input";
import { ErrorMessage } from "@components/caption";
import { PAY_PERIOD } from "@utils/enum";
// input onChange, name and onBlur must be present in optionsValues or else it will not work
function CurrencyInput({ title, optionsValues, errors, ...rest }) {
  return (
    <>
      <label className="mb-2">{title}</label>
      <Stack direction="row" spacing={0} alignItems="center" className="usd-bg">
        <SelectInput
          options={[
            {
              value: "usd",
              label: "USD",
            },
          ]}
          className="usd"
          {...((optionsValues && optionsValues.currency) || {})}
        />
        <input
          className="usdinput"
          placeholder="0"
          {...rest}
          {...((optionsValues && optionsValues.input) || {})}
          value={optionsValues ? optionsValues.input.value || "" : ""}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        {optionsValues.payPeriod ? (
          <SelectInput
            sx={{
              "& .MuiSelect-select": {
                paddingLeft: "0px",
              },
            }}
            options={Object.keys(PAY_PERIOD).map((period) => ({
              value: PAY_PERIOD[period],
              label: `per ${period}`,
            }))}
            style={{ width: "37%" }}
            {...((optionsValues && optionsValues.payPeriod) || {})}
          />
        ) : (
          ""
        )}
      </Stack>
      <ErrorMessage>{errors?.input}</ErrorMessage>
      <ErrorMessage>{errors?.title}</ErrorMessage>
      <ErrorMessage>{errors?.payPeriod}</ErrorMessage>
    </>
  );
}

export default CurrencyInput;
