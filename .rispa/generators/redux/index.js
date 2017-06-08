import path from 'path'

const generator = {
  description: 'Generator for redux folder sctructure',
  prompts: [],
  actions: () => ([
    {
      type: 'add',
      path: './redux/modules/reducer.js',
      templateFile: './reducer.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

export default generator
