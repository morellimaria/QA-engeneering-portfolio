/// <reference types="cypress" />
function calculateAndVerify(numerator, denominator) {
  cy.get('.classInputNumerator').type(numerator);
  cy.get('.classInputDenumerator').type(denominator);
  cy.get('.classButtonCalculate').click();
  cy.get('.classResult').should('be.visible');
  cy.get('.classResult').invoke('text').then((text) => {
    const result = parseFloat(text);
    const expectedResult = parseFloat(numerator) / (parseFloat(denominator));
    expect(result).to.equal(expectedResult);
  });
}
function calculateError(numerator, denominator) {
  cy.get('.classInputNumerator').type(numerator);
  cy.get('.classInputDenumerator').type(denominator);
  cy.get('.classButtonCalculate').click();
  cy.get('.classResult').should('be.visible');
  cy.get('.classResult').invoke('text').should('equal','Error')
}

describe('Numerator and denominator tests', () => {
  beforeEach(() => {
    cy.visit('http://sitename/calculate');
  });
  //TC1 Вычисление с вводом целого числа в numerator не более 5 чисел
  it('TC1_V1', () => {
    calculateAndVerify('8', '4');
  });
  it('TC1_V2', () => {
    calculateAndVerify('20000', '5');
  });

  //TC2 Вычисление с вводом целого числа в denumirilor не более 5 чисел
  it('TC2_V1', () => {
    calculateAndVerify('8', '4');
  });
  it('TC2_V2', () => {
    calculateAndVerify('20000', '10000');
  });

  //TC3 Вычисление с вводом дробного числа, с точкой в виде разделителя, в numerator не более 5 чисел
  it('TC3_V1', () => {
    calculateAndVerify('8.5', '5');
  });
  it('TC3_V2', () => {
    calculateAndVerify('2.005', '10000');
  });

  //TC4 Вычисление с вводом дробного числа, с точкой в виде разделителя, в denominator не более 5 чисел
   it('TC4_V1', () => {
    calculateAndVerify('22', '5.5');
  });
  it('TC4_V2', () => {
    calculateAndVerify('5', '2.005');
  }); 

  //TC5 Вычисление с вводом дробного числа, с запятой в виде разделителя, в numerator не более 5 чисел
  it('TC5_V1', () => {
    calculateAndVerify('8,5', '5');
  });
  it('TC5_V2', () => {
    calculateAndVerify('2,005', '10000');
  });

  //TC6 Вычисление с вводом дробного числа, с запятой в виде разделителя, в denominator не более 5 чисел
  it('TC6_V1', () => {
   calculateAndVerify('22', '5,5');
  });
  it('TC6_V2', () => {
   calculateAndVerify('5', '2,005');
  });

  //TC7 Вычисление результата при numerator=0
  it('TC7_V1', () => {
    calculateAndVerify('0', '5');
  });

  //TC8 Вычисление результата при denominator=0
  it('TC8_V1', () => {
    calculateError('5', '0');
  });

  //TC9 Вычисление результата при целом отрицательном numerator
  it('TC9_V1', () => {
    calculateAndVerify('-4', '2');
  });
  it('TC9_V2', () => {
    calculateAndVerify('-1000', '5');
  });

  //TC10 Вычисление результата при целом отрицательном denominator
  it('TC10_V1', () => {
    calculateAndVerify('4', '-2');
  });
  it('TC10_V2', () => {
    calculateAndVerify('5', '-1000');
  });

  //TC11 Вычисление результата при дробном отрицательном numerator
  it('TC11_V1', () => {
    calculateAndVerify('-4.4', '2');
  });
  it('TC11_V2', () => {
    calculateAndVerify('-1.010', '5');
  });
  
  //TC12 Вычисление результата при дробном отрицательном denominator
  it('TC12_V1', () => {
    calculateAndVerify('4', '-2.2');
  });
  it('TC12_V2', () => {
    calculateAndVerify('5', '-1.010');
  });

  //TC13 Вычисление результата с вводом дробного десятичного/сотого numerator
  it('TC13_V1', () => {
    calculateAndVerify('0.4', '2');
  });
  it('TC13_V2', () => {
    calculateAndVerify('0.004', '2');
  });

  //TC14 Вычисление результата с вводом дробного десятичного/сотого denominator
  it('TC14_V1', () => {
    calculateAndVerify('4', '0.2');
  });
  it('TC14_V2', () => {
    calculateAndVerify('5', '0.010');
  });

  //TC15 Вычисление с вводом целого числа более 5 символов в numerator
  it('TC15_V1', () => {
    calculateError('123456', '2');
  });

  //TC16 Вычисление с вводом целого числа более 5 символов в denominator
  it('TC16_V1', () => {
    calculateError('2', '123456');
  });

  //TC17 Отправка пустого значения в numerator
  it('TC17_V1', () => {
    calculateError('', '5');
  });
  
  //TC18 Отправка пустого значения в denominator
  it('TC18_V1', () => {
    calculateError('5', '');
  });

  //TC19 Вычисление результата при вводе пробелов в numerator
  it('TC19_V1', () => {
    calculateError('   ', '5');
  });

  //TC20 Вычисление результата при вводе пробелов в denominator
  it('TC20_V1', () => {
    calculateError('5', '   ');
  });

  //TC21 Вычисление результата при вводе цифр через пробелы в numerator (Основываясь на предположении, что пробелы не учитываются)
  it('TC21_V1', () => {
    calculateAndVerify('1 0 0 1 0', '5');
  });

  //TC22 Вычисление результата при вводе цифр через пробелы в denominator (Основываясь на предположении, что пробелы не учитываются)
  it('TC22_V1', () => {
    calculateAndVerify('10', '1 0 0 1 0');
  });

  //TC23 Вычисление результата при вводе только спецсимволов в numerator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
  it('TC23_V1', () => {
    calculateError('@#$', '2');
  });

  //TC24 Вычисление результата при вводе только спецсимволов в denominator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
  it('TC24_V1', () => {
    calculateError('2', '@#$');
  });

  //TC25 Вычисление результата при вводе спецсимволов в numerator и denominator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
  it('TC25_V1', () => {
    calculateError('@#$', '@#$');
  });
  
  //TC26 Вычисление результата при вводе букв в numerator
  it('TC26_V1', () => {
    calculateError('test', '5');
  });

  //TC27 Вычисление результата при вводе букв в denominator
  it('TC27_V1', () => {
    calculateError('5', 'test');
  });

  //TC28 Вычисление результата при вводе букв в numerator и denominator
  it('TC28_V1', () => {
    calculateError('test', 'test');
  });

  //TC29 Вычисление результата при вводе цифр до которых идут пробелы (Основываясь на предположении, что пробелы не учитываются)
  it('TC29_V1', () => {
    calculateAndVerify('     4', '2');
  });
  it('TC29_V2', () => {
    calculateAndVerify(' 10010', '5');
  });
  it('TC29_V3', () => {
    calculateAndVerify('4', '     2');
  });
  it('TC29_V4', () => {
    calculateAndVerify('10', ' 50050');
  });

  //TC30 Вычисление результата при вводе цифр после которых идут пробелы (Основываясь на предположении, что пробелы не учитываются)
  it('TC30_V1', () => {
    calculateAndVerify('4      ', '2');
  });
  it('TC30_V2', () => {
    calculateAndVerify('10010 ', '5');
  });
  it('TC30_V3', () => {
    calculateAndVerify('4', '2     ');
  });
  it('TC30_V4', () => {
    calculateAndVerify('10', '50050 ');
  });

});


//Тесты на результат
describe('Tests to verify the correctness of the answer', () => {
  beforeEach(() => {
    cy.visit('http://sitename/calculate');
  });

  //TC31 Вычисление результата с целым числом
  it('TC31', () => {
    calculateAndVerify('5', '5');
  });

  //TC32 Вычисление результата с дробным числом
  it('TC32_V1', () => {
    calculateAndVerify('3', '2');
  });
  it('TC32_V2', () => {
    calculateAndVerify('5', '3');
  });

  //TC33 Вычисление результата с дробным десятичным/сотым числом
  it('TC33_V1', () => {
    calculateAndVerify('1', '5');
  });
  it('TC33_V2', () => {
    calculateAndVerify('2', '3');
  });

  //TC34 Вычисление результата = 1
  it('TC34', () => {
    calculateAndVerify('5', '5');
  });

  //TC35 Вычисление результата = 0
  it('TC35', () => {
    calculateAndVerify('0', '2');
  });

  //TC36 Вычисление отрицательного результата
  it('TC36_V1', () => {
    calculateAndVerify('-4', '2');
  });
  it('TC36_V2', () => {
    calculateAndVerify('-4000', '2');
  });
  it('TC36_V3', () => {
    calculateAndVerify('4', '-2');
  });
  it('TC36_V4', () => {
    calculateAndVerify('4', '-2000');
  });
});