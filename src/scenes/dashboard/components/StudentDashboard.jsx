// @flow

import * as React from 'react'
import { Text, Avatar } from 'common-components'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { List } from 'immutable'
import {
  CoursePanels,
  GeneralAchievements,
  CourseAchievements,
  ProgressCharts
} from './'
import type { Achievement, AppState, AchievementCategory } from 'core/types'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%'
}
const styles = theme => ({
  panel: theme.mixins.gutters({
    ...commonStyles,
    marginBottom: '30px'
  }),
  avatarContainer: theme.mixins.gutters({
    ...commonStyles,
    textAlign: 'center'
  })
})

const Wrapper = styled(Grid)`
  padding: 2rem;
  width: 100%;
`

type Props = {
  classes: any,
  user: any,
  generalAchievements: List<Achievement>,
  courseAchievements: List<AchievementCategory>
}

const StudentDashboard = (props: Props) => {
  const { classes, user, generalAchievements, courseAchievements } = props

  return (
    <Wrapper container spacing={24}>
      <Paper className={classes.panel}>
        <Grid container spacing={24}>
          <Grid item sm={12} md={2} lg={1}>
            <Avatar size={'5rem'} />
          </Grid>
          <Grid item sm={12} md={10} lg={2}>
            <Text primary medium fontSize={'1.1rem'}>
              {user.firstName + ' ' + user.lastName}
            </Text>
            <br />
            <Text primary medium fontSize={'0.8rem'}>
              Level 1
            </Text>
            <br />
            <Text primary medium fontSize={'0.8rem'} color='#52BE80'>
              Active subscription
            </Text>
          </Grid>
          <Grid item xs={12} lg={9}>
            <ProgressCharts />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.panel}>
        <CoursePanels />
      </Paper>
      <Paper className={classes.panel}>
        <GeneralAchievements achievements={generalAchievements} />
      </Paper>
      <Paper className={classes.panel}>
        <Text fontSize='1.5em'>Course Achievements</Text>
      </Paper>
      <CourseAchievements
        className={classes.panel}
        achievementCategories={courseAchievements}
      />
    </Wrapper>
  )
}

const StyledStudentDashboard = withStyles(styles)(StudentDashboard)

function mapStateToProps (state: AppState) {
  return {
    user: {
      firstName: 'Bob',
      lastName: 'Chen'
    },
    generalAchievements: List([
      {
        name: 'Humanity Destroyer',
        description: 'Kill more than 7000000000 people'
      },
      {
        name: "Satan's Mom",
        description: 'Give birth to satan'
      },
      {
        name: 'The Pain Itself',
        description: 'Hurt feelings of at least 1000 people around you'
      },
      {
        name: 'Stunt Master',
        description: 'Drive you car into the ocean and surf a shark'
      },
      {
        name: 'The Doom Bringer',
        description: 'Cause a malfunction at a nuclear power plant'
      }
    ]),
    courseAchievements: List([
      {
        name: 'Menani French',
        achievements: [
          {
            name: 'Intoxicated',
            description: 'Drink 3 bottles of coke',
            unlocked: true
          },
          {
            name: 'The Great Escape',
            description: 'Happens after drinking 3 bottles of coke',
            unlocked: true
          },
          {
            name: 'Intoxicated',
            description: 'Drink 3 bottles of coke',
            unlocked: false
          },
          {
            name: 'The Great Escape',
            description: 'Happens after drinking 3 bottles of coke',
            unlocked: false
          }
        ]
      },
      {
        name: 'Basics of Spanish',
        achievements: [
          {
            name: 'The King',
            description: 'Get married to a queen',
            unlocked: true
          },
          {
            name: 'Rumble in The Sky',
            description: 'Use Stinger missile launcher at least ones',
            unlocked: true
          },
          {
            name: 'The King',
            description: 'Get married to a queen',
            unlocked: false
          },
          {
            name: 'Rumble in The Sky',
            description: 'Use Stinger missile launcher at least ones',
            unlocked: false
          }
        ]
      }
    ])
  }
}

export default connect(mapStateToProps)(StyledStudentDashboard)
