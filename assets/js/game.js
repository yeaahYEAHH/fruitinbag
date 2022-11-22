class Game{
    constructor(){
        this.name = name;
        this.$zone =$('.elements');
    }
    setParams(){
        let params = ['name'],
        value = [this.name];

        params.forEach((e, i) => {
            $(`#${e}`).html(value[i])
        })
    }

    loop(){
        requestAnimationFrame(() =>{
            this.setParams();
            this.loop();
        })
    }
    start(){
        this.loop();
    }
}

class Drawable{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.w = 0;
        this.offsets = {
            x: 0,
            y: 0
        }
    }

    createElement(){ 
        this.$element = $(`
        <div class="element ${this.constructor.name.toLowerCase()}"></div>
        `);
        this.game.$zone.append(this.$element);
    }

    update(){
        
    }
}


window.onload = () => {
    checkStorage();
    nav();
    startLoop();
    setInterval(() => {
        if (panel === "game"){
            game.game = new Game();
            game.game.start();
            panel = "game process"
        }
    }, 500)
}