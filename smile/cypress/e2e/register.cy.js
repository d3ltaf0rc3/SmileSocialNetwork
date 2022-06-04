/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Register Page tests', () => {
  const username = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.', length: 7 });
  const password = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_', length: 8 });

  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('page renders correctly', () => {
    cy.contains('Smile');
  });

  it('should throw error for invalid username', () => {
    cy.url().should('contain', 'register');

    cy.get('input[name=username]').type('invalid?user');
    cy.get('input[name=password]').type('password');
    cy.get('input[name=repeatPassword]').type('password');
    cy.solveGoogleReCAPTCHA();
    cy.get('button').click();

    cy.contains('Username can only contain english letters, numbers, underscores and dots!');
  });

  it('should throw error for invalid password', () => {
    cy.url().should('contain', 'register');

    cy.get('input[name=username]').type('valid_user');
    cy.get('input[name=password]').type('invalid/password');
    cy.get('input[name=repeatPassword]').type('invalid/password');
    cy.solveGoogleReCAPTCHA();
    cy.get('button').click();

    cy.contains('Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!');
  });

  it('should throw error for non-matching passwords', () => {
    cy.url().should('contain', 'register');

    cy.get('input[name=username]').type('valid_user');
    cy.get('input[name=password]').type('password1');
    cy.get('input[name=repeatPassword]').type('password2');
    cy.solveGoogleReCAPTCHA();
    cy.get('button').click();

    cy.contains('Both passwords must match!');
  });

  it('should throw error for taken username', () => {
    cy.url().should('contain', 'register');

    cy.get('input[name=username]').type('smile');
    cy.get('input[name=password]').type('password');
    cy.get('input[name=repeatPassword]').type('password');
    cy.solveGoogleReCAPTCHA();
    cy.get('button').click();

    cy.contains('Username already taken!');
  });

  it('should successfully register user', () => {
    cy.url().should('contain', 'register');

    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=repeatPassword]').type(password);
    cy.solveGoogleReCAPTCHA();
    cy.get('button').click();

    cy.contains('Welcome to Smile');
  });
});
