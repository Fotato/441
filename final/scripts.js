// Game Constants
const fps = 30;
const canvas_x = 800;
const canvas_y = 600;

const dashboard = document.getElementById("dashboard");
dashboard.style.width = canvas_x + "px";

const message = document.getElementById("message");
const scoreboard = document.getElementById("scoreboard");

const canvas = document.getElementById("myCanvas");
canvas.width = canvas_x;
canvas.height = canvas_y;

// think of this as the paint brush
const ctx = canvas.getContext("2d");

class Player
{
    constructor(name, x, y)
    {
        this.name = name;
        this.color = "#00ff00";
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.speed = 8;
        this.rotation_speed = 0.1;
    }
    move_player_forward()
    {
        // DEBUG -- CHECK THIS
        // https://www.youtube.com/watch?v=Jhgc1X8qvAc
        // https://youtu.be/YGez3r7rZjw?t=237

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
    move_player_backward()
    {
        this.x -= Math.cos(this.angle) * this.speed;
        this.y -= Math.sin(this.angle) * this.speed;
    }
    // DEBUG -- Technically each rotation could climb to infinity. This is not ideal, obviously.
    rotate_player_clockwise()
    {
        this.angle += this.rotation_speed;
    }
    rotate_player_counterclockwise()
    {
        this.angle -= this.rotation_speed;
    }
}

class Obstacle
{
    constructor(width, height, x, y)
    {
        this.color = "#ff0000";
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}

class Bullet
{
    constructor()
    {
        this.color = "#ff7300";
        this.width = 10;
        this.height = 10;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = 16;
    }
    move_bullet_forward()
    {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
}

class Collectable
{
    constructor(x, y)
    {
        this.color = "#ff00ff";
        this.width = 10;
        this.height = 10;
        this.x = x;
        this.y = y;
    }
}

class Game
{
    constructor(player)
    {
        this.x_boundary = canvas_x;
        this.y_boundary = canvas_y;
        this.player = player;
        this.obstacles_array = [];
        this.bullet_array = [];
        this.collectables_array = [];
        this.score = 0;
        this.score_max = null;
    }
    check_if_won()
    {
        if (this.score === this.score_max)
        {
            message.innerHTML = `You Won!`;
            document.body.style.backgroundColor = "#00ff00";
        }
    }    
    add_obstacle(obstacle)
    {
        this.obstacles_array.push(obstacle);
    }
    add_bullet()
    {
        let bullet = new Bullet();
        bullet.x = this.player.x - bullet.width / 2;
        bullet.y = this.player.y - bullet.height / 2;
        bullet.angle = this.player.angle;

        this.bullet_array.push(bullet);
    }
    remove_bullet(bullet)
    {
        this.bullet_array = this.bullet_array.filter(object => object !== bullet);
    }
    add_collectable(collectable)
    {
        this.collectables_array.push(collectable);
    }
    remove_collectable(collectable)
    {
        // Identifies the object by its memory address.
        // https://www.geeksforgeeks.org/javascript/how-to-remove-a-specific-item-from-an-array-in-javascript/
        this.collectables_array = this.collectables_array.filter(object => object !== collectable);
    }
    async get_obstacle_json()
    {
        const response = await fetch('./data/obstacles.json');
        const data = await response.json();

        data.forEach(obj =>
        {
            let obstacle = new Obstacle(obj.width, obj.height, obj.x, obj.y);
            this.add_obstacle(obstacle);
        });
    }
    async get_collectable_json()
    {
        const response = await fetch('./data/collectables.json');
        const data = await response.json();

        data.forEach(obj =>
        {
            let collectable = new Collectable(obj.x, obj.y);
            this.add_collectable(collectable);
            this.score_max++;
        });
    }
    draw_player(ctx)
    {   
        // To rotate a shape in HTML canvas you must rotate the entire canvas, draw, then return.

        // this saves the state pre-canvas rotation
        ctx.save();
        // https://www.w3schools.com/graphics/canvas_transformations.asp
        // translate() - moves elements on the canvas to a new point in the grid
        ctx.translate(this.player.x, this.player.y);
        ctx.rotate(this.player.angle);

        // DEBUG -- FIX THE CORDS A BIT.

        // Add tank tracks
        ctx.fillStyle = "#00cc00";
        ctx.fillRect(-this.player.width / 2.5, -this.player.height / 1.75, this.player.width / 1.25, this.player.height / 4);
        ctx.fillRect(-this.player.width / 2.5, this.player.height / 1.75, this.player.width / 1.25, -this.player.height / 4);

        // I USED AI FOR THIS. RELATIVE ZERO STUFF. Makes it easier to pivot on origin.
        ctx.fillStyle = this.player.color;
        ctx.fillRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height);

        // Add tank turret
        ctx.fillStyle = "#00cc00";
        ctx.fillRect(-this.player.width / 4, -this.player.height / 4, this.player.width/2, this.player.height/2);
        ctx.fillRect(-this.player.width / 4, -this.player.height / 8, this.player.width, this.player.height/4);

        
        // this restores the pre-canvas rotation.
        ctx.restore();
    }
    draw_obstacle(ctx)
    {
        for (let i = 0; i < this.obstacles_array.length; i++)
        {
            ctx.fillStyle = this.obstacles_array[i].color;
            ctx.fillRect(this.obstacles_array[i].x, this.obstacles_array[i].y, this.obstacles_array[i].width, this.obstacles_array[i].height);
        }
    }
    move_and_draw_bullet(ctx)
    {
        // DEBUG -- FIX ME!!!
        for (let i = 0; i < this.bullet_array.length; i++)
        {
            ctx.fillStyle = this.bullet_array[i].color;
            this.bullet_array[i].move_bullet_forward();
            ctx.fillRect(this.bullet_array[i].x, this.bullet_array[i].y, this.bullet_array[i].width, this.bullet_array[i].height);
        }
    }
    random_rgb_color()
    {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`
    }
    draw_collectable(ctx)
    {
        for (let i = 0; i < this.collectables_array.length; i++)
        {
            ctx.fillStyle = this.random_rgb_color();
            //ctx.fillStyle = this.collectables_array[i].color;
            ctx.fillRect(this.collectables_array[i].x, this.collectables_array[i].y, this.collectables_array[i].width, this.collectables_array[i].height);
        }
    }
    check_bullet_bounds()
    {
        for (let i = 0; i < this.bullet_array.length; i++)
        {
            console.log(this.bullet_array.length)
            if (this.is_out_of_bounds(this.bullet_array[i]))
            {
                console.log("deleting bullet")
                this.remove_bullet(this.bullet_array[i]);
            }
        }
    }
    is_out_of_bounds(entity)
    {
        // check top side of entity
        if (entity.y < 0)
        {
            entity.y = 0;
            return true;
        }
        // check bottom side of entity
        else if ((entity.y + entity.height) > this.y_boundary)
        {
            //this.y_boundary
            entity.y = this.y_boundary - entity.height;
            return true;
        }
        // check left side of entity
        else if (entity.x < 0)
        {
            entity.x = 0
            return true;
        }
        // check right side of entity
        else if (entity.x + entity.width > this.x_boundary)
        {
            entity.x = this.x_boundary - entity.width;
            return true;
        }
        // no collision with boundary
        else
        {
            return false;
        }
    }
    has_collided(object1, object2)
    {
        return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
        );
    }
    /*
    https://www.youtube.com/watch?v=_MyPLZSGS3s
    i ended up using something else, but i used this as a starting point.
    */
    // Midpoint Comparison
    check_obstacle_collision(entity)
    {
        for (let i = 0; i < this.obstacles_array.length; i++)
        {
            if (this.has_collided(entity,this.obstacles_array[i]))
            {
                // get the mid levels for the entity AND the obstacle
                let entity_mid_x = entity.x + (entity.width / 2);
                let entity_mid_y = entity.y + (entity.height / 2);
                let obstacle_mid_x = this.obstacles_array[i].x + (this.obstacles_array[i].width / 2);
                let obstacle_mid_y = this.obstacles_array[i].y + (this.obstacles_array[i].height / 2);
                
                // compare difference of each mid level to determine the largest overlap
                let diff_x = entity_mid_x - obstacle_mid_x;
                let diff_y = entity_mid_y - obstacle_mid_y;

                // x-axis collision checked first.
                if (Math.abs(diff_x / this.obstacles_array[i].width) > Math.abs(diff_y / this.obstacles_array[i].height))
                {
                    if (diff_x > 0)
                    {
                        entity.x = this.obstacles_array[i].x + this.obstacles_array[i].width;
                    }
                    else
                    {
                        entity.x = this.obstacles_array[i].x - entity.width;
                    }
                }
                // y-axis collision checked if not x-axis
                else
                {
                    if (diff_y > 0)
                    {
                        entity.y = this.obstacles_array[i].y + this.obstacles_array[i].height;
                    }
                    else
                    {
                        entity.y = this.obstacles_array[i].y - entity.height;
                    }
                }
            }
        }
    }
    check_collectable_collision()
    {
        for (let i = 0; i < this.collectables_array.length; i++)
        {
            if (this.has_collided(this.player,this.collectables_array[i]))
            {
                this.remove_collectable(this.collectables_array[i]);
                this.score++;
                scoreboard.innerHTML = `Score: ${this.score}`;
            }
        }
    }
    player_key_listener()
    {
        if (!this.is_out_of_bounds(this.player))
        {
            document.onkeydown = (e) =>
            {
                //&& bound_check !== true
                if (e.key === "ArrowUp" || e.key === "w")
                {
                    this.player.move_player_forward();
                }
                else if (e.key === "ArrowDown" || e.key === "s")
                {
                    this.player.move_player_backward();
                }
                else if ((e.key === "ArrowLeft" || e.key === "a"))
                {
                    this.player.rotate_player_counterclockwise();
                }
                else if (e.key === "ArrowRight" || e.key === "d")
                {
                    this.player.rotate_player_clockwise();
                }
                // DEBUG -- Does it need to check bounds? I don't think so...
                if (e.key === " ")
                {
                    this.add_bullet();
                }
            }
        }
    }
    clear_game_field(ctx)
    {
        ctx.clearRect(0, 0, canvas_x, canvas_y);
    }
    game_loop(ctx)
    {
        // DEBUG -- This needs to be cleaned up.

        // clear canvas
        this.clear_game_field(ctx);

        // draw obstacles
        //this.draw_obstacle(ctx);

        // check and remove bullets that collide with canvas border (or they'll keep going forever)
        this.check_bullet_bounds(); 

        // move then draw bullets
        this.move_and_draw_bullet(ctx);

        // draw player
        this.draw_player(ctx);

        // draw collectables
        //this.draw_collectable(ctx);

        // player legal movement
        this.player_key_listener();

        // check obstacle collision
        //this.check_obstacle_collision(this.player);

        // check collectable collision
        //this.check_collectable_collision();

        // check if player won the game
        //this.check_if_won();
    }
}
// Pre-game initialization

var p1 = new Player("player 1",canvas_x/2,canvas_y/2);
var game = new Game(p1);
game.get_obstacle_json();
game.get_collectable_json();

// GAME START HERE
setInterval(()=>game.game_loop(ctx), 1000/fps);


// CENTER OF PLAYER OBJECT TEMPLATE!!
// This calculation ONLY works if the player x and y object is TRANSLATED (which it currently is)
/*
ctx.fillStyle = "#cc0000";
ctx.fillRect(this.player.x - 10 / 2, this.player.y - 10 / 2, 10, 10);
*/