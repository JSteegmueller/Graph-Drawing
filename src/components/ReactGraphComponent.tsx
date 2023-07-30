/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import 'yfiles/yfiles.css'
import React, { Component } from 'react'
import {
  GraphComponent,
  GraphEditorInputMode,
  GraphViewerInputMode,
  HierarchicNestingPolicy,
  ICommand,
  SvgExport
} from 'yfiles'
import '../lib/yFilesLicense'
import loadGraph from '../graph/loadGraph'
import { eventBus } from '../lib/EventBus'
import UserInputDialog from './UserInputDialog'
import FileSaveSupport from '../FileSaveSupport'

export default class ReactGraphComponent extends Component {
  private readonly div: React.RefObject<HTMLDivElement>
  private readonly graphComponent: GraphComponent

  constructor(props: any) {
    super(props)
    this.div = React.createRef<HTMLDivElement>()

    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent()

    this.graphComponent.inputMode = new GraphViewerInputMode()

    this.registerToolbarEvents()
  }

  async componentDidMount(): Promise<void> {
    // append the GraphComponent to the DOM
    this.graphComponent.div.style.width = '100%'
    this.graphComponent.div.style.height = '100%'
    this.div.current!.appendChild(this.graphComponent.div)
    const graphModelManager = this.graphComponent.graphModelManager
    graphModelManager.hierarchicNestingPolicy = HierarchicNestingPolicy.GROUP_NODES
    this.graphComponent.graph = await loadGraph()
    this.graphComponent.graph.undoEngineEnabled = true
    this.graphComponent.inputMode = new GraphEditorInputMode({ allowCreateNode: false, allowCreateEdge: false })
    // center the newly created graph
    this.graphComponent.fitGraphBounds()
  }

  render(): JSX.Element {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          className='graph-component-container'
          style={{ width: '100%', height: '100%' }}
          ref={this.div}
        />
        <div style={{ position: 'absolute', left: '500px', top: '200px' }}>
          <UserInputDialog />
        </div>
      </div>
    )
  }

  private registerToolbarEvents() {
    eventBus.subscribe('zoom-in', () => {
      ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)
    })
    eventBus.subscribe('zoom-out', () => {
      ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)
    })
    eventBus.subscribe('zoom-fit', () => {
      ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)
    })
    eventBus.subscribe('export', async () => {
      const exporter = new SvgExport({
        // determine the bounds of the exported area
        worldBounds: this.graphComponent.contentRect,
        scale: 1,
        encodeImagesBase64: true,
        inlineSvgImages: true,
        background: '#a8d4e4'
      })
      const svg = await exporter.exportSvgAsync(this.graphComponent)
      await FileSaveSupport.save(SvgExport.exportSvgString(svg), 'graph.svg')
    })
  }
}
