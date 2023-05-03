import { Autocomplete, Box, TextField } from "@mui/material";
function SelectWithSearch({ options, title, ...rest }) {
  return (
    <Autocomplete
      options={options}
      key={options.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return <TextField {...params} label={title} variant="standard" />;
      }}
      renderOption={(props, option) => {
        return (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label}
          </Box>
        );
      }}
      style={{ width: 300 }}
      {...rest}
    />
  );
}

export default SelectWithSearch;
