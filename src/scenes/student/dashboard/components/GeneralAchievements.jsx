// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { AppState } from '../../../../types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Text } from 'common-components'
import { Paper } from 'material-ui'
import { Carousel } from './'

const styles = theme => ({
  achievementPanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px',
    minHeight: '100px'
  })
})

type Props = {
  achievements: Array<any>,
  classes: any
}

const nAchievementsPerView = 3

class GeneralAchievements extends React.Component {
  props: Props
  state: {
    selectedViewIdx: number
  }
  handleChangeIndex: Function

  constructor (props) {
    super(props)

    this.state = {
      selectedViewIdx: 0
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  handleChangeIndex (idx) {
    this.setState({
      selectedViewIdx: idx
    })
  }

  renderCoursePanels (offset, nCourses) {
    const { classes, achievements } = this.props
    let coursePanels = []

    const coursesEndIndex =
      offset + nCourses > achievements.length
        ? achievements.length
        : offset + nCourses

    for (let i = offset; i < coursesEndIndex; i++) {
      coursePanels.push(
        <Grid item sm={4}>
          <Paper className={classes.achievementPanel} key={i}>
            <Text fontSize={'1.3em'}>{achievements[i].name}</Text>
            <br />
            <br />
            <Text>{achievements[i].description}</Text>
          </Paper>
        </Grid>
      )
    }

    return coursePanels
  }

  renderAchievementPanelViews () {
    const { achievements } = this.props

    const nViews = Math.floor(achievements.length / nAchievementsPerView) + 1

    let views = []

    for (let i = 0; i < nViews; i++) {
      views.push(
        <Grid container spacing={12} key={i} style={{ padding: '10px' }}>
          {this.renderCoursePanels(
            i * nAchievementsPerView,
            nAchievementsPerView
          )}
        </Grid>
      )
    }

    return views
  }

  render () {
    const { achievements } = this.props
    const { selectedViewIdx } = this.state
    const nViews = Math.floor(achievements.length / nAchievementsPerView)

    return (
      <div>
        <Text fontSize='1.5em'>General Achievements</Text>
        <Carousel
          nViews={nViews}
          children={this.renderAchievementPanelViews()}
          onChangeIndex={this.handleChangeIndex}
          viewIdx={selectedViewIdx}
        />
      </div>
    )
  }
}

const StyledGeneralAchievements = withStyles(styles)(GeneralAchievements)

function mapStateToProps (state: AppState) {
  return {
    achievements: [
      {
        name: 'Humanity Destroyer',
        description: 'Kill more than 7 000 000 000 people'
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
    ]
  }
}

export default connect(mapStateToProps)(StyledGeneralAchievements)
