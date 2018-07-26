import machina from 'machina';

export default class Behaviors extends machina.Fsm {
    constructor({ scene, entity }) {

        const behaviorFsm = {
            namespace: 'player-behaviors',
            initialState: 'idling',
            states: {
                idling: {
                    _onEnter: function() {
                        entity.body.setVelocityX(0); 
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
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity); 
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
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity);
                    },
                    walk: 'walking',
                    idle: 'idling',
                    jump: 'jumping',
                    fall: 'falling'
                },
                turning: {},
                jumping: {
                    _onEnter: function() {
                        entity.sequence('jump');
                    },
                    jump: function(data) {
                        const { velocity } = data;
                        entity.body.setVelocityY(velocity); 
                    },
                    walk: function(data) {
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity); 
                    },
                    run: function(data) {
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity); 
                    },
                    idle: function() {
                        entity.body.setVelocityX(0); 
                    },
                    fall: 'falling'
                },
                falling: {
                    _onEnter: function() {
                        entity.sequence('down');
                    },
                    fall: function() {},
                    walk: function(data) {
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity); 
                    },
                    run: function(data) {
                        const { velocity } = data;
                        entity.body.setVelocityX(velocity); 
                    },
                    idle: function() {
                        entity.body.setVelocityX(0); 
                    },
                    land: 'landing'
                },
                landing: {
                    _onEnter: function() {
                        entity.body.setVelocityX(0); 
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
