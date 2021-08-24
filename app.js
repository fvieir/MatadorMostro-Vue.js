new Vue({
    el: '#app',
    data:{
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: []
    },
    computed: {
        hasResult(){
           return this.playerLife == 0 || this.monsterLife == 0 
        }
    },
    methods:{
        startGame() {
            this.running = true,
            this.playerLife = 100,
            this.monsterLife = 100,
            this.logs = []
        },
        attack(especial){
           this.monsterLife = this.hurt('monsterLife',5,10,especial,'Player','Monster','player')
           if(this.monsterLife > 0 ){
                this.playerLife = this.hurt('playerLife',5,12,false, 'Monster','Player','monster')
           }
        },
        hurt(atr, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(plus + min,plus + max);
            this.registerLog(`O ${source} atingiu o ${target} com a forca de ${hurt}`,cls)
            return Math.max(this[atr] - hurt, 0)
        },
        heal(min, max,source, cls){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`O ${source} foi curado em ${heal}`,cls)
        },
        healAndHurt() {
            this.heal(5,13,'Player','heal')
            this.playerLife = this.hurt('playerLife',5,8,false,'Monster','Player','monster')
        },
        getRandom(min, max){
            const random = Math.random() * (max - min) + min
            return Math.round(random)
        },
        registerLog(txt, cls){
            this.logs.unshift({txt, cls})
        }
    },
    watch:{
        hasResult(){
            this.running = false
        },
        logs(){
            console.log(this.logs)
        }
    }
})