"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let SocketGateway = (() => {
    let _classDecorators = [(0, websockets_1.WebSocketGateway)({ namespace: 'wakttu' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _server_decorators;
    let _server_initializers = [];
    let _handleMessage_decorators;
    let _handleDM_decorators;
    let _handleEnter_decorators;
    let _handleExit_decorators;
    let _handleStatus_decorators;
    var SocketGateway = _classThis = class {
        constructor() {
            this.server = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _server_initializers, void 0));
            this.clients = {};
        }
        handleConnection(client) {
            console.log(`connect: ${client.id}`);
            this.clients[client.id] = client.id;
            console.log(this.clients);
        }
        afterInit() {
            console.log('socket is open!');
        }
        handleDisconnect(client) {
            console.log(`disconnect: ${client.id}`);
            delete this.clients[client.id];
        }
        handleMessage(data, client) {
            client.emit('message', '이게오네');
        }
        handleDM(data, client) {
            console.log('dm');
            this.server.to(client.id).emit('dm', data);
        }
        handleEnter(roomId, client) {
            client.join(roomId);
            this.server.to(roomId).emit('enter', `${client.id}이 입장`);
        }
        handleExit(roomId, client) {
            console.log(roomId);
            client.leave(roomId);
            this.server.to(roomId).emit('exit', `${client.id}이 퇴장`);
        }
        handleStatus() {
            console.log(this.server.sockets);
        }
    };
    __setFunctionName(_classThis, "SocketGateway");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('message')];
        _handleDM_decorators = [(0, websockets_1.SubscribeMessage)('dm')];
        _handleEnter_decorators = [(0, websockets_1.SubscribeMessage)('enter')];
        _handleExit_decorators = [(0, websockets_1.SubscribeMessage)('exit')];
        _handleStatus_decorators = [(0, websockets_1.SubscribeMessage)('status')];
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: obj => "handleMessage" in obj, get: obj => obj.handleMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDM_decorators, { kind: "method", name: "handleDM", static: false, private: false, access: { has: obj => "handleDM" in obj, get: obj => obj.handleDM }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleEnter_decorators, { kind: "method", name: "handleEnter", static: false, private: false, access: { has: obj => "handleEnter" in obj, get: obj => obj.handleEnter }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleExit_decorators, { kind: "method", name: "handleExit", static: false, private: false, access: { has: obj => "handleExit" in obj, get: obj => obj.handleExit }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleStatus_decorators, { kind: "method", name: "handleStatus", static: false, private: false, access: { has: obj => "handleStatus" in obj, get: obj => obj.handleStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: obj => "server" in obj, get: obj => obj.server, set: (obj, value) => { obj.server = value; } }, metadata: _metadata }, _server_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SocketGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SocketGateway = _classThis;
})();
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map