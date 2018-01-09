"use strict";
cc._RF.push(module, '71f900I6oJHi4CfCyRL68jz', 'Star');
// scripts/Star.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 星星拾取距离
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
    }
    Star.prototype.getMonsterDistance = function () {
        // 根据 monster 节点位置判断距离
        var monsterPos = this.game.monster.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, monsterPos);
        return dist;
    };
    Star.prototype.onPicked = function () {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 然后销毁当前星星节点
        this.node.destroy();
    };
    Star.prototype.update = function (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getMonsterDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    };
    __decorate([
        property
        // 星星拾取距离
    ], Star.prototype, "pickRadius", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();