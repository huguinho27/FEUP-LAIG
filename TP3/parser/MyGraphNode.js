/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null;

    // The texture ID.
    this.textureID = null;

    //The animation ID
    this.animationsID = [];

    //Selectable field in LSX File
    this.selectable = false;

    //Picking field in LSX File
    this.pickable = false;

    //Useful for PROLOG
    this.column = null;
    this.line = null;
    this.piece = null;
    this.team = null;
    this.positionX = null;
    this.positionY = null;
    this.positionZ = null;
    this.dead = false;

    this.initialX = null;
    this.initialY = null;
    this.initialZ = null;

    this.graveyardX = null;
    this.graveyardY = null;
    this.graveyardZ = null;

    // Transform Matrix
    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    // Animation Matrix
    this.animationMatrix = mat4.create();
    mat4.identity(this.animationMatrix);

    this.animationMatrixHolder = mat4.create();
    mat4.identity(this.animationMatrixHolder);

     // Animation Variables
     this.startedAnimation = false;
     this.animationElapsedTime = 0;
     this.animationCurrentSection = 0;
     this.animationIndex = 0;


     this.animationEndX = null;
    this.animationEndY = null;
    this.animationEndZ = null;

}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

MyGraphNode.prototype.switchMatrix = function()
{
    this.animationMatrix = this.animationMatrixHolder;
}

MyGraphNode.prototype.updatePosition = function(newx,newy,newz)
{
    this.transformMatrix[12] = newx;
    this.transformMatrix[13] = newy;
    this.transformMatrix[14] = newz;
}

MyGraphNode.prototype.updateGraveyard = function(newx,newy,newz)
{
    this.graveyardX = newx;
    this.graveyardY = newy;
    this.graveyardZ = newz;
}

MyGraphNode.prototype.updateTransformMatrix = function()
{
    this.transformMatrix[12] = this.animationEndX;
    this.transformMatrix[13] = this.animationEndY;
    this.transformMatrix[14] = this.animationEndZ;
}
MyGraphNode.prototype.updateAnimationEnds = function(newx,newy,newz)
{
    this.animationEndX = newx;
    this.animationEndY = newy;
    this.animationEndZ = newz;
}



/**
 * Applies the animations periodically through a deltatime
 */
MyGraphNode.prototype.applyAnimation = function(deltaTime) {

    //if (this.startedAnimation == true)
    this.animationElapsedTime += deltaTime;

    if(this.animationIndex < this.animationsID.length) {
        this.startedAnimation = true;

        var animation = this.graph.animations[this.animationsID[this.animationIndex]];
        this.animationMatrix = animation.getAnimMatrix(this.animationElapsedTime, this.animationCurrentSection);
        animation.getAnimMatrix(this.animationElapsedTime, this.animationCurrentSection);

        // Check if animation ended
        if(this.animationElapsedTime >= animation.getAnimationTotalTime()) {
            this.animationCurrentSection = 0;
            this.animationElapsedTime = 0;
            this.animationIndex++;
            this.startedAnimation = false;

            if (!this.dead) {
            mat4.identity(this.animationMatrix);
            this.updateTransformMatrix();
            this.animationEndX = 0;
            this.animationEndY = 0;
            this.animationEndZ = 0;
            }

            
        }
        
        // Check if animation between sections ended (combo or linear)
        else if(this.animationElapsedTime >= animation.sectionTimes[this.animationCurrentSection]) {
            
            if(animation.type == "combo") {
               animation.sectionsPassed++;
            }
            this.animationCurrentSection++;
        }
    }
}

/**
 * Updates the position of the node (Prolog)
 * @param {*} newColumn 
 * @param {*} newLine 
 */
MyGraphNode.prototype.updateLineColumn = function (newColumn, newLine)
{
    this.column = newColumn;
    this.line = newLine;
}

/**
 * Updates the node position
 */
MyGraphNode.prototype.updatePositionValues = function ()
{
    this.positionX = this.transformMatrix[12];
    this.positionY = this.transformMatrix[13];
    this.positionZ = this.transformMatrix[14];
}

MyGraphNode.prototype.assignGraveyard = function ()
{
    if (this.graveyardX == null && this.graveyardY == null && this.graveyardZ == null) {
        this.graveyardX = this.initialX+100;
        this.graveyardY = this.initialY;
        this.graveyardZ = this.initialZ;
    }
}

/**
 * Initially assigns the position to nodes
 */
MyGraphNode.prototype.assignInitialPositions = function ()
{

    this.initialX = this.transformMatrix[12];
    this.initialY = this.transformMatrix[13];
    this.initialZ = this.transformMatrix[14];

    switch (this.nodeID)
    {
        case "piece1":
            this.column = "'A'";
            this.line = 1.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece2":
            this.column = "'B'";
            this.line = 1.
            this.piece = "'T'";
            this.team = "black";
            break;
        
        case "piece3":
            this.column = "'C'";
            this.line = 1.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece4":
            this.column = "'D'";
            this.line = 1.
            this.piece = "'T'";
            this.team = "black";
            break;
        
        case "piece5":
            this.column = "'E'";
            this.line = 1.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece6":
            this.column = "'F'";
            this.line = 1.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece7":
            this.column = "'G'";
            this.line = 1.
            this.piece = "'b'";
            this.team = "white";
            break;
        
        case "piece8":
            this.column = "'H'";
            this.line = 1.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece9":
            this.column = "'A'";
            this.line = 2.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece10":
            this.column = "'B'";
            this.line = 2.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece11":
            this.column = "'C'";
            this.line = 2.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece12":
            this.column = "'D'";
            this.line = 2.
            this.piece = "'h'";
            this.team = "white";
            break;
            
        case "piece13":
            this.column = "'E'";
            this.line = 2.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece14":
            this.column = "'F'";
            this.line = 2.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece15":
            this.column = "'G'";
            this.line = 2.
            this.piece = "'b'";
            this.team = "white";
            break;

        case "piece16":
            this.column = "'H'";
            this.line = 2.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece17":
            this.column = "'A'";
            this.line = 3.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece18":
            this.column = "'B'";
            this.line = 3.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece19":
            this.column = "'C'";
            this.line = 3.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece20":
            this.column = "'D'";
            this.line = 3.
            this.piece = "'B'";
            this.team = "black";
            break;
            
        case "piece21":
            this.column = "'E'";
            this.line = 3.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece22":
            this.column = "'F'";
            this.line = 3.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece23":
            this.column = "'G'";
            this.line = 3.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece24":
            this.column = "'H'";
            this.line = 3.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece25":
            this.column = "'A'";
            this.line = 4.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece26":
            this.column = "'B'";
            this.line = 4.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece27":
            this.column = "'C'";
            this.line = 4.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece28":
            this.column = "'D'";
            this.line = 4.
            this.piece = "'q'";
            this.team = "white";
            break;
            
        case "piece29":
            this.column = "'E'";
            this.line = 4.
            this.piece = "'b'";
            this.team = "white";
            break;

        case "piece30":
            this.column = "'F'";
            this.line = 4.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece31":
            this.column = "'G'";
            this.line = 4.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece32":
            this.column = "'H'";
            this.line = 4.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece33":
            this.column = "'A'";
            this.line = 5.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece34":
            this.column = "'B'";
            this.line = 5.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece35":
            this.column = "'C'";
            this.line = 5.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece36":
            this.column = "'D'";
            this.line = 5.
            this.piece = "'t'";
            this.team = "white";
            break;
            
        case "piece37":
            this.column = "'E'";
            this.line = 5.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece38":
            this.column = "'F'";
            this.line = 5.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece39":
            this.column = "'G'";
            this.line = 5.
            this.piece = "'h'";
            this.team = "white";
            break;

        case "piece40":
            this.column = "'H'";
            this.line = 5.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece41":
            this.column = "'A'";
            this.line = 6.
            this.piece = "'B'";
            this.team = "black";
            break;

        case "piece42":
            this.column = "'B'";
            this.line = 6.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece43":
            this.column = "'C'";
            this.line = 6.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece44":
            this.column = "'D'";
            this.line = 6.
            this.piece = "'t'";
            this.team = "white";
            break;
            
        case "piece45":
            this.column = "'E'";
            this.line = 6.
            this.piece = "'b'";
            this.team = "white";
            break;

        case "piece46":
            this.column = "'F'";
            this.line = 6.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece47":
            this.column = "'G'";
            this.line = 6.
            this.piece = "'T'";
            this.team = "black";
            break;

        case "piece48":
            this.column = "'H'";
            this.line = 6.
            this.piece = "'b'";
            this.team = "white";
            break;

        case "piece49":
            this.column = "'A'";
            this.line = 7.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece50":
            this.column = "'B'";
            this.line = 7.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece51":
            this.column = "'C'";
            this.line = 7.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece52":
            this.column = "'D'";
            this.line = 7.
            this.piece = "'b'";
            this.team = "white";
            break;
            
        case "piece53":
            this.column = "'E'";
            this.line = 7.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece54":
            this.column = "'F'";
            this.line = 7.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece55":
            this.column = "'G'";
            this.line = 7.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece56":
            this.column = "'H'";
            this.line = 7.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece57":
            this.column = "'A'";
            this.line = 8.
            this.piece = "'H'";
            this.team = "black";
            break;

        case "piece58":
            this.column = "'B'";
            this.line = 8.
            this.piece = "'b'";
            this.team = "white";
            break;

        case "piece59":
            this.column = "'C'";
            this.line = 8.
            this.piece = "'Q'";
            this.team = "black";
            break;

        case "piece60":
            this.column = "'D'";
            this.line = 8.
            this.piece = "'H'";
            this.team = "black";
            break;
            
        case "piece61":
            this.column = "'E'";
            this.line = 8.
            this.piece = "'q'";
            this.team = "white";
            break;

        case "piece62":
            this.column = "'F'";
            this.line = 8.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece63":
            this.column = "'G'";
            this.line = 8.
            this.piece = "'t'";
            this.team = "white";
            break;

        case "piece64":
            this.column = "'H'";
            this.line = 8.
            this.piece = "'b'";
            this.team = "white";
            break;

        default:
            break;
    }
}

