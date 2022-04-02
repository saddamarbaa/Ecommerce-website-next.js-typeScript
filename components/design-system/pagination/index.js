import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import PropTypes from 'prop-types'

import useStyles from './styles'

export function PaginationComponent({ page, handleChange, totalPages }) {
  const classes = useStyles()

  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        count={totalPages || 10}
        page={page}
        onChange={handleChange}
        className={classes.root}
        renderItem={(item) => (
          <PaginationItem {...item} classes={{ selected: classes.selected }} variant="outlined" shape="rounded" />
        )}
      />
    </Stack>
  )
}

PaginationComponent.propTypes = {
  page: PropTypes.number,
  handleChange: PropTypes.func,
  totalPages: PropTypes.number || PropTypes.any,
}

export default PaginationComponent
