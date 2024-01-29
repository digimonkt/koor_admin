import { Autocomplete, Box, TextField } from "@mui/material";
function SelectWithSearch({ options, title, multiple, ...rest }) {
  return (
    <Autocomplete
      multiple={Boolean(multiple)}
      sx={{
        borderRadius: "73px",
        background: "#fff",
        "& hover": { borderColor: "#cacaca" },
        "& fieldset": {
          border: "1px solid #cacaca",
          borderRadius: "93px",
          "&:hover": { borderColor: "#cacaca" },
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#cacaca",
        },
        "& .MuiFormLabel-root": {
          fontSize: "16px",
          color: "#848484",
          fontFamily: "Poppins !important",
        },
      }}
      options={options || []}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, selectedValue) =>
        option.value === selectedValue.value
      }
      renderInput={(params) => {
        return <TextField {...params} placeholder={title} />;
      }}
      renderOption={(props, option) => {
        return (
          <Box
            component="li"
            sx={{
              "& > img": { mr: 2, flexShrink: 0 },
            }}
            {...props}
            key={options.value}
          >
            {option.label}
          </Box>
        );
      }}
      style={{ width: "100%" }}
      {...rest}
    />
  );
}

export default SelectWithSearch;
