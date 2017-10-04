// @flow

import { Grid, ListItem } from 'material-ui'
import Text from './Text'
import styled from 'styled-components'
import * as React from 'react'

const ContentContainer = styled(ListItem)`minheight: 8rem;`

type Props = {
  children?: Node
}

const ListPanel = ({ children }: Props) => {
  return (
    <Grid item xs={12} md={6} xl={4}>
      <ContentContainer>{children}</ContentContainer>
    </Grid>
  )
}

export default ListPanel
