// https://stackoverflow.com/questions/74563652/cypress-error-in-commands-ts-argument-of-type-login-is-not-assignable-to-pa
// Solution pour lever l'erreur dans command.ts où 'login' est refusé par typescript
export {}
declare global {
    namespace Cypress {
        interface Chainable {
            login(email:string, password:string): Chainable<void>;
            newPdf(smallDescription: string, description: string): Chainable<void>;
        }
    }
}