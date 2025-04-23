class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        my.sprite.armL1 = this.add.sprite(this.bodyX + 100, this.bodyY - 40, "monsterParts", "arm_whiteA.png");
        my.sprite.armR1 = this.add.sprite(this.bodyX - 100, this.bodyY - 40, "monsterParts", "arm_whiteA.png");
        
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        my.sprite.armL1.angle = -60;
        my.sprite.armR1.angle = +60;
        

        my.sprite.armR1.flipX = true;

        my.sprite.legL = this.add.sprite(this.bodyX + 30, this.bodyY + 90, "monsterParts", "leg_redA.png");
        my.sprite.legR = this.add.sprite(this.bodyX - 30, this.bodyY + 90, "monsterParts", "leg_redD.png");
        my.sprite.legR.flipX = true;

        my.sprite.earL = this.add.sprite(this.bodyX + 50, this.bodyY - 90, "monsterParts", "detail_red_antenna_large.png");
        my.sprite.earR = this.add.sprite(this.bodyX - 50, this.bodyY - 90, "monsterParts", "detail_red_antenna_large.png");
        my.sprite.earL.angle = +30
        my.sprite.earR.angle = -30
        my.sprite.earR.flipX = true;
    
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        my.sprite.eyeL = this.add.sprite(this.bodyX + 30, this.bodyY - 40, "monsterParts", "eye_human_red.png");
        my.sprite.eyeR = this.add.sprite(this.bodyX - 30, this.bodyY - 40, "monsterParts", "eye_dead.png");

        my.sprite.nose = this.add.sprite(
            this.bodyX,
            this.bodyY + 10,
            "monsterParts",
            "nose_yellow.png"
          );


        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 50, "monsterParts", "mouthB.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;

        this.keys = this.input.keyboard.addKeys('A,D,S,F');


    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        let dx = this.keys.D.isDown ? 1
           : this.keys.A.isDown ? -1
           : 0;

        if (dx !== 0) {
            Object.values(my.sprite).forEach(sprite => {
                sprite.x += dx;
            });
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.S)) {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.F)) {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        }
    }

       
    }