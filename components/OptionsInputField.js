import React from "react";
import { useField } from "formik";
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   Select,
// } from "@chakra-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// type OptionsInsputFieldProps = {
//   label?: string;
//   name: string;
//   placeholder: string;
//   options: string[];
// };

export const OptionsInputField = ({ placeholder, options, ...props }) => {
  const [field, { error }] = useField(props);
  let formLabel = props.label ? (
    <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
  ) : (
    ""
  );
  return (
    <FormControl isInvalid={!!error}>
      {formLabel}
      <Select {...field} {...props}>
        {/* <option value="" disabled defaultValue="">
          {placeholder}
        </option> */}
        <option aria-label="None" value="" />
        {options.map((op) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
