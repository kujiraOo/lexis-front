import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import styled, { withTheme } from 'styled-components'
import { Paper, Avatar, Text } from 'common-components'
import { grey, yellow, teal, blue } from 'material-ui/colors'
import List, { ListItem as MuiListItem } from 'material-ui/List'
import dashboardIcon from 'assets/trophy.svg'
import courseIcon from 'assets/blackboard.svg'
import courseComposerIcon from 'assets/compass.svg'
import tinyColor from 'tinycolor2'

import * as actionCreators from '../../core/action-creators'

const navigationItems = {
  TEACHER: [
    {
      title: 'Dashboard',
      imgSrc: dashboardIcon,
      link: '/teacher/dashboard'
    },
    {
      title: 'My Courses',
      imgSrc: courseIcon,
      link: '/teacher/course-manager'
    },
    {
      title: 'Course Composer',
      imgSrc: courseComposerIcon,
      link: '/teacher/course-composer'
    },
    {
      title: 'Profile',
      imgSrc: null,
      link: '/profile'
    }
  ],
  STUDENT: [
    {
      title: 'Dashboard',
      imgSrc: dashboardIcon,
      link: '/student/dashboard'
    },
    {
      title: 'My Courses',
      imgSrc: courseIcon,
      link: '/student/courses'
    },
    {
      title: 'Profile',
      imgSrc: null,
      link: '/profile'
    }
  ]
}

const white = 'rgba(255,255,255, 0.86)'

const ListItem = styled(MuiListItem)`
  border-width: ${props => (props.selected ? '4px' : '0px')} !important;
  border-style: solid !important;
  border-color: transparent transparent transparent
    ${props => props.selected && props.theme.primary} !important;
  &:hover {
    background-color: ${props =>
      tinyColor(props.theme.primary)
        .setAlpha(0.7)
        .toRgbString()} !important;
  }
`
const Wrapper = styled(Paper)`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 56px;
  left: 0;
  background: ${grey[800]};
  padding-top: 3rem;
`
const ListText = styled(Text)`margin-left: 16px;`
const SideNavigation = props => {
  let currentIndex = props.currIdx // for mocking purposes
  const { user } = props

  const renderNavigationItems = () => {
    if ((user && user.role == 'TEACHER') || 'STUDENT') {
      return navigationItems[user.role].map((item, key) => {
        const selected = currentIndex === key
        return (
          <Link style={{ textDecoration: 'none' }} to={item.link}>
            <ListItem
              selected={selected}
              button
              key={key}
              onClick={() => props.actions.nav.setIndex(key)}
            >
              <Avatar
                backgroundColor='transparent'
                style={{ backgroundColor: 'transparent' }}
                imgProps={{ style: { transform: 'scale(0.8)' } }}
                src={item.imgSrc}
                size='3rem'
              />
              <ListText light={!selected} medium={selected} color={white}>
                {item.title}
              </ListText>
            </ListItem>
          </Link>
        )
      })
    }
  }

  return (
    <Wrapper elevation={3}>
      <List>{renderNavigationItems()}</List>
    </Wrapper>
  )
}

export default connect(
  (state: AppState) => ({
    ...state.nav,
    user: { role: 'STUDENT' }
  }),
  dispatch => ({
    actions: {
      nav: bindActionCreators(actionCreators.navActions, dispatch)
    }
  })
)(SideNavigation)
