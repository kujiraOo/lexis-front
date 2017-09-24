// @flow

import React from 'react'
import type { AppState } from '../../../../types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import CourseAchievementsPanel from './CourseAchievementsPanel'

const styles = theme => ({
  container: theme.mixins.gutters({
    width: '100%',
    padding: '0 !important'
  }),
  panel: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: '30px'
  })
})

type Props = {
  courseData: Array<any>,
  classes: any
}

class CourseAchievements extends React.Component {
  props: Props

  renderCourseAchievementPanels () {
    const { courseData, classes } = this.props

    return courseData.map(course => <CourseAchievementsPanel course={course} />)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        {this.renderCourseAchievementPanels()}
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    courseData: [
      {
        name: 'Menani French',
        achievements: [
          {
            name: 'Intoxicated',
            description: 'Drink 3 bottles of coke'
          },
          {
            name: 'The Great Escape',
            description: 'Happens after drinking 3 bottles of coke'
          }
        ]
      },
      {
        name: 'Basics of Spanish',
        achievements: [
          {
            name: 'The King',
            description: 'Get married to a queen'
          },
          {
            name: 'Rumble in The Sky',
            description: 'Use Stinger missile launcher at least ones'
          }
        ]
      }
    ]
  }
}

const StyledCourseAchievements = withStyles(styles)(CourseAchievements)

export default connect(mapStateToProps)(StyledCourseAchievements)
