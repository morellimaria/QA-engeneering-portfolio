<reference types="cypress" />

describe('contactInfo', () => {
    beforeEach(() => {
        cy.visit('https://byndyusoft.com');
    })
  
    it('1', () => {
        cy.get('.btn btn--lg btn--info js-popup-callback-show').should('be.visible'); // просмотр кнопки "Заказать призентацию"
    })
  
    it('2', () => {
        cy.get('.btn btn--lg btn--info js-popup-callback-show').click(); // нажатие на кнопку "Заказать призентацию"
    })
  
    it('3', () => {
        cy.get('.popup-callback__content').should('be.visible'); // просмотр элемента поп-апа 
        cy.get('.popup-callback__contacts-tg').should('be.visible'); // просмотр элемента поп-апа 
        cy.get('.popup-callback__contacts-tg').should(answer);
        let answer;
        if (href == 'https://t.me/alexanderbyndyu'){
        } else alert ('incorrectURL');
    })
  })