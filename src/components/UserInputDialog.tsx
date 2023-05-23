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

import React, { Component } from 'react'
import './UserInputDialog.scss'

interface UserInputDialogProps {}
interface UserInputDialogState {
  show: boolean
  config: UserInputConfiguration
}

type UserInputConfiguration = {
  query: string
  defaultText: string | null
  placeholder: string | null
}

export default class UserInputDialog extends Component<
  UserInputDialogProps,
  UserInputDialogState
> {
  private readonly divRef
  private readonly inputRef
  private $promise: Promise<string> | null = null
  private $resolve: ((value: string) => void) | null = null

  constructor(props: UserInputDialogProps) {
    super(props)
    this.divRef = React.createRef<HTMLDivElement>()
    this.inputRef = React.createRef<HTMLInputElement>()
  }

  static async open(config: UserInputConfiguration): Promise<string> {
    const element = document.getElementById('user-input-dialog') as any
    if (element) {
      const dialog = element['data-user-input-dialog'] as UserInputDialog
      if (dialog) {
        return dialog.open(config)
      }
    }
    return new Promise((resolve) => null)
  }

  async componentDidMount(): Promise<void> {
    this.setState({ show: false })
    ;(this.divRef.current as any)['data-user-input-dialog'] = this
  }

  private async open(config: UserInputConfiguration): Promise<string> {
    this.setState({ show: true, config })
    this.inputRef.current!.value =
      config.defaultText != null ? config.defaultText : ''
    if (!this.$promise) {
      this.$promise = new Promise((resolve) => {
        this.$resolve = resolve
      })
    }
    return this.$promise!
  }

  private commit(s: string) {
    if (this.$resolve) {
      this.$resolve(s)
    }
    this.$promise = null
    this.$resolve = null
  }

  private submit() {
    this.commit(this.inputRef.current!.value)
    this.setState({ show: false })
  }

  private cancel() {
    this.commit('')
    this.setState({ show: false })
  }

  render() {
    return (
      <div
        className="user-input-container"
        style={{ display: this.state?.show ? 'block' : 'none' }}
        id="user-input-dialog"
        ref={this.divRef}
      >
        <div className="user-input-title">
          User Input
          <div className="spacer" />
        </div>
        <div className="user-input-text">
          <p>{this.state?.config?.query}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              this.submit()
            }}
          >
            <div className="user-input">
              <input
                placeholder={this.state?.config?.placeholder!}
                type="text"
                ref={this.inputRef}
              />
            </div>
          </form>
        </div>
        <div className="user-input-actions">
          <div className="spacer"></div>
          <button
            type="button"
            className="user-input-button"
            onClick={this.cancel.bind(this)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="user-input-button"
            onClick={this.submit.bind(this)}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}
