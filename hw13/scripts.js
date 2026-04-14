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
    constructor(name, width, height, x, y, speed)
    {
        this.name = name;
        this.color = "#00ff00";
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    move_player_up()
    {
        this.y -= this.speed;
    }
    move_player_down()
    {
        this.y += this.speed;
    }
    move_player_left()
    {
        this.x -= this.speed;
    }
    move_player_right()
    {
        this.x += this.speed;
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
        this.collectables_array = [];
        this.score = 0;
    }
    check_if_won()
    {
        if (this.collectables_array.length === 0)
        {
            message.innerHTML = `You Won!`;
            document.body.style.backgroundColor = "#00ff00";
        }
    }    
    add_obstacle(obstacle)
    {
        this.obstacles_array.push(obstacle);
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
        });
    }
    draw_player(ctx)
    {
        ctx.fillStyle = this.player.color;
        ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);     
    }
    draw_obstacle(ctx)
    {
        for (let i = 0; i < this.obstacles_array.length; i++)
        {
            ctx.fillStyle = this.obstacles_array[i].color;
            ctx.fillRect(this.obstacles_array[i].x, this.obstacles_array[i].y, this.obstacles_array[i].width, this.obstacles_array[i].height);
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
                    this.player.move_player_up();
                }
                else if (e.key === "ArrowDown" || e.key === "s")
                {
                    this.player.move_player_down();
                }
                else if ((e.key === "ArrowLeft" || e.key === "a"))
                {
                    this.player.move_player_left();
                }
                else if (e.key === "ArrowRight" || e.key === "d")
                {
                    this.player.move_player_right();
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
        // clear canvas
        this.clear_game_field(ctx);

        // draw obstacles
        this.draw_obstacle(ctx);

        // draw player
        this.draw_player(ctx);

        // draw collectables
        this.draw_collectable(ctx);

        // player legal movement
        this.player_key_listener();

        // check obstacle collision
        this.check_obstacle_collision(this.player);

        // check collectable collision
        this.check_collectable_collision();

        // check if player won the game
        this.check_if_won();
    }
}
// Pre-game initialization

var p1 = new Player("player 1",50,50,canvas_x,0,8);
var game = new Game(p1);
game.get_obstacle_json();
game.get_collectable_json();

// GAME START HERE
setInterval(()=>game.game_loop(ctx), 1000/fps);