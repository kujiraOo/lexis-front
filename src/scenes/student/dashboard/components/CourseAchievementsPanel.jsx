// @flow

import React from 'react'
import { Button, Paper, TableBody, TableRow, TableCell } from 'material-ui'
import { Text } from 'common-components'
import { Avatar } from 'common-components'
import trophy from 'assets/trophy.svg'

import styled from 'styled-components'
import { ArrowDropDown, ArrowDropUp } from 'material-ui-icons'

const AchievementIcon = styled(Avatar)`
  width: 3em !important;
  height: 3em !important;
  display: inline-block !important;
  margin: 1em 1em 1em 0;
`

const Container = styled(Paper)`
  margin-bottom: 30px;
  padding: 16px 24px 16px 24px;
`

const DropDownButton = styled(Button)`
  float: right;
  margin: 1em 1em 1em 0;
`

type Props = {
  course: any,
  classes: any
}

class CourseAchievementsPanel extends React.Component {
  props: Props
  state: {
    collapsed: boolean
  }
  handleDropDownButtonClick: Function

  constructor (props: Props) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.handleDropDownButtonClick = this.handleDropDownButtonClick.bind(this)
  }

  handleDropDownButtonClick () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  renderAchivementIcons () {
    const { achievements } = this.props.course

    return achievements.map(achievement => <AchievementIcon src={trophy} />)
  }

  renderCollapsed () {
    return (
      <div>
        {this.renderAchivementIcons()}
        <DropDownButton
          color='primary'
          fab
          onClick={this.handleDropDownButtonClick}
        >
          <ArrowDropDown />
        </DropDownButton>
      </div>
    )
  }

  renderExpanded () {
    return (
      <div>
        <TableBody>{this.renderAchivementItems()}</TableBody>
        <div>
          <DropDownButton
            color='primary'
            fab
            onClick={this.handleDropDownButtonClick}
          >
            <ArrowDropUp />
          </DropDownButton>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    )
  }

  renderAchivementItems () {
    const { achievements } = this.props.course

    return achievements.map(achievement => {
      return (
        <TableRow key={achievement.name}>
          <TableCell>
            <AchievementIcon src={trophy} />
          </TableCell>
          <TableCell>
            <Text fontSize={'1.5em'}>{achievement.name}</Text>
            <br />
            <br />
            <Text>{achievement.description}</Text>
          </TableCell>
        </TableRow>
      )
    })
  }

  render () {
    const { course } = this.props
    const { collapsed } = this.state

    return (
      <Container>
        <Text fontSize={'1.3em'}>{course.name}</Text>
        {collapsed ? this.renderCollapsed() : this.renderExpanded()}
      </Container>
    )
  }
}

export default CourseAchievementsPanel
