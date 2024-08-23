/// <reference types="cypress" />

describe('Numerator and denominator tests', () => {
    beforeEach(() => {
      cy.visit('http://sitename/calculate');
    });
    it('TC1', () => {
      const numerator = '25';
      const denominator = '5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
    
    it('2', () => {
      const numerator = '5';
      const denominator = '4';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
  
    it('3', () => {
      const numerator = '0';
      const denominator = '5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
  
    it('4', () => {
      const numerator = '5';
      const denominator = '0';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Infinity');
      });
    });
  
    it('5', () => {
      const numerator = '-5';
      const denominator = '5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
  
    it('6', () => {
      const numerator = '5';
      const denominator = '-5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
  
    it('7', () => {
      const numerator = '555555';
      const denominator = '5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('The numerator has more than five characters');
      });
    });
  
    it('8', () => {
      const numerator = '5';
      const denominator = '555555';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('The denominator has more than five characters');
      });
    });
  
    it('9', () => {
      const numerator = null;
      const denominator = null;
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Missing values');
      });
    });
  
    it('10', () => {
      const numerator = '   ';
      const denominator = '   ';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Missing values');
      });
    });
  
    it('11', () => {
      const numerator = '$_!';
      const denominator = '$_!';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Entering an incorrect data type');
      });
    });
  
    it('12', () => {
      const numerator = 'test';
      const denominator = 'test';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Entering an incorrect data type');
      });
    });
  
    it('13', () => {
      const numerator = '1 2 3 4 5';
      const denominator = '1 2 3 4 5'; 
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Entering more than five characters');
      });
    });
  
  });
  //Тесты на результат
  describe('Tests to verify the correctness of the answer', () => {
    beforeEach(() => {
      cy.visit('http://sitename/calculate');
    });
    it('1', () => {
      const numerator = '25';
      const denominator = '5';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.eq(parseFloat(numerator) / parseFloat(denominator));
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
      });
    });
    it('4', () => {
      const numerator = '5';
      const denominator = '0';
    
      cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denominator: denominator
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Infinity');
      });
    });
  });
  