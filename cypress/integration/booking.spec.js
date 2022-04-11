/// <reference types="cypress" />
import req from '../support/api/requests'
import schemas from '../support/api/schemas';
import assertions from '../support/api/assertions';


context('Booking', () => {

  before(() => {
    req.doAuth()
    req.postBooking()
    
  });

  it('Validar o contrato do GetBooking @contract', () => {
    ///https://treinamento-api.herokuapp.com/booking/1
   req.getBooking().then(getBookingResponse => {
     assertions.validateContractof(getBookingResponse, schemas.getBookingSchema())
      
    })
  });

  it('Criar uma reserva @functional', () => {
    req.postBooking().then(postBookingResponse => {
      assertions.shouldHaveStatus(postBookingResponse, 200)
      assertions.shouldBookingIdNotNull(postBookingResponse)
      assertions.shouldHaveDefaultHeaders(postBookingResponse)
      assertions.shouldHaveContentTypeAppJson(postBookingResponse)
      assertions.shouldDurationBeFast(postBookingResponse)
    })
  });

  it('Tentar editar uma reserva sem token @functional', () => {
   req.postBooking().then(postBookingResponse => {

    req.updateBookingWithoutBooking(postBookingResponse).then(putBookingResponse => {
      assertions.shouldHaveStatus(putBookingResponse, 403)
    })
   })
  });

  it('Tentar editar uma reserva com sucesso @functional', () => {
    req.postBooking().then(postBookingResponse => {
     req.updateBooking(postBookingResponse).then(putBookingResponse => {
       assertions.shouldHaveStatus(putBookingResponse, 200)
     })
    })
   });
 
it('Tentar excluir uma reserva com sucesso @functional', () => {
  req.postBooking().then(postBookingResponse => {
    req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
      assertions.shouldHaveStatus(deleteBookingResponse, 201)
    })
  })
});

it('Tentar  alterar uma reserva inexistente @functional', () => {
  req.updateBookingDoesnNotExist().then(updateBookingDoesnNotExistResponse => {
   req.updateBooking(updateBookingDoesnNotExistResponse).then(putBookingResponse => {
     assertions.shouldHaveStatus(putBookingResponse, 405)
   })
  })
 });

 it('Tentar alterar uma reserva com token inválido (403) @functional', () => {
  req.updateBookingWithoutToken().then(updateBookingWithoutTokenResponse => {
   req.updateBookingWithoutToken(updateBookingWithoutTokenResponse).then(putBookingResponse => {
     assertions.shouldHaveStatus(putBookingResponse, 403)
   })
  })
 });

 it('Tentar excluir uma reserva inexistente (405) @functional', () => {
  req.deleteBookingNotExist().then(deleteBookingNotExistResponse => {
    req.deleteBookingNotExist(deleteBookingNotExistResponse).then(deleteBookingResponse => {
      assertions.shouldHaveStatus(deleteBookingResponse, 405)
    })
  })
});


it('Tentar excluir uma reserva sem token (403) @functional', () => {
  req.deleteBookingWithoutToken().then(deleteBookingWithoutTokenResponse => {
    req.deleteBookingWithoutToken(deleteBookingWithoutTokenResponse).then(deleteBookingResponse => {
      assertions.shouldHaveStatus(deleteBookingResponse, 403)
    })
  })
});

it('Tentar excluir uma reserva sem token (403) @functional', () => {
  req.deleteBookingInvalidToken().then(deleteBookingInvalidTokenResponse => {
    req.deleteBookingInvalidToken(deleteBookingInvalidTokenResponse).then(deleteBookingResponse => {
      assertions.shouldHaveStatus(deleteBookingResponse, 403)
    })
  })
});


});
