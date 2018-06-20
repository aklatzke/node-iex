import { expect } from 'chai'
import iex from '../src'

describe('Module', function () {
  it('Should be an object', function(){
    expect(iex).to.be.an('object');
  })

  it('Should expose HTTP and Websocket APIs', function () {
    expect(iex).to.have.all.keys(['ws', 'http']);
  })
})
