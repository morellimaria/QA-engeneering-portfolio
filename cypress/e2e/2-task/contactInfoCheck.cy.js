import React from 'react';
import { mount } from '@cypress/react'; // или другой подходящий метод для монтирования компонентов
///<reference types="cypress" />
describe('contactInfo', () => {
    beforeEach(() => {
        cy.visit('https://byndyusoft.com');
    });

    it('should render contact info', () => {
        cy.get('.knowMore__container')
        .children('span').click()
        cy.get('.popup-callback__content').should('be.visible'); // просмотр элемента поп-апа 
        cy.get('.popup-callback__contacts-tg')
        .invoke('attr', 'href') // Получите значение атрибута href
        .should('equal', 'http://t.me/alexanderbyndyu'); // Замените на ожидаемый URL;
    });
});
