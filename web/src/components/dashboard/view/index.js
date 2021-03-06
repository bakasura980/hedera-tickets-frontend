import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import UserDetails from './../components/user-details';

import AllEventsComponent from './../components/event/all-events';
import MyTicketsView from './../components/event/my-tickets';
import EventDetailsComponent from './../components/event/event-details';

export const DashboardView = function (context) {
    return (
        <div>
            <div className="dashboard">
                <UserDetails />
                <div className="dashboard-body">
                    <div className="nav-container">
                        <div className="nav">
                            <NavLink className="nav-item" exact to="/">All Events</NavLink>
                            <NavLink className="nav-item" exact to="/event">Event Details</NavLink>
                            <NavLink className="nav-item" exact to="/tickets/my">My Tickets</NavLink>
                            <span className="nav-indicator"></span>
                        </div>
                    </div>

                    <div className="nav-elements">
                        <Switch>
                            <Route exact path="/" component={AllEventsComponent} />
                            <Route exact path="/event" component={EventDetailsComponent} />
                            <Route exact path="/tickets/my" component={MyTicketsView} />
                        </Switch>
                    </div>

                </div>

            </div >
        </div >

    );
}
