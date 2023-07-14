"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const database_1 = require("../database");
class UserQuery {
    constructor() {
        (() => __awaiter(this, void 0, void 0, function* () {
            this.pool = yield database_1.dbServer;
        }))();
    }
    getSingleUserQuery(eid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec getEmployeeById @eid="' + eid + '"');
        });
    }
    getUsersQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec getAllEmployee');
        });
    }
    addEmployeeQuery(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec insertEmployee @id="' + userData.id + '", @name="' + userData.name + '", @age="' + userData.age + '", @city="' + userData.city + '", @salary="' + userData.salary + '"');
        });
    }
    deleteEmployeeQuery(did) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec deleteEmployeeById @did="' + did + '"');
        });
    }
    updateEmployeeQuery(uid, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec updateEmployeeById @uid="' + uid + '", @uname="' + userData.name + '", @uage="' + userData.age + '", @ucity="' + userData.city + '", @usalary="' + userData.salary + '"');
        });
    }
    addUserQuery(data, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec insertUser @iUsername="' + data.username + '", @iEmail="' + data.email + '", @iPassword="' + hashedPassword + '"     ');
        });
    }
    loginUserQuery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec loginUser @lemail="' + email + '" ');
        });
    }
    updateUserQuery(uid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.query('exec updateUserById @usid="' + uid + '", @usname="' + data.username + '", @uspassword="' + data.password + '" ');
        });
    }
}
exports.UserQuery = UserQuery;
