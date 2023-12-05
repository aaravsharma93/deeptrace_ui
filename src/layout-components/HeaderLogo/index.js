//eslint-disable-next-line
import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import { connect } from 'react-redux';

const HeaderLogo = props => {
  // const { sidebarToggle, sidebarHover } = props;
  const { sidebarToggle } = props;
  return (
    <Fragment>
      <div 
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          // 'app-header-logo-open': sidebarHover
        })}>
        <Box
          className="header-logo-wrapper"
          title="WINT">
          <Link to="/DashboardDefault" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              className="header-logo-wrapper-btn">
              <img
                className="app-header-logo-img w-100"
                alt="WINT"
                src={require('../../assets/images/logo/deeptracelogo.png')}
              />
            
              {/* <Avatar {...stringAvatar(logoName)} /> */}
            </IconButton>
          </Link>
          {/* <Box className="header-logo-text"></Box> */}
        </Box>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover
});

export default connect(mapStateToProps)(HeaderLogo);
