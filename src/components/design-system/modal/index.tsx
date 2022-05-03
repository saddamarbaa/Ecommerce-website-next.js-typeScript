import * as React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #19D5C6',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  message: string;
  handlePending: boolean;
}

export function ModalComponent({
  open,
  handleClose,
  handleSubmit,
  message,
  handlePending,
}: ModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure wan delete this {message}?
          </Typography>
          <div className="mt-8 flex justify-between gap-5">
            <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="warning"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleSubmit}
              disabled={handlePending}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
