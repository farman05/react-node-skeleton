import React, { Suspense,useEffect } from "react";
import routes  from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainRouter = () => {
    const PageLoader = () => {
        let loaderStyles = {
            position: "fixed",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
        };
        return (
            <div
                className="page-loader d-flex align-items-center  text-white justify-content-center"
                style={loaderStyles}
            >
                <i className="fa fa-sync-alt fa-2x fa-spin"></i>
                <h2 className="ml-3 fs-18 text-white">Loading...</h2>
            </div>
        );
    };



    return (
        <Suspense fallback={<PageLoader />}>
            <Router>
                <Switch>
                    {routes
                        ? routes.map((v, k) => {
                          
                                    return (
                                        <PrivateRoute
                                            key={k}
                                            exact = {v.exact}
                                            path={v.path}
                                            data={v}
                                            component={v.component}
                                        />
                                    )
                                })
                        : ""}
                </Switch>
            </Router>
        </Suspense>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {

        return (
            <Route
                exact
                {...rest}
                render={props =>
                        <Component {...props} />
                }
            />
        );
    
  
};

export default MainRouter;
