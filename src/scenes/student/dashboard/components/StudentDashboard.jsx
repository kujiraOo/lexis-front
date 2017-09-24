// @flow

import * as React from 'react'
import { Text, Avatar } from 'common-components'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import type { AppState } from '../../../../types'
import { connect } from 'react-redux'
import { CoursePanels, GeneralAchievements } from './'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%'
}
const styles = theme => ({
  overview: theme.mixins.gutters({
    ...commonStyles
  }),
  coursePanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px'
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

const StudentDashboard = (props: Props) => {
  const { classes, user } = props

  return (
    <Wrapper container spacing={24}>
      <Paper className={classes.overview}>
        <Grid container spacing={24}>
          <Grid item sm={1}>
            <Avatar size='100%' />
          </Grid>
          <Grid item sm={6}>
            <Text primary medium fontSize={'1.3em'}>
              {user.firstName + ' ' + user.lastName}
            </Text>
            <br />
            <Text primary medium fontSize={'1.0em'}>
              Level 1
            </Text>
            <br />
            <Text primary medium fontSize={'0.8em'} color='#52BE80'>
              Active subscription
            </Text>
          </Grid>

          <br />
          <br />
          <br />
        </Grid>
      </Paper>
      <Paper className={classes.overview}>
        <CoursePanels />
      </Paper>
      <Paper className={classes.overview}>
        <GeneralAchievements />
      </Paper>
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
