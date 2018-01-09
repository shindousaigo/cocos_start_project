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
export default class Monster extends cc.Component {

	@property
	// 主角跳跃高度
	jumpHeight: number = 0;
	@property
	// 主角跳跃持续时间
	jumpDuration: number = 0;
	@property
	// 最大移动速度
	maxMoveSpeed: number = 0;
	@property
	// 加速度
	accel: number = 0;
	// 跳跃行为
	jumpAction: cc.ActionInterval;

	// LIFE-CYCLE CALLBACKS:

	onLoad(): void {
		// 初始化跳跃动作
		this.jumpAction = this.setJumpAction();
		this.node.runAction(this.jumpAction);
		// 初始化键盘输入监听
		this.setInputControl();
	}

	// start(): void {}

	update(dt: number): void {
		// 根据当前加速度方向每帧更新速度
		if (this.accLeft) {
			this.xSpeed -= this.accel * dt;
		} 
		if (this.accRight) {
			this.xSpeed += this.accel * dt;
		}
		// 限制主角的速度不能超过最大值
		if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
			// if speed reach limit, use max speed with current direction
			// this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
			this.xSpeed = this.xSpeed > 0 ? this.maxMoveSpeed : -this.maxMoveSpeed;
		}

		// 根据当前速度更新主角的位置
		this.node.x += this.xSpeed * dt;
	}

	// METHODS:

	setJumpAction(): cc.ActionInterval {
		// 跳跃上升
		var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
		// 下落
		var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
		// 不断重复
		return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
	}


	private accLeft: boolean = false;
	private accRight: boolean = false;
	private xSpeed: number = 0;
	setInputControl(): void {
		var self: Monster = this;
		// 添加键盘事件监听
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			// 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
			onKeyPressed(keyCode, event) {
				switch (keyCode) {
					case cc.KEY.a:
						self.accLeft = true;
						self.accRight = false;
						break;
					case cc.KEY.d:
						self.accLeft = false;
						self.accRight = true;
						break;
				}
			},
			// 松开按键时，停止向该方向的加速
			onKeyReleased(keyCode, event) {
				switch (keyCode) {
					case cc.KEY.a:
						self.accLeft = false;
						break;
					case cc.KEY.d:
						self.accRight = false;
						break;
				}
			}
		}, self.node);
	}

}
