import React, { Component } from "react";
import {isAndroid} from 'react-device-detect'
import {isIOS} from 'react-device-detect'

export class Download extends Component {
    render() {
        if(isIOS)
           return window.location.assign('https://install.appcenter.ms/orgs/itunes-uwoq-03/apps/mvpreactios/distribution_groups/beta%20testers');
        if(isAndroid)
           return window.location.assign('install.appcenter.ms/orgs/itunes-uwoq-03/apps/mvpreactandroid/distribution_groups/beta%20testers');
        else
            return <h1>Please use a mobile device </h1>
    }
};