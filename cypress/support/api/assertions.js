class Assertions{
shouldHaveStatus(response, status){
    expect(response.status, `status is ${status}`).to.eq(status)
}
  //its('status').should('eq', 201)
  validateContractof(response, schema){
    return cy.wrap(response.body).should(
      schema
    )
  }
  shouldBookingIdNotNull(response){
    expect(response.body.bookingid, 'bookingid exists').to.not.be.null;
  }
  shouldHaveDefaultHeaders(response){
    expect(response.headers, 'default headers validations').to.include({
      server:	'Cowboy',
      connection:	'keep-alive',
      'x-powered-by': 'Express'	
    })
  }
  shouldHaveContentTypeAppJson(response){
    expect(response.headers, 'contet type include').to.include({
      'content-type':	'application/json; charset=utf-8'
    })
  }
  shouldDurationBeFast(response){
    expect(response.duration, 'duration').lessThan(900);
  }

  
}

export default new Assertions();