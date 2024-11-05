module.exports = {
  // Define que o preset usado será o do `ts-jest` para suporte a TypeScript
  preset: 'ts-jest',
  
  // Define o ambiente de teste como Node.js, já que este é um projeto backend
  testEnvironment: 'node',

  // Caminho para os diretórios de testes
  roots: ['<rootDir>/src'],

  // Ignorar arquivos dentro do diretório 'dist' (gerado pelo TypeScript após build)
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  // Mapeamento de extensões que o Jest deve reconhecer
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Especifica os padrões dos arquivos de teste
  testMatch: ['**/*.test.ts'],

  // Transforma arquivos TypeScript usando o `ts-jest`
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // Limpeza e restabelecimento dos mocks antes de cada teste
  clearMocks: true,

  // Geração de relatório de cobertura de testes
  collectCoverage: true,

  // Extensões de arquivos para os quais a cobertura de código será coletada
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts', // Ignora arquivos de definição de tipos
  ],

  // Diretório onde o relatório de cobertura será gerado
  coverageDirectory: 'coverage',

  // Define os "providers" que geram relatórios de cobertura
  coverageReporters: ['text', 'lcov'],

  // Definições específicas do TypeScript
  globals: {
    'ts-jest': {
      isolatedModules: true, // Melhora a performance ao ignorar o checagem de tipos durante o teste
    },
  },
};
