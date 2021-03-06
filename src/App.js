/* @flow */

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import * as colors from 'material-ui/colors'

import 'assets/index.css'
import 'assets/font-awesome-4.7.0/css/font-awesome.min.css'
import 'animate.css/animate.min.css'

import AppShell from './scenes/app-shell/AppShell'
import Registration from './scenes/registration/index'
import Login from './scenes/login/index'

import {
  CourseEditor,
  LevelEditor,
  LessonEditor
} from './scenes/course-composer/components'
import CourseManager from './scenes/course-manager'
import Course from './scenes/course-consumer'

import history from './core/history'
import Dashboard from './scenes/dashboard/components/Dashboard'
import CourseConsumer from './scenes/course-consumer/components/CourseConsumer'

const primaryColor = '#5B86E5'
const styledTheme = {
  primary: primaryColor,
  textColor: 'rgba(91, 134, 229, 0.86)',
  transition: {
    hard: `0.3s`,
    soft: `0.7s`
  }
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
              <Switch>
                <Route path='/register' component={Registration} />
                <Route path='/login' component={Login} />
                <AppShell>
                  <Route path='/course-manager' component={CourseManager} />
                  <Route
                    exact
                    path='/course-composer/:courseId'
                    component={CourseEditor}
                  />
                  <Route
                    exact
                    path='/course-composer/:courseId/:levelId'
                    component={LevelEditor}
                  />
                  <Route
                    path='/course-composer/:courseId/:levelId/:lessonId'
                    component={LessonEditor}
                  />
                  <Route path='/dashboard' component={Dashboard} />
                  {/*<Route exact path='/student/courses' component={Courses} />*/}
                  <Route path='/courses' component={CourseConsumer} />
                  <Route
                    path='*'
                    component={() => <div>Page not found!</div>}
                  />
                </AppShell>
              </Switch>
            </div>
          </ConnectedRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
