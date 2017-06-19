import path from 'path'

const generator = {
  description: 'Generator for feature plugin',
  prompts: [],
  actions: () => ([
    {
      type: 'add',
      path: './package.json',
      templateFile: './package.json.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './index.js',
      templateFile: './index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './registerModule.js',
      templateFile: './registerModule.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

export default generator
