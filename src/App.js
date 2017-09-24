/* @flow */

import React, { Component } from 'react'
import { Router, Route, Redirect, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import * as colors from 'material-ui/colors'

import 'assets/index.css'
import 'assets/font-awesome-4.7.0/css/font-awesome.min.css'
import 'animate.css/animate.min.css'

import tinyColor from 'tinycolor2'
import AppShell from './scenes/app-shell/AppShell'

import CourseComposer from './scenes/teacher/course-composer'
import CourseManager from './scenes/teacher/course-manager'
import Courses from './scenes/student/courses'
import Course from './scenes/student/course'

import store from './core/store'
import history from './core/history'
import StudentDashboard from './scenes/student/dashboard/components/StudentDashboard'

const primaryColor = '#5B86E5'
const styledTheme = {
  primary: primaryColor,
  textColor: 'rgba(91, 134, 229, 0.86)'
}
const muiTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.grey
  },
  typography: {
    fontFamily: 'Open-sans'
  },
  overrides: {
    MuiPopover: {
      paper: {
        boxShadow:
          '0px 8px 9px -5px rgba(91, 134, 229, 0.4),0px 15px 22px 2px rgba(91, 134, 229, 0.28),0px 6px 28px 5px rgba(91, 134, 229, 0.24) !important'
      }
    }
  }
})

type AppProps = {}
class App extends Component {
  props: AppProps

  render () {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={styledTheme}>
          <ConnectedRouter history={history}>
            <div>
              <AppShell>
                <Switch>
                  <Route
                    path='/teacher/course-manager'
                    component={CourseManager}
                  />
                  <Route
                    path='/teacher/course-composer'
                    component={CourseComposer}
                  />
                  <Route exact path='/student/courses' component={Courses} />
                  <Route path='/student/courses/*' component={Course} />
                  <Route
                    path='/student/dashboard'
                    component={StudentDashboard}
                  />
                  <Route
                    path='*'
                    component={() => <div>Page not found!</div>}
                  />
                </Switch>
              </AppShell>
            </div>
          </ConnectedRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
