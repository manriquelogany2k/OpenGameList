System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AuthHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AuthHttp = (function () {
                function AuthHttp(http) {
                    this.http = null;
                    this.authKey = "auth";
                    this.http = http;
                }
                AuthHttp.prototype.get = function (url, opts) {
                    if (opts === void 0) { opts = {}; }
                    this.configureAuth(opts);
                    return this.http.get(url, opts);
                };
                AuthHttp.prototype.post = function (url, data, opts) {
                    if (opts === void 0) { opts = {}; }
                    this.configureAuth(opts);
                    return this.http.post(url, data, opts);
                };
                AuthHttp.prototype.put = function (url, data, opts) {
                    if (opts === void 0) { opts = {}; }
                    this.configureAuth(opts);
                    return this.http.put(url, data, opts);
                };
                AuthHttp.prototype.delete = function (url, opts) {
                    if (opts === void 0) { opts = {}; }
                    this.configureAuth(opts);
                    return this.http.delete(url, opts);
                };
                AuthHttp.prototype.configureAuth = function (opts) {
                    var i = localStorage.getItem(this.authKey);
                    if (i != null) {
                        var auth = JSON.parse(i);
                        console.log(auth);
                        if (auth.access_token != null) {
                            if (opts.headers == null) {
                                opts.headers = new http_1.Headers();
                            }
                            opts.headers.set("Authorization", "Bearer " + auth.access_token);
                        }
                    }
                };
                AuthHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthHttp);
                return AuthHttp;
            }());
            exports_1("AuthHttp", AuthHttp);
        }
    }
});
