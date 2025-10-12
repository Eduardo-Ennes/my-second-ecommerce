import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  // Quais extensões de arquivo o Jest deve entender como módulos
  moduleFileExtensions: ['ts', 'tsx', 'js'],

  // Mapeia os aliases do tsconfig para o Jest
  // Ex.: "@utils/*" -> "<rootDir>/src/utils/*"
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  // Regex para identificar arquivos de teste
  // Aqui, arquivos que terminam com ".spec.ts" serão executados como testes
  testRegex: '.*\\.spec\\.ts$',

  // Transformação de arquivos antes de executar os testes
  // Permite que Jest entenda TypeScript usando ts-jest
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },

  // Quais arquivos devem ser analisados para cobertura de testes
  // Aqui, todos os arquivos .ts e .js
  collectCoverageFrom: ['**/*.(t|j)s'],

  // Diretório onde o relatório de cobertura será salvo
  coverageDirectory: '../coverage',

  // Ambiente de execução dos testes
  // 'node' é ideal para backend; para frontend/React poderia usar 'jsdom'
  testEnvironment: 'node',

  // Configurações adicionais (opcional)
  // verbose: true, // Mostra cada teste individual no console
  // bail: true,    // Para no primeiro erro de teste
}
