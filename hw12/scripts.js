// Game Constants
const fps = 30;
const canvas_x = 800;
const canvas_y = 600;

var canvas = document.getElementById("myCanvas");
canvas.width = canvas_x;
canvas.height = canvas_y;

// think of this as the paint brush
var ctx = canvas.getContext("2d");

var bkg = document.getElementsByTagName("main_body")
var lose = document.getElementById("lose_sound")
var message = document.getElementById("message")

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
    draw_player(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)     
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

class Enemy
{
    // DEBUG -- FINISH THIS!
    constructor(name, width, height, x, y, speed)
    {
        this.name = name;
        this.color = "#ff0000";
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw_enemy(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)     
    }
    move_enemy_up()
    {
        this.y -= this.speed;
    }
    move_enemy_down()
    {
        this.y += this.speed;
    }
    move_enemy_left()
    {
        this.x -= this.speed;
    }
    move_enemy_right()
    {
        this.x += this.speed;
    }
}

class Game
{
    constructor(name, x_boundary, y_boundary, player)
    {
        this.name = name;
        // DEBUG -- Is x_boundary necessary? can collision with canvas border be handled another way?
        this.x_boundary = x_boundary;
        this.y_boundary = y_boundary;
        this.player = player;
        this.entity_array = [];
    }
    // DEBUG -- Can add, but not remove.
    add_entity(entity)
    {
        this.entity_array.push(entity)
    }
    update_player(ctx)
    {
        this.player.draw_player(ctx);
    }
    update_enemy(ctx)
    {
        for (let i = 0; i < this.entity_array.length; i++)
        {
            this.entity_array[i].draw_enemy(ctx);
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
    has_collided(entity)
    {
        // if player
        if (entity.name === this.player.name)
        {
            for (let i = 0; i < this.entity_array.length; i++)
            {
                let enemy = this.entity_array[i];
                if
                (entity.x < enemy.x + enemy.width &&
                entity.x + entity.width > enemy.x &&
                entity.y < enemy.y + enemy.height &&
                entity.y + entity.height > enemy.y)
                {
                    console.log(`${entity.name} has collided with ${this.entity_array[i].name}`)
                    return true;
                }
            }
        }
        // if enemy
        else
        {
            for (let i = 0; i < this.entity_array.length; i++)
            {
                if (entity.name !== this.entity_array[i].name)
                {
                    let enemy = this.entity_array[i];
                    if
                    (entity.x < enemy.x + enemy.width &&
                    entity.x + entity.width > enemy.x &&
                    entity.y < enemy.y + enemy.height &&
                    entity.y + entity.height > enemy.y)
                    {
                        console.log(`${entity.name} has collided with ${this.entity_array[i].name}`)
                        //return true;
                    }
                }
            }
        }
        return false;
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
    enemy_move_towards_player(enemy_entity)
    {
        // move left or right else remain unchanged
        if (enemy_entity.x < this.player.x)
        {
            enemy_entity.move_enemy_right();
        }
        else if (enemy_entity.x > this.player.x)
        {
            enemy_entity.move_enemy_left();
        }
        // move up or down else remain unchanged
        if (enemy_entity.y < this.player.y)
        {
            enemy_entity.move_enemy_down();
        }
        else if (enemy_entity.y > this.player.y)
        {
            enemy_entity.move_enemy_up();
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

        // draw player and enemies
        this.update_player(ctx);
        this.update_enemy(ctx);

        // game logic
        this.player_key_listener();
        // DEBUG -- Quick and dirty fix... needs to change...
        if (!this.is_out_of_bounds(this.entity_array[0]) || !this.is_out_of_bounds(this.entity_array[0]))
        {
            this.enemy_move_towards_player(this.entity_array[0]);
            this.enemy_move_towards_player(this.entity_array[1]);
        }
        if (this.has_collided(this.player))
        {
            message.innerHTML = "YOU LOSE!";
            document.getElementById("main_body").style.backgroundColor = "#ff0000";
            lose.src = "audio/Youlose.m4a"
            lose.currentTime = 0;
            // really bad loool
            lose.play();
        }
    }
}

var p1 = new Player("player 1",50,50,(canvas_x/2)-25, (canvas_y/2)-25, 8);
var e1 = new Enemy("enemy 1",50, 50, 0, 0, 1);
var e2 = new Enemy("enemy 2",50, 50, 700, 500, 1);

var g = new Game("game field 1", canvas_x, canvas_y, p1);
g.add_entity(e1);
g.add_entity(e2);

// GAME START HERE
setInterval(()=>g.game_loop(ctx), 1000/fps);