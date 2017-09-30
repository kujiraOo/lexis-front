/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import styled from 'styled-components'

import { Text, ActionButton } from 'common-components'
import { StyledGridTile, BlockedTextField, InputForm } from '.'

import YouTube from 'react-youtube'

import {
  ActivityPicker,
  VideoModal,
  AudioModal,
  SkypeModal,
  TextModal
} from '.'

import * as actionCreators from '../action-creators'

import type {
  LessonEditorState,
  TextModalState,
  AudioModalState,
  VideoModalState,
  SkypeModalState
} from '../types'
import type { AppState, Activity, Header } from 'core/types'

const ActivityButton = styled(Button)`
  width: 40px !important;
  height: 30px !important;
  float: right;
  position: relative;
  left: 20px;
  bottom: 15px;
`

type ActivityType = 'main' | 'secondary'

type LessonEditorProps = {
  lessonEditor: LessonEditorState,
  textModal: TextModalState,
  audioModal: AudioModalState,
  videoModal: VideoModalState,
  skypeModal: SkypeModalState,
  actions: any
}
export class LessonEditor extends Component {
  prop: LessonEditorProps

  render () {
    const {
      lesson,
      activityPicker,
      editedActivityIdx
    } = this.props.lessonEditor
    const {
      textModal,
      audioModal,
      videoModal,
      skypeModal,
      actions
    } = this.props

    return (
      <div style={{ marginLeft: '5%' }}>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Lesson details
        </Text>
        <InputForm>
          <BlockedTextField
            id='lesson-name'
            label='Lesson name'
            value={lesson.name}
            onChange={ev => actions.lesson.editName(ev.target.value)}
          />
        </InputForm>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Lesson activities (use sidebar to add new ones)
        </Text>
        {/* Check if it is an Activity or a Header and select rendering respectively */}
        {lesson.activities.map(
          (p, i) =>
            p.type ? (
              <ActivityWrapper
                key={i}
                activity={p}
                onEditStart={() => actions.activity.startEdit(i)}
                onRemove={() => actions.activity.remove(i)}
              />
            ) : (
              <HeaderComponent
                key={i}
                header={p}
                isEdited={editedActivityIdx === i}
                onEdit={header => actions.header.edit(i, header)}
                onEditStart={() => actions.activity.startEdit(i)}
                onRemove={() => actions.activity.remove(i)}
              />
            )
        )}
        <ActivityPicker
          picker={activityPicker}
          onItemSelect={actions.activity.select}
          onHeaderAdd={actions.header.add}
        />

        <VideoModal
          video={videoModal}
          onUrlEdit={actions.video.editUrl}
          onClose={actions.video.close}
          onSave={actions.activity.add}
        />
        <AudioModal
          audio={audioModal}
          onUrlEdit={actions.audio.editUrl}
          onClose={actions.audio.close}
          onSave={actions.activity.add}
        />
        <SkypeModal
          skype={skypeModal}
          onTopicEdit={actions.skype.editTopic}
          onGroupToggle={actions.skype.toggleGroup}
          onDurationChange={actions.skype.editDuration}
          onStartTimeChange={actions.skype.editStartTime}
          onClose={actions.skype.close}
          onSave={actions.activity.add}
        />
        <TextModal
          text={textModal}
          onTextEdit={actions.text.editContent}
          onClose={actions.text.close}
          onSave={actions.activity.add}
        />

        <ActionButton style={{ right: '220px' }}>
          <SaveIcon />
        </ActionButton>
      </div>
    )
  }
}

type HeaderProps = {
  header: Header,
  isEdited: boolean,
  onRemove: () => void,
  onEditStart: () => void,
  onEdit: (header: Header) => void
}
type HeaderState = {
  editedText: string
}
class HeaderComponent extends Component {
  props: HeaderProps
  state: HeaderState

  constructor (props: HeaderProps) {
    super(props)

    this.state = {
      editedText: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ editedText: nextProps.header.text })
  }

  handleEdit (text: string) {
    this.setState(prevState => ({
      ...prevState,
      editedText: text
    }))
  }

  render () {
    const { header, isEdited, onEdit, onEditStart } = this.props

    if (isEdited) {
      return (
        <div>
          <Button onClick={() => onEdit({ text: this.state.editedText })}>
            Save
          </Button>
          <BlockedTextField
            style={{ width: '50%' }}
            value={this.state.editedText}
            onChange={ev => this.handleEdit(ev.target.value)}
          />
        </div>
      )
    }

    return (
      <div>
        <Button onClick={onEditStart}>Edit</Button>
        <Text medium fontSize={'2rem'}>
          {header.text}
        </Text>
      </div>
    )
  }
}

type ActivityWrapperProps = {
  activity: Activity,
  onRemove: () => void,
  onEditStart: () => void
}
function ActivityWrapper ({
  activity,
  onRemove,
  onEditStart
}: ActivityWrapperProps) {
  return (
    <Paper
      style={{
        width: '70%',
        margin: '50px 50px 50px 50px'
      }}
    >
      <ActivityButton
        fab
        color='accent'
        style={{ backgroundColor: '#CC0000' }}
        onClick={onRemove}
      >
        <DeleteIcon />
      </ActivityButton>
      <ActivityButton fab color='primary' onClick={onEditStart}>
        <EditIcon />
      </ActivityButton>
      <ActivityContent activity={activity} />
    </Paper>
  )
}

type ActivityContentProps = {
  activity: Activity
}
function ActivityContent ({ activity }: ActivityContentProps) {
  if (activity === null) {
    return null
  }

  switch (activity.type) {
    case 'video':
      return activity.url ? (
        <div>
          <YouTube videoId={activity.url} />
        </div>
      ) : null

    case 'audio':
      return null

    case 'text':
      return (
        <Text>
          {activity.content.split('\n').map(p => (
            <span>
              {p}
              <br />
            </span>
          ))}
        </Text>
      )

    case 'skype':
      return (
        <div>
          <img
            height={window.innerHeight * 0.39}
            width={window.innerWidth * 0.4}
            src='https://secure.skypeassets.com/i/common/images/icons/skype-logo-open-graph.png'
          />
          <div
            style={{
              position: 'absolute',
              bottom: window.innerHeight * 0.55,
              left: window.innerWidth * 0.25
            }}
          >
            <Text style={{ marginBottom: '20px' }} color='white'>
              {activity.topic}
            </Text>
            <br />
            <Text style={{ marginBottom: '20px' }} color='white'>
              {activity.group ? 'Group session' : 'Individual session'}
            </Text>
            <br />
            <Text style={{ marginBottom: '20px' }} color='white'>
              {getReadableDuration(activity.duration)}
            </Text>
          </div>
        </div>
      )

    default:
      return null
  }
}

function getReadableDuration (duration: number): string {
  switch (duration) {
    case 0:
      return 'No duration limit'

    case 30 * 60:
      return '30 minutes'

    case 45 * 60:
      return '45 minutes'

    case 1 * 60 * 60:
      return '1 hour'

    case 1.5 * 60 * 60:
      return '1.5 hour'

    case 2 * 60 * 60:
      return '2 hours'

    case 2.5 * 60 * 60:
      return '2.5 hours'

    case 3 * 60 * 60:
      return '3 hours'

    default:
      return 'No duration limit'
  }
}

function mapStateToProps (state: AppState) {
  return {
    lessonEditor: state.courseComposer.lessonEditor,
    textModal: state.courseComposer.textModal,
    audioModal: state.courseComposer.audioModal,
    videoModal: state.courseComposer.videoModal,
    skypeModal: state.courseComposer.skypeModal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      lesson: bindActionCreators(actionCreators.lessonActions, dispatch),
      audio: bindActionCreators(actionCreators.audioActions, dispatch),
      skype: bindActionCreators(actionCreators.skypeActions, dispatch),
      text: bindActionCreators(actionCreators.textActions, dispatch),
      video: bindActionCreators(actionCreators.videoActions, dispatch),
      activity: bindActionCreators(actionCreators.activityActions, dispatch),
      header: bindActionCreators(actionCreators.headerActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonEditor)
