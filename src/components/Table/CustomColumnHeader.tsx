import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { themePalette } from './../../config/Theme.config';
import { useEffect } from 'react';

export interface CustomColumnHeaderProps extends GridColumnHeaderParams {
  headerName: string | undefined;
  onFilterChange?: (value: string) => void;
  onSortClick?: () => void;
  isSortable?: boolean;
  isOnlySorteable?: boolean;
  resetTrigger?:number;
}

const CustomColumnHeader: React.FC<CustomColumnHeaderProps> = (props) => {
  const { headerName, onFilterChange, onSortClick, isSortable, isOnlySorteable, resetTrigger } = props;
  const [filterValue, setFilterValue] = React.useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    onFilterChange?.(newValue);
  };

  const handleClearFilter = () => {
    setFilterValue('');
    onFilterChange?.('');
  };


  useEffect(() => {
    if (resetTrigger) {
      setFilterValue(''); // Limpia el input al activarse el trigger
    }
  }, [resetTrigger]);


  return (
    <Box
      sx={{
        color: 'black',
        borderRadius: '4px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center !important' }}>
        <Box sx={{ fontWeight: 'bold', textAlign: 'center !important', justifyContent: 'center' }}>{headerName}</Box>
        {isSortable && (
          <></>
        )}
      </Box>
      {!isOnlySorteable && (
        <Box>
          <TextField
            variant="outlined"
            size="small"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Buscar..."
            InputProps={{
              endAdornment: filterValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearFilter} edge="end" size="small">
                    <CloseIcon sx={{ color: themePalette.BG_COLOR_STRONG_ORANGE }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              display: 'flex',
              textAlign: 'center !important',
              width: '100%',
              maxWidth: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: themePalette.BG_COLOR_WEAK_ORANGE,
                },
                '&:hover fieldset': {
                  borderColor: themePalette.BG_COLOR_WEAK_ORANGE,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themePalette.BG_COLOR_WEAK_ORANGE,
                },
              },
              '& .MuiInputBase-input': {
                padding: '4px 8px',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomColumnHeader;
