import { StylesConfig, ThemeConfig } from 'react-select';

export const selectTheme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
        ...theme.colors,
        primary25: '#F6F7F9',
        primary: '#3563E9',
        neutral0: "#F6F7F9",
        primary50: "#F6F7F9"
    },
}); 

export const selectStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#F6F7F9",
        border: "none",
        padding: "6px",
        fontSize: "14px"
    })
};


export const darkSelectTheme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
        ...theme.colors,
        primary25: '#2f2f2f',
        primary: '#3563E9',
        neutral0: "#2f2f2f",
        primary50: "#2f2f2f",
    },
});

export const darkSelectStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#2f2f2f",
        border: "none",
        padding: "6px",
        fontSize: "14px",
        color: "#FFF"
    }),
    input: (styles) => ({
        ...styles,
        color: "#FFF"
    }),
    placeholder: (styles) => ({
        ...styles,
        color: "#999"
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "#FFF"
    }),
    option: (styles, state) => ({
        ...styles,
        color: "#FFF"
    })
};