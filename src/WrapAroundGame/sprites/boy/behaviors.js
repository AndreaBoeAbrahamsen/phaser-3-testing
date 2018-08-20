import machina from 'machina';

export default class Behaviors extends machina.Fsm {
    constructor({ scene, entity }) {

        const behaviorFsm = {
            namespace: 'player-behaviors',
            initialState: 'idling',
            states: {
                idling: {
                    _onEnter: function() {
                        entity.sprite.body.setVelocityX(0); 
                        entity.sprite.body.setAccelerationX(0);
                        entity.sequence('idle');
                    },
                    walk: 'walking',
                    run: 'running',
                    jump: 'jumping'
                },
                walking: {
                    _onEnter: function() {
                        entity.sequence('walk');
                    },
                    walk: function(data) {
                        const { velocity, direction } = data;
                        let speed = velocity.walking;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setVelocityX(speed); 
                        if(entity.direction != direction){
                            entity.direction = direction;
                            this.transition('turning', 'walk');
                        }
                    },
                    idle: 'idling',
                    run: 'running',
                    jump: 'jumping',
                    fall: 'falling'
                },
                running: {
                    _onEnter: function() {
                        entity.sequence('run');
                    },
                    run: function (data){
                        const { velocity, direction } = data;
                        let speed = velocity.running;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setAccelerationX(speed);
                        if(entity.direction != direction){
                            entity.direction = direction;
                            this.transition('turning', 'running');
                        }
                    },
                    walk: 'walking',
                    idle: 'idling',
                    jump: 'jumping',
                    fall: 'falling'
                },
                turning: {
                    _onEnter: function(c) {
                        console.log(c);
                        entity.sprite.body.setVelocityX(0); 
                        entity.sprite.body.setAccelerationX(0);
                        entity.sequence('turn').then(() => {
                            entity.sprite.setFlipX(entity.direction === 'left');
                            this.transition('idling');
                        });
                    }
                },
                jumping: {
                    _onEnter: function() {
                        entity.sequence('jump');
                    },
                    jump: function(data) {
                        const { velocity } = data;
                        entity.sprite.body.setVelocityY(-velocity.jump); 
                    },
                    walk: function(data) {
                        const { velocity, direction } = data;
                        let speed = velocity.airSpeed;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setAccelerationX(speed); 
                    },
                    run: function(data) {
                        const { velocity, direction } = data;
                        let speed = velocity.airSpeed;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setAccelerationX(speed); 
                    },
                    idle: function() {
                        entity.sprite.body.setAccelerationX(0); 
                    },
                    fall: 'falling'
                },
                falling: {
                    _onEnter: function() {
                        entity.sequence('down');
                    },
                    fall: function() {},
                    walk: function(data) {
                        const { velocity, direction } = data;
                        let speed = velocity.airSpeed;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setAccelerationX(speed); 
                    },
                    run: function(data) {
                        const { velocity, direction } = data;
                        let speed = velocity.airSpeed;
                        speed = direction === 'left' ? -speed : speed;
                        entity.sprite.body.setAccelerationX(speed); 
                    },
                    idle: function() {
                        entity.sprite.body.setAccelerationX(0); 
                    },
                    land: 'landing'
                },
                landing: {
                    _onEnter: function() {
                        entity.sprite.body.setVelocityX(0);
                        entity.sprite.body.setAccelerationX(0); 
                        entity.sequence('land').then(() => {
                            this.transition('idling');
                        });
                    }
                }
            }
        };

        super(behaviorFsm);
        this.scene = scene;
        this.entity = entity;
    }  
}
