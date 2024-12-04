module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',   // ignorar node_modules
    '.*\\.e2e\\.spec\\.ts$', // ignorar archivos que terminen en .e2e.spec.ts
    '.*\\.functional\\.spec\\.ts$', // ignorar archivos que terminen en .e2e.spec.ts
  ],
  globalSetup: 'jest-preset-angular/global-setup',
};
