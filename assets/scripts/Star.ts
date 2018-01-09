import Game from "./Game";

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property
    // 星星拾取距离
    pickRadius: number = 0;
    game: Game = null;

    getMonsterDistance(): number {
        // 根据 monster 节点位置判断距离
        var monsterPos = this.game.monster.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, monsterPos);
        return dist;
    }

    onPicked() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 然后销毁当前星星节点
        this.node.destroy();
    }

    update(dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getMonsterDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    }

}
