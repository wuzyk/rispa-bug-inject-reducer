import React, { PureComponent } from 'react'
import { objectOf, object, string } from 'prop-types'

const loadChunksOnClient = () => {
  const chunks = window.RISPA_CHUNKS
  let loadedChunksCount = 0

  const chunkLoadedHandler = () => {
    loadedChunksCount += 1
    if (loadedChunksCount === chunks.length) {
      window.startApp()
    }
  }

  const loadChunk = chunk => {
    const script = document.createElement('script')
    script.src = chunk
    script.onload = chunkLoadedHandler
    document.body.appendChild(script)
  }

  if (chunks.length) {
    chunks.forEach(loadChunk)
  } else {
    window.startApp()
  }
}

class InitialState extends PureComponent {
  static propTypes = {
    state: string.isRequired,
  }

  render() {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.RISPA_INITIAL_STATE=${this.props.state};`,
        }}
        charSet='UTF-8'
      />
    )
  }
}

class Html extends PureComponent {
  static propTypes = {
    assets: objectOf(object),
    content: string,
    initialState: string,
  }

  render() {
    const { assets, content, initialState } = this.props

    const bootstrapAsset = assets.javascript.bootstrap
    const chunkAssets = Object.values(assets.javascript).filter(
      chunk => !/bootstrap.js/.test(chunk)
    )

    return (
      <html lang='ru-RU'>
        <head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {Object.keys(assets.styles).map(style => (
            <link
              href={assets.styles[style]}
              key={style}
              media='screen, projection'
              rel='stylesheet'
              type='text/css'
              charSet='UTF-8'
            />
          ))}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{ __html: content || '' }} />
          {initialState && <InitialState state={initialState} />}
          <script src={bootstrapAsset} charSet='UTF-8' />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.RISPA_CHUNKS=${JSON.stringify(chunkAssets)};`,
            }}
            charSet='UTF-8'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(${loadChunksOnClient.toString()}());`,
            }}
            charSet='UTF-8'
          />
        </body>
      </html>
    )
  }
}

export default Html
