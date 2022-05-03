/* eslint-disable react/require-default-props */
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

import useStyles from './styles';

type PaginationPropsType = {
  page?: number;
  handleChange: (event: any, value: number) => void;
  totalPages?: number;
};
export function PaginationComponent({ page, handleChange, totalPages }: PaginationPropsType) {
  const classes = useStyles();

  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        count={totalPages || 10}
        page={page}
        onChange={handleChange}
        className={classes.root}
        renderItem={(item) => <PaginationItem {...item} variant="outlined" shape="rounded" />}
      />
    </Stack>
  );
}

export default PaginationComponent;
