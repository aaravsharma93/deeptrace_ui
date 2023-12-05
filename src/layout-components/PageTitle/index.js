import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Paper, Box, Typography ,Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && <Box p={4}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function PageTitle(props) {
    const {
        pageTitleStyle,
        pageTitleBackground,
        pageTitleShadow,
        pageTitleDescription,
    } = props;

    return (
        <Fragment>
            <Paper square elevation={pageTitleShadow ? 6 : 2}
                className={clsx('app-page-title', pageTitleStyle, pageTitleBackground)}>
                <div
                    style={{
                        display: "table",
                    }}
                    className="w-100 pt-2"
                >
                    <div className="app-page-title--heading">
                    <Grid container spacing={6}>
                        <Grid item xs={12} lg={7}>
                        <h1>{props.titleHeading}</h1>
                        {pageTitleDescription && (
                            <div className="app-page-title--description">
                                {props.titleDescription}
                            </div>
                        )}</Grid>
                          <Grid item xs={12} lg={5}>
                          <Breadcrumbs aria-label="breadcrumb" className="float-right"
                    >
                        <Link
                            color="inherit"
                            to="/"
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        >
                            Home
                        </Link>
                        <Typography color="textPrimary">
                            {props.titleHeading}
                        </Typography>
                    </Breadcrumbs></Grid></Grid>
                    </div>
                  
                </div>
            </Paper>
        </Fragment>
        //   <Fragment>
        //       <Paper square elevation={pageTitleShadow ? 6 : 2}
        //             className={clsx('app-page-title', pageTitleStyle, pageTitleBackground)}>
        //             <div>
        //                 {pageTitleBreadcrumb && (
        //                     <Breadcrumbs
        //                         separator={<NavigateNextIcon fontSize="small" />}
        //                         className="mb-4"
        //                         maxItems={2}
        //                         aria-label="breadcrumb">
        //                         <Link color="inherit" to="#" onClick={e => e.preventDefault()}>
        //                             Home
        //                         </Link>
        //                         <Typography color="textPrimary">{props.titleHeading}</Typography>
        //                     </Breadcrumbs>
        //                 )}

        //                 <Box className="app-page-title--first">
        //                     {pageTitleIconBox && (
        //                         <Paper
        //                             elevation={2}
        //                             className="app-page-title--iconbox d-70 d-flex align-items-center bg-secondary justify-content-center">
        //                             <DashboardTwoToneIcon />
        //                         </Paper>
        //                     )}
        //                     <div className="app-page-title--heading">
        //                         <h1>{props.titleHeading}</h1>
        //                         {pageTitleDescription && (
        //                             <div className="app-page-title--description">
        //                             {props.titleDescription}
        //                             </div>
        //                         )}
        //                     </div>
        //                 </Box>
        //             </div>
        //             <div className="speedial-wrapper">
        //                 {createLink && <Fab color="primary" aria-label="add" className="m-2" component={Link} to={createLink}>
        //                     <AddIcon />
        //                 </Fab>}
        //                 {backLink && <Fab color="primary" aria-label="add" className="m-2" component={Link} to={backLink}>
        //                     <ArrowBackIcon />
        //                 </Fab>}
        //             </div>
        //       </Paper>
        //   </Fragment>
    );
}
const mapStateToProps = state => ({
    pageTitleStyle: state.ThemeOptions.pageTitleStyle,
    pageTitleBackground: state.ThemeOptions.pageTitleBackground,
    pageTitleShadow: state.ThemeOptions.pageTitleShadow,
    pageTitleBreadcrumb: state.ThemeOptions.pageTitleBreadcrumb,
    pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
    pageTitleDescription: state.ThemeOptions.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);