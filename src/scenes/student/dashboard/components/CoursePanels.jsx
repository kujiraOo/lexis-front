// @flow

import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import type { AppState } from '../../../../types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Text } from 'common-components'
import { Button, Paper } from 'material-ui'
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

const styles = theme => ({
  container: theme.mixins.gutters({
    padding: '20px',
    backgroundColor: theme.palette.background.default
  }),
  buttonContainer: theme.mixins.gutters({
    textAlign: 'center'
  }),
  button: theme.mixins.gutters({
    marginTop: '45%'
  }),
  coursePanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px'
  })
})

type Props = {
  courses: Array<any>,
  classes: any
}

const nCoursesPerView = 3

class CoursePanels extends Component {
  props: Props
  state: {
    selectedViewIdx: number
  }
  handleLeftButtonClick: Function
  handleRightButtonClick: Function
  handleChangeIndex: Function

  constructor (props) {
    super(props)

    this.state = {
      selectedViewIdx: 2
    }

    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  handleLeftButtonClick () {
    const { selectedViewIdx } = this.state
    const newIdx = selectedViewIdx - 1

    this.setState({
      selectedViewIdx: newIdx < 0 ? 0 : newIdx
    })
  }

  handleRightButtonClick () {
    const { courses } = this.props
    const { selectedViewIdx } = this.state
    const newIdx = selectedViewIdx + 1
    const nViews = Math.floor(courses.length / nCoursesPerView)

    this.setState({
      selectedViewIdx: newIdx > nViews ? nViews : newIdx
    })
  }

  handleChangeIndex (idx) {
    this.setState({
      selectedViewIdx: idx
    })
  }

  renderCoursePanels (offset, nCourses) {
    const { classes, courses } = this.props
    let coursePanels = []

    const coursesEndIndex =
      offset + nCourses > courses.length ? courses.length : offset + nCourses

    for (let i = offset; i < coursesEndIndex; i++) {
      coursePanels.push(
        <Grid item sm={4}>
          <Paper className={classes.coursePanel} key={i}>
            <Text>Super English</Text>
            <br />
            <br />
            <Text>Complete 1/12</Text>
          </Paper>
        </Grid>
      )
    }

    return coursePanels
  }

  renderCoursePanelViews () {
    const { courses } = this.props

    const nViews = Math.floor(courses.length / nCoursesPerView) + 1

    let views = []

    for (let i = 0; i < nViews; i++) {
      views.push(
        <Grid container spacing={12} key={i} style={{ padding: '10px' }}>
          {this.renderCoursePanels(i * nCoursesPerView, nCoursesPerView)}
        </Grid>
      )
    }

    return views
  }

  render () {
    const { classes } = this.props
    const { selectedViewIdx } = this.state

    return (
      <div>
        <Text fontSize='1.5em'>Courses</Text>
        <Grid container>
          <Grid item sm={1} className={classes.buttonContainer}>
            <Button
              fab
              color='primary'
              onClick={this.handleLeftButtonClick}
              className={classes.button}
            >
              <ChevronLeft />
            </Button>
          </Grid>
          <Grid item sm={10}>
            <SwipeableViews
              enableMouseEvents
              children={this.renderCoursePanelViews()}
              className={classes.container}
              index={selectedViewIdx}
              onChangeIndex={this.handleChangeIndex}
            />
          </Grid>
          <Grid item sm={1} className={classes.buttonContainer}>
            <Button
              fab
              color='primary'
              onClick={this.handleRightButtonClick}
              className={classes.button}
            >
              <ChevronRight />
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const StyledCoursePanels = withStyles(styles)(CoursePanels)

function mapStateToProps (state: AppState) {
  return {
    courses: [
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Amazing English',
        completion: '1/12'
      }
    ]
  }
}

export default connect(mapStateToProps)(StyledCoursePanels)
