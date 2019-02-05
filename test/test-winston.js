const { SPLAT } = require('triple-beam');
var rewire = require('rewire');


describe('Test winston-transport.js', function () {
    describe('Test parameter forwarding', function () {

        var transport;
        var logger = rewire("../index.js");
        var catchedArgs;

        before(function () {
            logger.__set__("logMessage", function() {
                catchedArgs = Array.prototype.slice.call(arguments);
            });

            transport = logger.createWinstonTransport();
        });

        after(function () {

        });

        it('Test log method (simple message)', function () {
           
            var info = {};
            info.level = "error";
            info.message = "test"

            transport.log(info);

            catchedArgs.length.should.equal(2);
            catchedArgs[0].should.equal("error");
            catchedArgs[1].should.equal("test");
        });

        it('Test log method (message with additional variables)', function () {
           
            var info = {};
            info.level = "error";
            info.message = "test %d %s"
            info[SPLAT] = [42, "abc"]

            transport.log(info);

            catchedArgs.length.should.equal(4);
            catchedArgs[0].should.equal("error");
            catchedArgs[1].should.equal("test %d %s");
            catchedArgs[2].should.equal(42);
            catchedArgs[3].should.equal("abc");
        });
    });

    describe('Test option initialization', function () {

        var logger = require("../index.js");

        it('Test default initialization', function () {
            var transport = logger.createWinstonTransport();
            transport.level.should.equal("info");
        });

        it('Test custom initialization', function () {
            var transport = logger.createWinstonTransport({level: "error"});
            transport.level.should.equal("error");
        });

        it('Test incomplete initialization', function () {
            var transport = logger.createWinstonTransport({});
            transport.level.should.equal("info");
        });
    });
});