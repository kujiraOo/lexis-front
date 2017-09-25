// @flow

import * as React from 'react'
import { Text, Avatar } from 'common-components'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import type { AppState } from '../../../../types'
import { connect } from 'react-redux'
import {
  CoursePanels,
  GeneralAchievements,
  CourseAchievements,
  ProgressCharts
} from './'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%'
}
const styles = theme => ({
  panel: theme.mixins.gutters({
    ...commonStyles,
    marginBottom: '30px'
  })
})

type Props = {
  classes: any,
  user: any
}

const Wrapper = styled(Grid)`
  padding: 2rem;
  width: 100%;
`

const DashboardAvatar = styled(Avatar)`
  width: 5em !important;
  height: 5em !important;
`

const StudentDashboard = (props: Props) => {
  const { classes, user } = props

  return (
    <Wrapper container spacing={24}>
      <Paper className={classes.panel}>
        <Grid container spacing={24}>
          <Grid item sm={1}>
            <DashboardAvatar />
          </Grid>
          <Grid item sm={1}>
            <Text primary medium fontSize={'1.3em'}>
              {user.firstName + ' ' + user.lastName}
            </Text>
            <br />
            <Text primary medium fontSize={'1em'}>
              Level 1
            </Text>
            <br />
            <Text primary medium fontSize={'0.8em'} color='#52BE80'>
              Active subscription
            </Text>
          </Grid>
          <Grid item sm={10}>
            <ProgressCharts />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.panel}>
        <CoursePanels />
      </Paper>
      <Paper className={classes.panel}>
        <GeneralAchievements />
      </Paper>
      <CourseAchievements className={classes.panel} />
    </Wrapper>
  )
}

const StyledStudentDashboard = withStyles(styles)(StudentDashboard)

function mapStateToProps (state: AppState) {
  return {
    user: {
      firstName: 'Bob',
      lastName: 'Chen'
    }
  }
}

export default connect(mapStateToProps)(StyledStudentDashboard)
