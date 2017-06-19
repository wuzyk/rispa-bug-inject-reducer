import path from 'path'

const activator = on => {
  on('init', (command, registry) => {
    if (command === 'storybook') {
      registry.add('storiesContexts', path.resolve(__dirname, '../src/components'))
    }
  })
}

export default activator
