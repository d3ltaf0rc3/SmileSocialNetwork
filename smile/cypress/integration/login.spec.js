/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe("Login Page tests", () => {
    const wrongUsername = chance.string({ pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.", length: 7 });
    const wrongPassword = chance.string({ pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", length: 8 })

    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });

    it("page renders correctly", () => {
        cy.contains("Smile");
    });

    it("should throw error for invalid username", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type("invalid?!user");
        cy.get("input[name=password]").type("password");
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Username can only contain english letters, numbers, underscores and dots!");
    });

    it("should throw error for short username", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type("a");
        cy.get("input[name=password]").type("password");
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Username must be between 2 and 18 characters long!");
    });

    it("should throw error for invalid password", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type("valid_user");
        cy.get("input[name=password]").type("invalid/password");
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!");
    });

    it("should throw error for short password", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type("valid_user");
        cy.get("input[name=password]").type("short");
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Password must be between 8 and 18 characters long!");
    });

    it("should throw error for wrong user or password", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type(wrongUsername);
        cy.get("input[name=password]").type(wrongPassword);
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Wrong username or password!");
    });

    it("should login user", () => {
        cy.url().should("contain", "login");

        cy.get("input[name=username]").type("smile");
        cy.get("input[name=password]").type("creator@smile1");
        cy.solveGoogleReCAPTCHA();
        cy.get("button").click();

        cy.contains("Welcome to Smile");
    });
});