const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            winner: null,
            logMessages: []
        }
    },
    methods: {
        attackMonster() {
            this.round++
            const damage = getRandomValue(5, 12)
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'attack', 'monster', damage)
            this.attackPlayer()
        },
        attackPlayer() {
            const damage = getRandomValue(8, 15)
            this.playerHealth -= damage;
            this.addLogMessage('monster', 'attack', 'player', damage)
        },
        specialAttackMonster() {
            this.round++
            const damage = getRandomValue(10, 25)
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'SUPER ATTACK!', 'monster', damage)
            this.attackPlayer()
        },
        healPlayer() {
            const healValue = getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', 'player', healValue)
            this.attackPlayer()
        },
        startNewGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.round = 0
            this.logMessages = []
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(user, action, target, value) {
            this.logMessages.unshift({
                user,
                action,
                target,
                value
            })
        }
    },
    computed: {
        monsterBarStyles() {
            return {
                width: `${this.monsterHealth < 0 ? 0 : this.monsterHealth}%`
            }
        },
        playerBarStyles() {
            return {
                width: `${this.playerHealth < 0 ? 0 : this.playerHealth}%`
            }
        },
        checkSpecialAttackAllow() {
            return this.round % 3 !== 0
        }
    },
    watch: {
        playerHealth() {
            if(this.playerHealth <= 0 && this.monsterHealth <= 0) {
                //Draw
                this.winner = 'draw'
            } else if(this.playerHealth <= 0) {
                //Player Lose
                this.winner = 'monster'
            }
        },
        monsterHealth() {
            if(this.monsterHealth <= 0 && this.playerHealth <= 0) {
                //Draw
                this.winner = 'draw'
            } else if(this.monsterHealth <= 0) {
                //Monster Lose
                this.winner = 'player'
            }
        }
    }
}).mount('#game')