import * as React from 'react';

import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

import { deleteUser } from '../../redux/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #19D5C6',
  boxShadow: 24,
  p: 4
};

const ModalComponent = ({ deleteUser, id, handleClose, open, handleOpen }) => {
  const handleDelete = () => {
    if (id) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure wan delete this user?
            <div className="flex gap-5 mt-8 justify-between">
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
                Cancel
              </Button>
              <Button color="warning" variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  listState: PropTypes.object,
  id: PropTypes.any,
  deleteUser: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent);
