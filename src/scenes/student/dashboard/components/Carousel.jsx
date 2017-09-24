// @flow

import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Button } from 'material-ui'
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

const styles = theme => ({
  container: theme.mixins.gutters({
    padding: '20px',
    backgroundColor: theme.palette.background.default
  }),
  buttonContainer: theme.mixins.gutters({
    textAlign: 'center'
  }),
  button: theme.mixins.gutters({
    marginTop: '45%'
  })
})

type Props = {
  children: Node,
  nViews: number,
  classes: any,
  viewIdx: number,
  onChangeIndex: (idx: number) => void
}

class Carousel extends Component {
  props: Props
  handleLeftButtonClick: Function
  handleRightButtonClick: Function
  handleChangeIndex: Function

  constructor (props) {
    super(props)

    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  handleLeftButtonClick () {
    const { viewIdx, onChangeIndex } = this.props
    const newIdx = viewIdx - 1

    onChangeIndex(newIdx < 0 ? 0 : newIdx)
  }

  handleRightButtonClick () {
    const { nViews, viewIdx, onChangeIndex } = this.props
    const newIdx = viewIdx + 1

    onChangeIndex(newIdx > nViews ? nViews : newIdx)
  }

  handleChangeIndex (idx) {
    this.props.onChangeIndex(idx)
  }

  render () {
    const { classes, children, viewIdx } = this.props

    return (
      <Grid container>
        <Grid item sm={1} className={classes.buttonContainer}>
          <Button
            fab
            color='primary'
            onClick={this.handleLeftButtonClick}
            className={classes.button}
          >
            <ChevronLeft />
          </Button>
        </Grid>
        <Grid item sm={10}>
          <SwipeableViews
            enableMouseEvents
            children={children}
            className={classes.container}
            index={viewIdx}
            onChangeIndex={this.handleChangeIndex}
          />
        </Grid>
        <Grid item sm={1} className={classes.buttonContainer}>
          <Button
            fab
            color='primary'
            onClick={this.handleRightButtonClick}
            className={classes.button}
          >
            <ChevronRight />
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Carousel)
