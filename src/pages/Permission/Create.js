import React, { Fragment, useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Switch, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, } from "@material-ui/core";

const Services = (props) => {
  // Example 1
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  // const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  // const setState = (state) => setTheState((prev) => ({ ...prev, ...state }));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = value => {
  //   setOpen(false);
  //   setSelectedValue(value);
  // };

  // Example 2

  // const [open1, setOpen1] = useState(false);

  // const handleClickOpen1 = () => {
  //   setOpen1(true);
  // };

  // const handleClose1 = () => {
  //   setOpen1(false);
  // };

  // Example 3

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };
  // Example 4

  // const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    // if (open3) {
    //   const { current: descriptionElement } = descriptionElementRef;
    //   if (descriptionElement !== null) {
    //     descriptionElement.focus();
    //   }
    // }
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange2 = (panel2) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel2 : false);
  };

  const handleChange3 = (panel3) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel3 : false);
  };
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={8} md={8} lg={8}>
          <p>You can assign permission for the selected user.</p></Grid>
        <Grid item xs={4} md={4} lg={4}>
          <div align="right"><h4 className="mr-2">Role: Manager</h4></div></Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange1("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <FormLabel component="legend" style={{ fontSize: '21px', color: '#263055' }} className="mt-2">
                Company Management
              </FormLabel>
              <FormControlLabel
                id="chk1"
                control={
                  <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                }
                // label="Manager Access"
                style={{ fontSize: '21px' }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-3">
                <FormControl component="fieldset" className="pr-4">
                  <FormLabel component="legend">
                    Access Permissions
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Write access"
                        />
                      }
                      label="Write access"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Read access"
                        />
                      }
                      label="Read access"
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={handleChange3("admin access")}
                            value="Read and Write access"
                          />
                        }
                        label="Read and Write access"
                      />
                    </FormGroup>
                  </FormGroup>
                </FormControl>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange3("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <FormLabel component="legend" style={{ fontSize: '21px', color: '#263055' }} className="mt-2">
                User Management
              </FormLabel>
              <FormControlLabel
                control={
                  <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-3">
                <FormControl component="fieldset" className="pr-4">
                  <FormLabel component="legend">
                    Access Permissions
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Write access"
                        />
                      }
                      label="Write access"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Read access"
                        />
                      }
                      label="Read access"
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={handleChange3("admin access")}
                            value="Read and Write access"
                          />
                        }
                        label="Read and Write access"
                      />
                    </FormGroup>
                  </FormGroup>
                </FormControl>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange2("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <FormLabel component="legend" style={{ fontSize: '21px', color: '#263055' }} className="mt-2">
                Admin Management
              </FormLabel>
              <FormControlLabel
                control={
                  <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-3">
                <FormControl component="fieldset" className="pr-4">
                  <FormLabel component="legend">
                    Access Permissions
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Write access"
                        />
                      }
                      label="Write access"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={handleChange3("admin access")}
                          value="Read access"
                        />
                      }
                      label="Read access"
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            onChange={handleChange3("admin access")}
                            value="Read and Write access"
                          />
                        }
                        label="Read and Write access"
                      />
                    </FormGroup>
                  </FormGroup>
                </FormControl>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Services);
