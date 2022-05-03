import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    '& .MuiPagination-ul': {
      '& > li': {
        marginRight: '1.1rem',
        '& .Mui-selected': {
          background: '#2c7be5 !important',
          color: '#fff !important',
          borderColor: '#dee2e6 !important',
        },
      },
      '& button': {
        fontWeight: 'bold',
        paddingLeft: ' 1.2rem !important',
        paddingRight: ' 1.2rem !important',
        display: 'block',
        border: '1px solid #19D5C6',
        // marginBottom: '1rem',

        '&:hover': {
          background: '#2c7be5',
          color: '#fff !important',
          borderColor: '#dee2e6 !important',
        },
        '& .Mui-selected': {
          background: '#2c7be5',
        },
      },
    },
  },
}));
