import { Button, TextField, Typography } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
export const renderText = ({label, color, align, variant, component}) => (
    <Typography
        color={color ? color: "primary"}
        align={align ? align: "center"}
        variant={variant ? variant : "h6"}>
            {label}
    </Typography>
);
export const renderText1 = ({label, color, align, variant, component}) => (
    <Typography
        color={color ? color: "black"}
        align={align ? align: "center"}
        variant={variant ? variant : "h8"}>
            {label}
    </Typography>
);

export const  renderInputText= ({label, name,color, state, handleOnChange}) => {
    const { data, errors } = state;
    return(
        <TextField 
        label={label}
        color={color ? color:"primary"} 
        variant="outlined" 
        name={name} 
        fullWidth={true} 
        size="small" 
        value={data[name]} 
        error={errors[name]? true: false}
        helperText={errors[name]}
        onChange={handleOnChange} />
    )
};
export const  renderInputSelect= ({label, name,color, state, handleOnChange, arr}) => {
    const { data, errors } = state;
    return(
        <TextField 
        label={label}
        select
        color={color ? color:"primary"} 
        variant="outlined" 
        name={name} 
        fullWidth={true} 
        size="small" 
        value={data[name]} 
        error={errors[name]? true: false}
        helperText={errors[name]}
        onChange={handleOnChange}>
            {arr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    )
};
export const  renderMultiInputText= ({label, name,color, state, handleOnChange}) => {
    const { data, errors } = state;
    return(
        <TextField 
        label={label}
        multiline
        color={color ? color:"primary"} 
        variant="outlined" 
        name={name} 
        fullWidth={true} 
        size="small" 
        value={data[name]} 
        error={errors[name]? true: false}
        helperText={errors[name]}
        onChange={handleOnChange} />
    )
};   

export const renderButton = ({label, variant, color, handleOnClick}) => (<Button
variant={variant ? variant : "outlined"}
color={color ? color: "primary"}
size = 'small'
onClick={handleOnClick}>
{label}
</Button>
);