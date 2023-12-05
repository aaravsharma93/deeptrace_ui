import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@material-ui/styles';
import { ClimbingBoxLoader } from 'react-spinners';
import MuiTheme from '../theme';
import { LeftSidebar, MinimalLayout } from '../layout-blueprints';
import AuthRoutes from './auth-routes';
import Authenticated from './authentication';
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/Login'));
const Role = lazy(() => import('../pages/Role'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ComoModule = lazy(() => import('../pages/ComoModule'));
const Company = lazy(() => import('../pages/Company'));
const User = lazy(() => import('../pages/User'));
const Permission = lazy(()=> import('../pages/Permission'))
const Signup = lazy(() => import('../pages/Signup/signup'));
const ForgotPassword = lazy(() => import('../pages/ResetPassword/forgotPassword'));
const ChangePassword = lazy(()=> import('../pages/ChangePassword'))
const Profile = lazy(()=> import('../pages/Profile'))
const File = lazy(()=> import('../pages/File'))
const Routes = () => {
    const location = useLocation();

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.99
        },
        in: {
            opacity: 1,
            scale: 1
        },
        out: {
            opacity: 0,
            scale: 1.01
        }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4
    };

    const SuspenseLoading = () => {
      return (
          <Fragment>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                  <div className="d-flex align-items-center flex-column px-4">
                      <ClimbingBoxLoader color={'#5383ff'} loading={true} />
                  </div>
                  <div className="text-muted font-size-xl text-center pt-3">
                      Please wait while we load the live preview examples
                      <span className="font-size-lg d-block text-dark">
                          This live preview instance can be slower than a real production
                          build!
                      </span>
                  </div>
              </div>
            </Fragment>
          );
    };
    return (
        <ThemeProvider theme={MuiTheme}>
            <AnimatePresence>
                <Suspense fallback={<SuspenseLoading />}>
                    <Switch>
                        <Route path={AuthRoutes}>
                            <Authenticated>
                                <LeftSidebar>
                                    <Switch location={location} key={location.pathname}>
                                        <motion.div initial="initial" animate="in" exit="out"
                                            variants={pageVariants} transition={pageTransition} >
                                            <Route path="/dashboard" component={Dashboard} />
                                            <Route path="/como" component={ComoModule} />
                                            <Route path="/role" component={Role} />
                                            <Route path="/company" component={Company} />
                                            <Route path="/user" component={User}/>
                                            <Route path="/permission" component={Permission}/>
                                            <Route path="/change-password" component={ChangePassword}/>
                                            <Route path="/profile" component={Profile}/>
                                            <Route path="/file" component={File}/>
                                        </motion.div>
                                    </Switch>
                                </LeftSidebar>
                            </Authenticated>
                        </Route>
                        <Route path={`/signup`} component={Signup} />
                        <Route path="/reset-password" component={ForgotPassword}/>
                        <Route path={['/login', '/']}>
                            <MinimalLayout>
                                <motion.div initial="initial" animate="in" exit="out"
                                    variants={pageVariants} transition={pageTransition}>
                                        <Switch location={location} >
                                            <Route path="/login" component={Login} />
                                            <Route path="/" component={Home} />
                                        </Switch>        
                                </motion.div>
                            </MinimalLayout>
                        </Route>
                    </Switch>
                </Suspense>
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default Routes;