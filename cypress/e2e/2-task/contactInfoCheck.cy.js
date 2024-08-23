import React from 'react';
import { mount } from '@cypress/react'; // или другой подходящий метод для монтирования компонентов
///<reference types="cypress" />
describe('contactInfo', () => {
    beforeEach(() => {
        cy.visit('https://www.google.ru');
        cy.get('.gLFyf').type('Byndyusoft')
        .type('{enter}');
        cy.get('#search').should('be.visible');
        cy.get('#search a').first().invoke('removeAttr', 'target').click();
    });

    it('should render contact info', () => { 
        cy.origin('https://byndyusoft.com', () => {
        cy.get('.knowMore__container') 
        .children('span').click() 
        cy.get('.popup-callback__content').should('be.visible'); // просмотр элемента поп-апа  
        cy.get('.popup-callback__contacts-tg') 
        .invoke('attr', 'href') // Получите значение атрибута href 
        .should('equal', 'http://t.me/alexanderbyndyu');
        })
    });
});
