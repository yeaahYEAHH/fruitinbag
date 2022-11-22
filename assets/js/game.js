class Game{
    constructor(){
        this.name = name;
        this.$zone =$('.elements');
        this.elements = []
        this.player = this.generate(Player)
    }

    updateElements(){
        this.elements.forEach(e => {
            e.update();
            e.draw();
        })
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
            this.updateElements();
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
        if(this.keys.ArrowLeft && this.x > 0){
            this.offsets.x = -speedPerFrame;
        }else if(this.keys.ArrowRight && this.x < this.game.$zone.width() - this.w){
            this.offsets.x = this.speedPerFrame;
        }else{
            this.offsets.x = 0;
        }
        super.update();
    }

    draw(){
        this.$element.css({
            left: this.x + 'px',
            top: this.y +'px',
            width: this.w + 'px',
            height: this.h + 'px'
        })
    }
}

class Player extends Drawable{
    constructor(game){
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = this.game.$zone.width() / 2 - this.w / 2;
        this.y = this.game.$zone.height() - this.h;
        this.speedPerFrame = 20
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false
        }
        this.createElement();
        this.bindKeyEvents()
    }

    generate(className){
        let element = new className(this);
        this.elements.push(element);
        return element
    }

    bindKeyEvents(){
        document.addEventListener('keydown', ev => this.changeKeyStatus(ev.code, true))
        document.addEventListener('keyup', ev => this.changeKeyStatus(ev.code, false))
    }

    changeKeyStatus(code, value){
        if(code in this.keys){
            this.keys[code] = value
        }
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