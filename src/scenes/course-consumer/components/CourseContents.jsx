// @flow

import * as React from 'react'
import type { AppState, Course } from 'core/types'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { courseContentsQuery } from '../queries'
import { Wrapper, Text } from 'common-components'
import { Grid, List, ListItem } from 'material-ui'
import { courseContentsActions } from '../actions-creators'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import defaultImage from '../../../assets/course-space.svg'

const Container = styled(Grid)`padding: 3rem;`
const CourseImage = styled.img`
  height: 300px;
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
`
const ImageContainer = styled(Grid)`overflow: hidden;`

type Props = {
  course: Course,
  actions: {
    courseContents: typeof courseContentsActions
  },
  history: any,
  location: Location
}

class CourseContents extends React.Component {
  props: Props

  renderLessonListItems (chapterIdx, chapter) {
    const { courseContents } = this.props.actions
    const { history, location } = this.props

    return chapter.lessons.map((lesson, i) => (
      <ListItem
        button
        onClick={() => {
          courseContents.selectChapterAndLesson(chapterIdx, i)
          history.push(
            history.push(`${location.pathname}/${chapter.name}/${lesson.name}`)
          )
        }}
        key={i}
      >
        <Text>{`${i + 1}. ${lesson.name}`}</Text>
      </ListItem>
    ))
  }

  renderTableOfContents () {
    const { course } = this.props

    if (course) {
      return course.levels.map((chapter, i) => (
        <div key={i}>
          <Text fontSize={'1.5rem'}>{`${i + 1}. ${chapter.name}`}</Text>
          <List>{this.renderLessonListItems(i, chapter)}</List>
        </div>
      ))
    }
  }

  render () {
    const { course } = this.props

    return (
      <Container container>
        {course ? (
          <Grid container>
            <ImageContainer item xs={4}>
              <CourseImage src={course.imageUrl || defaultImage} />
            </ImageContainer>
            <Grid item xs={8}>
              <p>
                <Text fontSize={'3rem'}>{course.name}</Text>
              </p>
              <p>
                <Text fontSize={'1.5rem'}>{course.description}</Text>
              </p>
            </Grid>
            <Grid item xs={12}>
              <p>
                <Text fontSize={'2rem'}>Contents</Text>
              </p>
              {this.renderTableOfContents()}
            </Grid>
          </Grid>
        ) : (
          <div>No course data available</div>
        )}
      </Container>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    selectedCourse: state.courseConsumer.courseList.selectedCourse,
    course: state.courseConsumer.courseContents.course
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseContents: bindActionCreators(courseContentsActions, dispatch)
    }
  }
}

const CourseContentsWithData = graphql(courseContentsQuery, {
  options: props => {
    return { variables: { id: props.selectedCourse } }
  }
})(CourseContents)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseContentsWithData)
)
