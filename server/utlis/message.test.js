var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object',() => {

    var from = 'Admin';
    var text = 'sunil';
    var message = generateMessage(from,text)
    expect(message).toMatchObject({from,text});    

  });
});