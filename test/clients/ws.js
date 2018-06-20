import { expect } from 'chai'
import ws, { bootstrapDeepSocket, bootstrapSocket } from '../../src/clients/ws';

describe("WS Client", function(){
    it("Should expose specific methods", function(){
        expect(ws).to.be.an('object');
        expect(ws).to.have.all.keys(["tops", "last", "deep"]);
    })

    it("Should expose keys that are functions", function(){
        expect(ws.tops).to.be.a("function");
        expect(ws.last).to.be.a("function");
        expect(ws.deep).to.be.a("function");
    })

    it("Should expose keys that when run result in promises", function(){
        expect(ws.tops()).to.be.a('promise');
        expect(ws.last()).to.be.a('promise');
        expect(ws.deep()).to.be.a('promise');
    })

    it("Deep key should result in functioning promise and return socket", function(){
        return ws.deep().then( socket => {
            expect(socket).to.be.an('object');
            expect(socket).to.include.key('io');
        } )
    })

    it("Tops key should result in functioning promise and return socket", function () {
        return ws.tops().then(socket => {
            expect(socket).to.be.an('object');
            expect(socket).to.include.key('io');
        })
    })

    it("Last key should result in functioning promise and return socket", function () {
        return ws.last().then(socket => {
            expect(socket).to.be.an('object');
            expect(socket).to.include.key('io');
        })
    })
})

describe("bootstrapSocket", function(){
    let socketMock = {
        emit: () => {}
    }

    it("Should take a socket and add the subscribe and unsubscribe methods", function(){
        expect(socketMock).to.not.include.key('subscribe');
        expect(socketMock).to.not.include.key('unsubscribe');

        let socket = bootstrapSocket(socketMock);
        expect(socket).to.include.key('subscribe');
        expect(socket).to.include.key('unsubscribe');
    })
})

describe("bootstrapDeepSocket", function () {
    let socketMock = {
        emit: () => {}
    }

    it("Should take a socket and add the subscribe and unsubscribe methods", function () {
        expect(socketMock).to.not.include.key('subscribe');
        expect(socketMock).to.not.include.key('unsubscribe');

        let socket = bootstrapSocket(socketMock);
        expect(socket).to.include.key('subscribe');
        expect(socket).to.include.key('unsubscribe');
    })
})