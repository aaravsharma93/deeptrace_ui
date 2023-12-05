import React, { Fragment, useState } from 'react';
import { PageTitle } from "../../layout-components";
import { connect } from "react-redux";

const Services = (props) => {
  return (
    <Fragment>
         <PageTitle
                titleHeading="File Management"
                titleDescription=""
                backLink="/file"
            />
      <div>
        <p>Hello List</p>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Services);
