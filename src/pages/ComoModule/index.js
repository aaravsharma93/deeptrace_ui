import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const Services = lazy(() => import('./Services'));

function ComoModule() {

    return (
        <Suspense fallback="...">
            <Switch>
                <Route path="/como/services" component={Services} />
            </Switch>
        </Suspense>
    )
}
export default ComoModule;