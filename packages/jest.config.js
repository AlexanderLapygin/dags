module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '.(ts|tsx)$': 'ts-jest/dist' },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
}
