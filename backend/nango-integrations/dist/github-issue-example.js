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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchData(nango) {
    return __awaiter(this, void 0, void 0, function () {
        var repos, _loop_1, _i, repos_1, repo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paginate(nango, '/user/repos')];
                case 1:
                    repos = _a.sent();
                    _loop_1 = function (repo) {
                        var issues, mappedIssues;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, paginate(nango, "/repos/".concat(repo.owner.login, "/").concat(repo.name, "/issues"))];
                                case 1:
                                    issues = _b.sent();
                                    // Filter out pull requests
                                    issues = issues.filter(function (issue) { return !('pull_request' in issue); });
                                    mappedIssues = issues.map(function (issue) { return ({
                                        id: issue.id,
                                        owner: repo.owner.login,
                                        repo: repo.name,
                                        issue_number: issue.number,
                                        title: issue.title,
                                        state: issue.state,
                                        author: issue.user.login,
                                        author_id: issue.user.id,
                                        body: issue.body,
                                        date_created: issue.created_at,
                                        date_last_modified: issue.updated_at
                                    }); });
                                    if (!(mappedIssues.length > 0)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, nango.batchSend(mappedIssues, 'GithubIssue')];
                                case 2:
                                    _b.sent();
                                    return [4 /*yield*/, nango.log("Sent ".concat(mappedIssues.length, " issues from ").concat(repo.owner.login, "/").concat(repo.name))];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, repos_1 = repos;
                    _a.label = 2;
                case 2:
                    if (!(_i < repos_1.length)) return [3 /*break*/, 5];
                    repo = repos_1[_i];
                    return [5 /*yield**/, _loop_1(repo)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: 
                // Return empty array with the model key to indicate success
                return [2 /*return*/, { GithubIssue: [] }];
            }
        });
    });
}
exports.default = fetchData;
function paginate(nango, endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var MAX_PAGE, results, page, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    MAX_PAGE = 100;
                    results = [];
                    page = 1;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, nango.get({
                            endpoint: endpoint,
                            params: {
                                limit: "".concat(MAX_PAGE),
                                page: "".concat(page)
                            }
                        })];
                case 2:
                    resp = _a.sent();
                    results = results.concat(resp.data);
                    if (resp.data.length == MAX_PAGE) {
                        page += 1;
                    }
                    else {
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, results];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9naXRodWItaXNzdWUtZXhhbXBsZS50cyIsInNvdXJjZXMiOlsiLi9naXRodWItaXNzdWUtZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQThCLFNBQVMsQ0FBQyxLQUFnQjs7Ozs7d0JBRXRDLHFCQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29CQUE1QyxLQUFLLEdBQUcsU0FBb0M7d0NBRXpDLElBQUk7Ozs7d0NBQ0kscUJBQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxpQkFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssY0FBSSxJQUFJLENBQUMsSUFBSSxZQUFTLENBQUMsRUFBQTs7b0NBQWhGLE1BQU0sR0FBRyxTQUF1RTtvQ0FFcEYsMkJBQTJCO29DQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztvQ0FFdEQsWUFBWSxHQUFrQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQzt3Q0FDckQsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO3dDQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7d0NBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3Q0FDZixZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU07d0NBQzFCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzt3Q0FDbEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3dDQUNsQixNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO3dDQUN4QixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO3dDQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7d0NBQ2hCLFlBQVksRUFBRSxLQUFLLENBQUMsVUFBVTt3Q0FDOUIsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLFVBQVU7cUNBQ3ZDLENBQUMsRUFac0QsQ0FZdEQsQ0FBQyxDQUFDO3lDQUVBLENBQUEsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsRUFBdkIsd0JBQXVCO29DQUN2QixxQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsRUFBQTs7b0NBQWxELFNBQWtELENBQUM7b0NBQ25ELHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBUSxZQUFZLENBQUMsTUFBTSwwQkFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGNBQUksSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUE7O29DQUEzRixTQUEyRixDQUFDOzs7Ozs7MEJBdEI5RSxFQUFMLGVBQUs7Ozt5QkFBTCxDQUFBLG1CQUFLLENBQUE7b0JBQWIsSUFBSTtrREFBSixJQUFJOzs7OztvQkFBSSxJQUFLLENBQUE7OztnQkEwQnRCLDREQUE0RDtnQkFDNUQsc0JBQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUM7Ozs7Q0FDOUI7QUFoQ0QsNEJBZ0NDO0FBRUQsU0FBZSxRQUFRLENBQUMsS0FBZ0IsRUFBRSxRQUFnQjs7Ozs7O29CQUNoRCxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUVqQixPQUFPLEdBQVUsRUFBRSxDQUFDO29CQUNwQixJQUFJLEdBQUcsQ0FBQyxDQUFDOzs7eUJBQ04sSUFBSTtvQkFDTSxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDOzRCQUN6QixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsTUFBTSxFQUFFO2dDQUNKLEtBQUssRUFBRSxVQUFHLFFBQVEsQ0FBRTtnQ0FDcEIsSUFBSSxFQUFFLFVBQUcsSUFBSSxDQUFFOzZCQUNsQjt5QkFDSixDQUFDLEVBQUE7O29CQU5JLElBQUksR0FBRyxTQU1YO29CQUVGLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUU7d0JBQzlCLElBQUksSUFBSSxDQUFDLENBQUM7cUJBQ2I7eUJBQU07d0JBQ0gsd0JBQU07cUJBQ1Q7O3dCQUdMLHNCQUFPLE9BQU8sRUFBQzs7OztDQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmFuZ29TeW5jLCBHaXRodWJJc3N1ZSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKG5hbmdvOiBOYW5nb1N5bmMpOiBQcm9taXNlPHtHaXRodWJJc3N1ZTogR2l0aHViSXNzdWVbXX0+IHtcblxuICAgIGNvbnN0IHJlcG9zID0gYXdhaXQgcGFnaW5hdGUobmFuZ28sICcvdXNlci9yZXBvcycpO1xuXG4gICAgZm9yIChsZXQgcmVwbyBvZiByZXBvcykge1xuICAgICAgICBsZXQgaXNzdWVzID0gYXdhaXQgcGFnaW5hdGUobmFuZ28sIGAvcmVwb3MvJHtyZXBvLm93bmVyLmxvZ2lufS8ke3JlcG8ubmFtZX0vaXNzdWVzYCk7XG5cbiAgICAgICAgLy8gRmlsdGVyIG91dCBwdWxsIHJlcXVlc3RzXG4gICAgICAgIGlzc3VlcyA9IGlzc3Vlcy5maWx0ZXIoaXNzdWUgPT4gISgncHVsbF9yZXF1ZXN0JyBpbiBpc3N1ZSkpO1xuXG4gICAgICAgIGNvbnN0IG1hcHBlZElzc3VlczogR2l0aHViSXNzdWVbXSA9IGlzc3Vlcy5tYXAoaXNzdWUgPT4gKHtcbiAgICAgICAgICAgIGlkOiBpc3N1ZS5pZCxcbiAgICAgICAgICAgIG93bmVyOiByZXBvLm93bmVyLmxvZ2luLFxuICAgICAgICAgICAgcmVwbzogcmVwby5uYW1lLFxuICAgICAgICAgICAgaXNzdWVfbnVtYmVyOiBpc3N1ZS5udW1iZXIsXG4gICAgICAgICAgICB0aXRsZTogaXNzdWUudGl0bGUsXG4gICAgICAgICAgICBzdGF0ZTogaXNzdWUuc3RhdGUsXG4gICAgICAgICAgICBhdXRob3I6IGlzc3VlLnVzZXIubG9naW4sXG4gICAgICAgICAgICBhdXRob3JfaWQ6IGlzc3VlLnVzZXIuaWQsXG4gICAgICAgICAgICBib2R5OiBpc3N1ZS5ib2R5LFxuICAgICAgICAgICAgZGF0ZV9jcmVhdGVkOiBpc3N1ZS5jcmVhdGVkX2F0LFxuICAgICAgICAgICAgZGF0ZV9sYXN0X21vZGlmaWVkOiBpc3N1ZS51cGRhdGVkX2F0XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpZiAobWFwcGVkSXNzdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGF3YWl0IG5hbmdvLmJhdGNoU2VuZChtYXBwZWRJc3N1ZXMsICdHaXRodWJJc3N1ZScpO1xuICAgICAgICAgICAgYXdhaXQgbmFuZ28ubG9nKGBTZW50ICR7bWFwcGVkSXNzdWVzLmxlbmd0aH0gaXNzdWVzIGZyb20gJHtyZXBvLm93bmVyLmxvZ2lufS8ke3JlcG8ubmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBlbXB0eSBhcnJheSB3aXRoIHRoZSBtb2RlbCBrZXkgdG8gaW5kaWNhdGUgc3VjY2Vzc1xuICAgIHJldHVybiB7IEdpdGh1Yklzc3VlOiBbXSB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBwYWdpbmF0ZShuYW5nbzogTmFuZ29TeW5jLCBlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgY29uc3QgTUFYX1BBR0UgPSAxMDA7XG5cbiAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcbiAgICBsZXQgcGFnZSA9IDE7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IG5hbmdvLmdldCh7XG4gICAgICAgICAgICBlbmRwb2ludDogZW5kcG9pbnQsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBsaW1pdDogYCR7TUFYX1BBR0V9YCxcbiAgICAgICAgICAgICAgICBwYWdlOiBgJHtwYWdlfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHJlc3AuZGF0YSk7XG5cbiAgICAgICAgaWYgKHJlc3AuZGF0YS5sZW5ndGggPT0gTUFYX1BBR0UpIHtcbiAgICAgICAgICAgIHBhZ2UgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG4iXX0=