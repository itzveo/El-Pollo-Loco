class Boss extends movableObject {
    height = 400;
    width = 250;
    energy = 100;
    y = 50;

    IMGS_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.IMGS_WALKING[0]);
        this.loadImgs(this.IMGS_WALKING);
        this.x = 700;
        this.animate();
    }

    animate() {
        setInterval(() =>{
            this.playAnimation(this.IMGS_WALKING);
        }, 180); 
    }
}