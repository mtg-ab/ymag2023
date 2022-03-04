const config = require('./gulpconfig.js');

module.exports = function(plop) {
  //Create your generators here
  plop.setGenerator('module', {
    actions: [
      {
        abortOnFail: true,
        path: `${config.dirs.modules}/{{dashCase name}}.module/meta.json`,
        templateFile: 'generators/module/meta.json',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: `${config.dirs.modules}/{{dashCase name}}.module/module.html`,
        templateFile: 'generators/module/module.html',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: `${config.dirs.modules}/{{dashCase name}}.module/fields.json`,
        templateFile: 'generators/module/fields.json',
        type: 'add',
      },
      {
        abortOnFail: true,
        path: `${config.dirs.scss}/modules/{{dashCase name}}.scss`,
        templateFile: 'generators/module/module.scss',
        type: 'add',
      },
    ],
    description: 'Generate HubSpot module',
    prompts: [
      {
        message: 'What is your module name?',
        name: 'name',
        type: 'input',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        },
      },
    ],
  });
};
