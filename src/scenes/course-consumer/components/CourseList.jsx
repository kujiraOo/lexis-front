// @flow

import type { CourseListItem } from '../types'
import * as React from 'react'

import { Wrapper, ListPanel, Text } from 'common-components'
import { Grid, List, Paper, ListItem } from 'material-ui'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import * as courseListActions from '../actions-creators/courseListActions'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import { courseListQuery } from '../queries'
import defaultImage from '../../../assets/course-space.svg'

const ClickableContainer = styled(ListItem)`
  margin-bottom: 1rem;
  width: 100% !important;
  display: block !important;
  padding: 0;
`

const Container = styled(Paper)`
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  max-height: 200px;
`

const HeaderContainer = styled.div`
  margin: 1rem;
  width: 100%;
`

const DescriptionContainer = styled.div`
  margin: 1rem;
  width: 100%;
`

const CourseImg = styled.img`
  height: 150px;
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
`

const ImgContainer = styled(Grid)`overflow: hidden;`

type Props = {
  actions: {
    courseList: typeof courseListActions
  },
  data: {
    coursesByStudentEmail: Array<CourseListItem>
  },
  history: any
}

const CourseList = ({ data, actions, history }: Props) => {
  const courses = data.coursesByStudentEmail

  if (!courses) return null

  const renderCourseItems = () => {
    return courses.map(({ id, imageUrl, name, description }) => (
      <ListPanel key={id}>
        <ClickableContainer
          key={id}
          onClick={() => {
            actions.courseList.selectCourse(id)
            history.push(`/courses/${name}`)
          }}
          button
        >
          <Container>
            <Grid container spacing={24}>
              <ImgContainer item xs={5}>
                <CourseImg src={imageUrl || defaultImage} />
              </ImgContainer>
              <Grid item xs={7}>
                <HeaderContainer>
                  <Text fontSize={'2rem'}>{name}</Text>
                </HeaderContainer>
                <DescriptionContainer>
                  <Text>{description}</Text>
                </DescriptionContainer>
              </Grid>
            </Grid>
          </Container>
        </ClickableContainer>
      </ListPanel>
    ))
  }

  return (
    <Grid container spacing={0}>
      {renderCourseItems()}
    </Grid>
  )
}

const CourseListWithData = graphql(courseListQuery)(CourseList)

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseList: bindActionCreators(courseListActions, dispatch)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CourseListWithData))
