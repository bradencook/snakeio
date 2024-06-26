//------------------------------------------------------------------
//
// This provides the "game" code.
//
//------------------------------------------------------------------
// noinspection JSVoidFunctionReturnValueUsed

MyGame.main = (function (objects, input, renderer, graphics) {
    'use strict';

    console.log('game initializing...');

    let lastTimeStamp = performance.now();

    let myKeyboard = input.Keyboard();

    let littleBird = objects.Bird({
        size: { x: 50, y: 50 },       // Size in pixels
        center: { x: 50, y: 150 },
        rotation: 0,
        moveRate: 125 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
    let bigBird = objects.Bird({
        size: { x: 75, y: 75 },       // Size in pixels
        center: { x: 50, y: 350 },
        rotation: 0,
        moveRate: 75 / 1000,          // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
    let dkHead = objects.Snake({
        size: { x: 75, y: 50 },       // Size in pixels
        center: { x: 250, y: 350 },
        rotation: 0,
        moveRate: 75 / 1000,          // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });

    let littleBirdRender = renderer.AnimatedModel({
        spriteSheet: 'assets/spritesheet-bananaGreenSingle.png',
        spriteCount: 8,
        spriteTime: [150, 150, 150, 150, 150, 150, 150, 150],   // ms per frame
    }, graphics);
    let bigBirdRender = renderer.AnimatedModel({
        spriteSheet: 'assets/spritesheet-bananaBlueBunch.png',
        spriteCount: 12,
        spriteTime: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],   // ms per frame
    }, graphics);
    let dkHeadRender = renderer.AnimatedModel({
        spriteSheet: 'assets/dkhead.png',
        spriteCount: 1,
        spriteTime: [1000],   // ms per frame
    }, graphics);

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Update the particles
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        littleBirdRender.update(elapsedTime);
        bigBirdRender.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Render the particles
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();

        littleBirdRender.render(littleBird);
        bigBirdRender.render(bigBird);
        dkHeadRender.render(dkHead);
    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {
        let elapsedTime = (time - lastTimeStamp);
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    };

    /*
    myKeyboard.register('w', littleBird.moveForward);
    myKeyboard.register('a', littleBird.rotateLeft);
    myKeyboard.register('d', littleBird.rotateRight);
    */

    myKeyboard.register('ArrowUp', dkHead.moveForward);
    myKeyboard.register('ArrowLeft', dkHead.rotateLeft);
    myKeyboard.register('ArrowRight', dkHead.rotateRight);

    requestAnimationFrame(gameLoop);
}(MyGame.objects, MyGame.input, MyGame.render, MyGame.graphics));
