import fs from 'fs'
import path from 'path'

const generator = {
  description: 'Generator for redux module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should it be called?',
      default: 'items',
      validate: value => {
        if ((/.+/).test(value)) {
          if (fs.existsSync(path.resolve(process.cwd(), `./redux/modules/${value}`))) {
            return 'A redux module with this name already exists'
          }

          return true
        }

        return 'The name is required'
      },
    },
  ],
  actions: () => ([
    {
      type: 'add',
      path: './redux/modules/{{camelCase name}}/index.js',
      templateFile: './index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './redux/modules/{{camelCase name}}/selector.js',
      templateFile: './selector.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './redux/modules/{{camelCase name}}/index.test.js',
      templateFile: './index.test.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

export default generator
