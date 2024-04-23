import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Typography, Avatar } from '@mui/material'

const AutoInput = ({vtubers, onChange}) => {

    const options = vtubers.map((vtuber) => ({
        name: vtuber.first_name,
        image: vtuber.image
    }));

    const handleSelect = (event, value) => {
      if(value) {
        onChange(value.name);
      }
      
    };

    return (
        <Autocomplete
        disablePortal
        options={options}
        onChange={handleSelect}
        autoHighlight={true}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Vtubers" />}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ display: 'flex', alignItems: 'center', gap: 2, width: "500px" }}
            {...props}
          >
            <Avatar
              alt={option.name}
              src={option.image} // Example placeholder image URL
            />
            <Typography variant="body1">{option.name}</Typography>
          </Box>
        )}
        getOptionLabel={(option) => option.name} // Define label to use for each option
      />
    );
};

export default AutoInput