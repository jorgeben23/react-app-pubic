import { themePalette } from "./../../config/Theme.config";

export const reactSelectStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "100%",
    minWidth: '200px'
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: themePalette.BG_COLOR_GRAY,
    cursor: "pointer",
    "&:hover": {
      borderColor: themePalette.BG_COLOR_GRAY,
    },
    boxShadow: state.isFocused
      ? `0 0 0 1px ${themePalette.BG_COLOR_WEAK_GRAY}`
      : "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? themePalette.BG_COLOR_WEAK_ORANGE
      : state.isFocused
        ? themePalette.BG_COLOR_WEAK_ORANGE
        : themePalette.BG_COLOR_WHITE,
    color:
      state.isSelected || state.isFocused
        ? themePalette.BG_COLOR_WHITE
        : themePalette.BG_COLOR_GRAY,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: themePalette.BG_COLOR_WEAK_ORANGE,
      color: themePalette.BG_COLOR_WHITE,
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: themePalette.BG_COLOR_GRAY,
  }),
  // menu: (provided: any) => ({
  //   ...provided,
  //   maxHeight: '200px', 
  //   overflowY: 'auto', 
  // }),
};
