 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    
    this.gui = new dat.GUI();

    this.guiControls = new dat.GUI();
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {
    /*
    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }*/
}


/**
 * Adds a folder containing the IDs of the nodes that may be selected
 */
/*
MyInterface.prototype.addSelectableNodes = function(nodes)
{
    var shadersGroup = this.gui.addFolder("Shaders");
    this.gui.add(this.scene, "selectableNodes", nodes).name("Select Node");
}*/

MyInterface.prototype.addOptions = function() 
{
    this.options = this.guiControls.addFolder("Game Options");
    this.options.open();
    this.options.add(this.scene, 'Difficulty', { Easy: 0, Medium: 1, Hard: 2 }).name('Game Difficulty');
    this.options.add(this.scene, 'Type', { HumanVsHuman: 0, HumanVsBot: 1, BotVsBot: 2 }).name('Game Mode');
    this.options.add(this.scene, 'cameraChosenIndex', { Top: 0, AngleView: 1 , OuterView: 2}).name('Camera Angle');
    this.options.add(this.scene, 'TimeElapsed').listen().name('Time Elapsed');
    this.options.add(this.scene, 'startingPlayer', { Player1: 0, Player2: 1 }).name('Starting Player');
    this.options.add(this.scene, 'startGame').name('Start Game');
    this.options.add(this.scene, 'pauseGame').name('Pause Game');
    this.options.add(this.scene, 'gameStatus').listen().name('Game Status');
    this.options.add(this.scene, 'PlayerBlack_Score').listen().name('Player 1 Score');
    this.options.add(this.scene, 'PlayerWhite_Score').listen().name('Player 2 Score');
}
/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) 
{ 
    CGFinterface.prototype.processKeyboard.call(this,event);
	switch (event.keyCode)
	{
        case (85): //u letter
            this.scene.game.undoPlay();
			break;
		
	};
};