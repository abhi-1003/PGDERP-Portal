import { Button, TextField, Typography } from "@material-ui/core";

export const renderText = ({label, color, align, variant, component}) => (
    <Typography
        color={color ? color: "primary"}
        align={align ? align: "center"}
        variant={variant ? variant : "h6"}>
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

export const renderButton = ({label, variant, color, handleOnClick}) => (<Button
variant={variant ? variant : "outlined"}
color={color ? color: "primary"}
size = 'small'
onClick={handleOnClick}>
{label}
</Button>
);