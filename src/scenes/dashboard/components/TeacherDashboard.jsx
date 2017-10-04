// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Wrapper, Text } from 'common-components'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import EventPanel from './EventPanel'
import FinancialDetails from './FinancialDetails'
import GeneralAchievements from './GeneralAchievements'
// import CategoryAchievements from './CategoryAchievements'
import { List } from 'immutable'
import type { PromoEvent } from '../types'
import type { Achievement, AppState, AchievementCategory } from 'core/types'
import CategoryAchievements from './CategoryAchievements'

const styles = theme => ({
  panel: theme.mixins.gutters({
    marginBottom: '30px',
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%'
  })
})

type Props = {
  classes: any,
  events: List<PromoEvent>,
  generalAchievements: List<Achievement>,
  categoryAchievements: List<AchievementCategory>
}

class TeacherDashboard extends React.Component {
  props: Props

  constructor (props: Props) {
    super(props)
  }

  render () {
    const {
      classes,
      events,
      generalAchievements,
      categoryAchievements
    } = this.props

    return (
      <Wrapper container spacing={24}>
        <Paper className={classes.panel}>
          <EventPanel events={events} />
        </Paper>
        <Paper className={classes.panel}>
          <FinancialDetails />
        </Paper>
        <Paper className={classes.panel}>
          <GeneralAchievements achievements={generalAchievements} />
        </Paper>
        <Paper className={classes.panel}>
          <Text fontSize='1.5em'>Category Achievements</Text>
        </Paper>
        <CategoryAchievements achievementCategories={categoryAchievements} />
      </Wrapper>
    )
  }
}

const StyledTeacherDashboard = withStyles(styles)(TeacherDashboard)

function mapStateToProps (state: AppState) {
  return {
    events: List([
      {
        name: 'Hot Promo',
        description: 'Boost your course!'
      },
      {
        name: 'Cool Promo',
        description: 'Earn 1 000 000 000 euro in one weekend'
      },
      {
        name: 'Fun Promo',
        description: 'Tickets to Las Vegas!11 50% teacher discount'
      },
      {
        name: 'Amazing Promo',
        description: 'Good luck and have fun!'
      }
    ]),
    generalAchievements: List([
      {
        name: 'Teacher of The Year',
        description:
          'Be stronger than any other teacher in the world for a duration of 1 year'
      },
      {
        name: 'God of Education',
        description: 'Earn more than 1 000 000 euro in one day'
      },
      {
        name: 'Good Teacher Bad Teacher',
        description:
          'Kick 1 000 students out of your course and train your dog to give paw'
      },
      {
        name: 'The Egghead',
        description: 'Replace your head with an egg'
      }
    ]),
    categoryAchievements: List([
      {
        name: 'Finance',
        achievements: [
          {
            name: 'Man Who Sold The World',
            description:
              'Learn to play Man Who Sold The World and make a cover like Nirvana did',
            unlocked: true
          },
          {
            name: 'Squeeze Them All',
            description:
              'Trick at least 100 students to subscribe to one of your courses with ridiculously high subscription cost',
            unlocked: true
          },
          {
            name: 'Man Who Sold The World',
            description:
              'Learn to play Man Who Sold The World and make a cover like Nirvana did',
            unlocked: false
          },
          {
            name: 'Squeeze Them All',
            description:
              'Trick at least 100 students to subscribe to one of your courses with ridiculously high subscription cost',
            unlocked: false
          }
        ]
      },
      {
        name: 'Reputation',
        achievements: [
          {
            name: 'Kind Guy',
            description:
              'Grant course completion certificates with 100% rate to 1 000 students',
            unlocked: true
          },
          {
            name: 'Rumble in The Sky',
            description: 'Use Stinger missile launcher at least ones',
            unlocked: true
          },
          {
            name: 'Man Who Sold The World',
            description:
              'Learn to play Man Who Sold The World and make a cover like Nirvana did',
            unlocked: false
          },
          {
            name: 'Squeeze Them All',
            description:
              'Trick at least 100 students to subscribe to one of your courses with ridiculously high subscription cost',
            unlocked: false
          }
        ]
      }
    ])
  }
}

export default connect(mapStateToProps)(StyledTeacherDashboard)
