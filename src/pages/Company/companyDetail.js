import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

function SimpleDialog(props) {
  // const { onClose, selectedValue } = props;

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function CompanyDetails(props) {
  let Data = props.selectedCompanyData
  const [open, setOpen] = React.useState(true);
  useState(() => {
    // const handleClickOpen = (scrollType) => () => {
      
    //   setOpen(true);
    //   setScroll(scrollType);
    // };
  });
  const handleClose = () => {
    // let value = props.openModal
    setOpen(false);
  };

  const [scroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Company Details</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="table-responsive">
            <table className="table table-hover text-nowrap mb-0">
              <tbody>
                <tr>
                  <th className="bg-white text-left">Company ID</th>
                  <td>{Data.company_id}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Company Name</th>
                  <td>{Data.title}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Email</th>
                  <td>{Data.email_tech}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">email_ops</th>
                  <td>{Data.email_ops}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Contact No.</th>
                  <td>{Data.phone_number}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Address Street</th>
                  <td> {Data.street}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Street No.</th>
                  <td>{Data.street_number}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Country</th>
                  <td>{Data.country}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">City</th>
                  <td>{Data.city}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Zipcode</th>
                  <td>{Data.zipcode}</td>
                </tr>
                <tr>
                  <th className="bg-white text-left">Status</th>
                  <td>{Data.status === 0 ? 'Deactive' : 'Active'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
