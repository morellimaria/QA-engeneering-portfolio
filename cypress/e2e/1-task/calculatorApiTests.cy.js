/// <reference types="cypress" />
function calculateAndVerify(numerator, denominator){
    cy.request({
        method: 'POST',
        url: '/calculate',
        body: { 
          numerator: numerator,
          denominator: denominator,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        const expectedAnswer = parseFloat(numerator) / (parseFloat(denominator));
        expect(response.body.answer).to.eq(expectedAnswer);
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.empty;
    });
};
function calculationWithError(numerator, denomirator){
    cy.request({
        method: 'POST',
        url: '/calculate',
        body: {
          numerator: numerator,
          denomirator: denomirator,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('answer');
        expect(response.body.answer).to.be.empty;
  
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq(['Infinity', 'Missing values', 'Entering an incorrect data type', 'Entering more than five characters']);
      });
};

describe('Numerator and denominator tests', () => {
    beforeEach(() => {
      cy.visit('http://sitename/calculate');
    });
    //TC1 Вычисление с вводом целого числа в numerator не более 5 чисел
    it('TC1_V1', () => {
        calculateAndVerify('4','2');
    });
    it('TC1_V2', () => {
        calculateAndVerify('10010','5');
    });

    //TC2 Вычисление с вводом целого числа в denumirilor не более 5 чисел
    it('TC2_V1', () => {
        calculateAndVerify('4','2');
    });
    it('TC2_V2', () => {
        calculateAndVerify('20020','10010');
    });

    //TC3 Вычисление с вводом дробного числа, с точкой в виде разделителя, в denominator не более 5 чисел (основываясь на предположении, что точка засчитается как символ)
    it('TC2_V1', () => {
        calculateAndVerify('5.5','5');
    });
    it('TC2_V2', () => {
        calculateAndVerify('5.005','5');
    });

    //TC4 Вычисление с вводом дробного числа, с точкой в виде разделителя, в denominator не более 5 чисел (основываясь на предположении, что точка засчитается как символ)
    it('TC4_V1', () => {
        calculateAndVerify('11','5.5');
    });
    it('TC4_V2', () => {
        calculateAndVerify('5','2.005');
    });

    //TC5 Вычисление с вводом дробного числа, с запятой в виде разделителя, в numerator не более 5 чисел (основываясь на предположении, что запятая засчитается как символ)
    it('TC5_V1', () => {
        calculateAndVerify('4,4','2');
    });
    it('TC5_V2', () => {
        calculateAndVerify('4,004','2');
    }); 
  
    //TC6 Вычисление с вводом дробного числа, с запятой в виде разделителя, в denominator не более 5 чисел (основываясь на предположении, что запятая засчитается как символ)
    it('TC6_V1', () => {
        calculateAndVerify('11','5,5');
    });
    it('TC6_V2', () => {
        calculateAndVerify('5','2,005');
    }); 

    //TC7 Вычисление результата при numerator=0
    it('TC7_V1', () => {
        calculateAndVerify('0','5');
    });

    //TC8 Вычисление результата при denominator=0
    it('TC8_V1', () => {
        calculationWithError('5','0');
    });

    //TC9 Вычисление результата при целом отрицательном numerator (основываясь на предположении, что минус засчитается как символ)
    it('TC9_V1', () => {
        calculateAndVerify('-4','2');
    });
    it('TC9_V2', () => {
        calculateAndVerify('-1040','2');
    });

    //TC10 Вычисление результата при целом отрицательном denominator (основываясь на предположении, что минус засчитается как символ)
    it('TC10_V1', () => {
        calculateAndVerify('5','-15');
    });
    it('TC10_V2', () => {
        calculateAndVerify('5','1050');
    });

    //TC11 Вычисление результата при дробном отрицательном numerator (основываясь на предположении, что минус и точка засчитается как символ)
    it('TC11_V1', () => {
        calculateAndVerify('-5.5','5');
    });
    it('TC11_V2', () => {
        calculateAndVerify('-5.05','5');
    });

    //TC12 Вычисление результата при дробном отрицательном denominator  (основываясь на предположении, что минус и точка засчитается как символ)
    it('TC12_V1', () => {
        calculateAndVerify('2','-2.5');
    });
    it('TC12_V2', () => {
        calculateAndVerify('5','-1.05');
    });

    //TC13 Вычисление результата с вводом дробного десятичного/сотого numerator
    it('TC13_V1', () => {
        calculateAndVerify('0.4','2');
    });
    it('TC13_V2', () => {
        calculateAndVerify('0.025','5');
    });

    //TC14 Вычисление результата с вводом дробного десятичного/сотого denominator
    it('TC14_V1', () => {
        calculateAndVerify('2','0.5');
    });
    it('TC14_V2', () => {
        calculateAndVerify('5','0.005');
    });

    //TC15 Вычисление с вводом целого числа более 5 символов в numerator
    it('TC15_V1', () => {
        calculationWithError('101002','2');
    });

    //TC16 Вычисление с вводом целого числа более 5 символов в denominator
    it('TC16_V1', () => {
        calculationWithError('4','201202');
    });

    //TC17 Отправка пустого значения в numerator
    it('TC17_V1', () => {
        calculationWithError(null,'5');
    });

    //TC18 Отправка пустого значения в denominator
    it('TC18_V1', () => {
        calculationWithError('4',null);
    });

    //TC19 Вычисление результата при вводе пробелов в numerator
    it('TC19_V1', () => {
        calculationWithError('     ','5');
    });

    //TC20 Вычисление результата при вводе пробелов в denominator
    it('TC20_V1', () => {
        calculationWithError('4', '     ');
    });

    //TC21 Вычисление результата при вводе цифр через пробелы в numerator (Основываясь на предположении, что пробелы не учитываются)
    it('TC21_V1', () => {
        calculateAndVerify('4 0 4 0 4','2');
    });
    
    //TC22 Вычисление результата при вводе цифр через пробелы в denominator (Основываясь на предположении, что пробелы не учитываются)
    it('TC22_V1', () => {
        calculateAndVerify('5','5 0 0 5 5');
    });

    //TC23 Вычисление результата при вводе спецсимволов в numerator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
    it('TC23_V1', () => {
        calculationWithError('@#$', '4');
    });

    //TC24 Вычисление результата при вводе спецсимволов в denominator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
    it('TC24_V1', () => {
        calculationWithError('4', '@#$');
    });

    //TC25 Вычисление результата при вводе спецсимволов в numerator и denominator (Основываясь на предположении, что минус, точка и запятая доступны для использования)
    it('TC25_V1', () => {
        calculationWithError('@#$', '@#$');
    });

    //TC26 Вычисление результата при вводе букв в numerator
    it('TC26_V1', () => {
        calculationWithError('test', '5');
    });

    //TC27 Вычисление результата при вводе букв в denominator
    it('TC27_V1', () => {
        calculationWithError('5', 'test');
    });

    //TC28 Вычисление результата при вводе букв в numerator и denominator
    it('TC28_V1', () => {
        calculationWithError('test', 'test');
    });    

    //TC29 Вычисление результата при вводе цифр после которых идут пробелы (Основываясь на предположении, что пробелы не учитываются)
    it('TC29_V1', () => {
        calculateAndVerify('4     ', '2');
    }); 
    it('TC29_V2', () => {
        calculateAndVerify('10100 ', '5');
    }); 
    it('TC29_V3', () => {
        calculateAndVerify('4', '2     ');
    }); 
    it('TC29_V4', () => {
        calculateAndVerify('5', '10100 ');
    }); 

    //TC30 Вычисление результата при вводе цифр до которых идут пробелы (Основываясь на предположении, что пробелы не учитываются)
    it('TC29_V1', () => {
        calculateAndVerify('     4', '2');
    }); 
    it('TC29_V2', () => {
        calculateAndVerify(' 10100', '5');
    }); 
    it('TC29_V3', () => {
        calculateAndVerify('4', '     2');
    }); 
    it('TC29_V4', () => {
        calculateAndVerify('5', ' 10100');
    }); 

  });

  //Тесты на результат
  describe('Tests to verify the correctness of the answer', () => {
    beforeEach(() => {
      cy.visit('http://sitename/calculate');
    });

    // ТС31 Вычисление результата целым числом
     it('TC31_V1', () => {
        calculateAndVerify('4', '2');
    }); 
    it('TC31_V2', () => {
        calculateAndVerify('10100', '5');
    }); 

    // ТС32 Вычисление результата с дробным числом
    it('TC32_V1', () => {
        calculateAndVerify('4', '2');
    }); 
    it('TC32_V2', () => {
        calculateAndVerify('26', '8');
    }); 
    it('TC32_V3', () => {
        calculateAndVerify('25', '8');
    }); 

    // ТС33 Вычисление результата с дробным десятичным/сотым числом
    it('TC33_V1', () => {
        calculateAndVerify('2', '4');
    }); 
    it('TC33_V2', () => {
        calculateAndVerify('2', '3');
    }); 

    // ТС34 Вычисление результата = 1
    it('TC34_V1', () => {
        calculateAndVerify('2', '2');
    }); 

    // ТС35 Вычисление результата = 0
    it('TC35_V1', () => {
        calculateAndVerify('0', '5');
    }); 
 
    // ТС36 Вычисление отрицательного результата
    it('TC36_V1', () => {
        calculateAndVerify('-10', '5');
    }); 
    it('TC36_V2', () => {
        calculateAndVerify('-5000', '5');
    }); 
});
  