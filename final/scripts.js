// Game Constants
const fps = 30;
const canvas_x = 800;
const canvas_y = 600;

const dashboard = document.getElementById("dashboard");
dashboard.style.width = canvas_x + "px";

const player_stats = document.getElementById("player_stats");
const level = document.getElementById("level");
const enemies = document.getElementById("enemies");

const canvas = document.getElementById("myCanvas");
canvas.width = canvas_x;
canvas.height = canvas_y;

// think of this as the paint brush
const ctx = canvas.getContext("2d");

class Hitbox
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}

class Player
{
    constructor(name, x, y, hitbox)
    {
        this.name = name;
        this.color = "#00ff00";
        this.width = 50;
        this.height = 50;
        this.hitbox = hitbox
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.speed = 8;
        this.rotation_speed = 0.1;

        // Upon object initialization modify hitbox to match player x, y, width * 0.9, height * 0.9
        this.hitbox.x = this.x - (this.width * 0.9) / 2;
        this.hitbox.y = this.y - (this.height * 0.9) / 2;

        // The hitbox is purposefully slightly smaller than the player's visible profile.
        this.hitbox.width = this.width * 0.9;
        this.hitbox.height = this.height * 0.9;
    }
    move_player_forward()
    {
        // https://www.youtube.com/watch?v=Jhgc1X8qvAc
        // https://youtu.be/YGez3r7rZjw?t=237

        // move player
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // move hitbox
        this.hitbox.x += Math.cos(this.angle) * this.speed;
        this.hitbox.y += Math.sin(this.angle) * this.speed;
    }
    move_player_backward()
    {
        // move player
        this.x -= Math.cos(this.angle) * this.speed;
        this.y -= Math.sin(this.angle) * this.speed;

        //move hitbox
        this.hitbox.x -= Math.cos(this.angle) * this.speed;
        this.hitbox.y -= Math.sin(this.angle) * this.speed;
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
    increase_speed()
    {
        if (this.speed < 16)
        {
            this.speed += 1;
        }
    }
    increase_rotation_speed()
    {
        if (this.rotation_speed < 0.25)
        {
            this.rotation_speed += 0.05
        }
    }
}

class Enemy
{
    constructor(width, height, x, y, speed)
    {
        this.color = "#dd0000";
        this.health = 3;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    reduce_health()
    {
        this.health -= 1;
        this.width *= 0.9;
        this.height *= 0.9;
        if (this.health === 2)
        {
            this.color = "#ee0000";
        }
        else if (this.health === 1)
        {
            this.color = "#ff0000";
        }
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

class Bullet
{
    constructor(hitbox)
    {
        this.color = "#ff7300";
        this.width = 10;
        this.height = 10;
        this.hitbox = hitbox
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = 16;

        // Upon object initialization modify hitbox to match Bullets x, y, width, height
        this.hitbox.x = this.x - (this.width) / 2;
        this.hitbox.y = this.y - (this.height) / 2;

        this.hitbox.width = this.width;
        this.hitbox.height = this.height;
    }
    move_bullet_forward()
    {
        // move bullet forward
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // move hitbox forward
        this.hitbox.x += Math.cos(this.angle) * this.speed;
        this.hitbox.y += Math.sin(this.angle) * this.speed;
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
        this.bullet_array = [];
        this.collectables_array = [];
        this.enemy_array = [];
        this.level = 0;
        this.player_has_lost = false;
    }
    add_bullet()
    {
        let hitbox = new Hitbox();
        let bullet = new Bullet(hitbox);
        bullet.x = this.player.x - bullet.width / 2;
        bullet.y = this.player.y - bullet.height / 2;
        bullet.hitbox.x = bullet.x;
        bullet.hitbox.y = bullet.y;
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
    add_enemy(enemy)
    {
        this.enemy_array.push(enemy);
    }
    remove_enemy(enemy)
    {
        this.enemy_array = this.enemy_array.filter(object => object !== enemy);
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
    move_and_draw_bullet(ctx)
    {
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
    draw_enemy(ctx)
    {
        for (let i = 0; i < this.enemy_array.length; i++)
        {
            
            ctx.fillStyle = this.enemy_array[i].color;
            ctx.fillRect(this.enemy_array[i].x, this.enemy_array[i].y, this.enemy_array[i].width, this.enemy_array[i].height);
        }
    }
    check_enemy_health()
    {
        for (let i = 0; i < this.enemy_array.length; i++)
        {
            if (this.enemy_array[i].health <= 0)
            {
                this.remove_enemy(this.enemy_array[i]);
            }
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
    // check bullet bounds AND check if bullet has collided with an enemy
    check_bullet()
    {
        // i was having a lot of issues iterating through the look from start to finish. Fixed once i went back to front.
        // this was because the way i delete things from array causes everything to shift down. This is super bad.
        // deleting from the top does not cause that cascading shifting.
        for (let i = this.bullet_array.length - 1; i >= 0; i--)
        {
            // is out of bounds?
            if (this.is_out_of_bounds(this.bullet_array[i]))
            {
                console.log("out of bounds: deleting bullet")
                this.remove_bullet(this.bullet_array[i]);

                // This is necessary, because if the bullet is deleted on the border, the bullet cannot then be checked against the enemy.
                continue;
            }
            // has collided with enemy?
            for (let z = 0; z < this.enemy_array.length; z++)
            {
                if(this.has_collided(this.bullet_array[i].hitbox,this.enemy_array[z]))
                {
                    console.log("enemy collision: deleting bullet");
                    this.remove_bullet(this.bullet_array[i]);
                    this.enemy_array[z].reduce_health();

                    // break out from loop if bullet gone.
                    break;
                }
            }
        }
    }
    // This function now ONLY works with objects that have Hitbox!!
    is_out_of_bounds(entity)
    {
        // check top side of entity
        if (entity.hitbox.y < 0)
        {
            entity.hitbox.y = 0;
            entity.y = entity.hitbox.y + (entity.hitbox.height / 2)
            
            return true;
        }
        // check bottom side of entity
        else if ((entity.hitbox.y + entity.hitbox.height) > this.y_boundary)
        {
            entity.hitbox.y = this.y_boundary - entity.hitbox.height;
            entity.y = entity.hitbox.y + (entity.hitbox.height / 2);
            return true;
        }
        // check left side of entity
        else if (entity.hitbox.x < 0)
        {
            entity.hitbox.x = 0;
            entity.x = entity.hitbox.x + (entity.hitbox.width / 2);
            return true;
        }
        // check right side of entity
        else if (entity.hitbox.x + entity.hitbox.width > this.x_boundary)
        {
            entity.hitbox.x = this.x_boundary - entity.hitbox.width;
            entity.x = entity.hitbox.x + (entity.hitbox.width / 2);
            return true;
        }
        // no collision with boundary
        else
        {
            return false;
        }
    }
    // DEBUG -- SHOULD I REMOVE FROM FRONT TO BACK OR OTHER WAY AROUND?
    check_collectable_collision()
    {
        for (let i = 0; i < this.collectables_array.length; i++)
        {
            if (this.has_collided(this.player.hitbox,this.collectables_array[i]))
            {
                this.remove_collectable(this.collectables_array[i]);
                if (Math.random() > 0.5)
                {
                    this.player.increase_speed();
                }
                else
                {
                    this.player.increase_rotation_speed();
                }
            }
        }
    }
    check_enemy_collision()
    {
        for (let i = 0; i < this.enemy_array.length; i++)
        {
            if (this.has_collided(this.player.hitbox,this.enemy_array[i]))
            {
                console.log("collision with player and enemy!")
                this.player_has_lost = true;
            }
        }
    }
    player_key_listener()
    {
        if (!this.is_out_of_bounds(this.player))
        {
            document.onkeydown = (e) =>
            {
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
                if (e.key === " ")
                {
                    this.add_bullet();
                }
            }
        }
    }
    enemy_move_towards_player()
    {
        for (let i = 0; i < this.enemy_array.length; i++)
        {
             // move left or right else remain unchanged
            if (this.enemy_array[i].x < this.player.hitbox.x)
            {
                this.enemy_array[i].move_enemy_right();
            }
            else if (this.enemy_array[i].x > this.player.hitbox.x)
            {
                this.enemy_array[i].move_enemy_left();
            }
            // move up or down else remain unchanged
            if (this.enemy_array[i].y < this.player.hitbox.y)
            {
                this.enemy_array[i].move_enemy_down();
            }
            else if (this.enemy_array[i].y > this.player.hitbox.y)
            {
                this.enemy_array[i].move_enemy_up();
            }   
        }
    }
    clear_game_field(ctx)
    {
        ctx.clearRect(0, 0, canvas_x, canvas_y);
    }
    display_player_stats()
    {
        player_stats.innerHTML = `Speed: ${this.player.speed} Rotation: ${this.player.rotation_speed.toFixed(2)}`;
    }
    check_level()
    {
        enemies.innerHTML = `Enemies: ${this.enemy_array.length}`;
        
        // if no enemies then progress level
        if (this.enemy_array.length === 0)
        {
            this.level += 1;
            level.innerHTML = `Level: ${this.level}`;    
            // level * 2 = total number of new enemies
            for (let i = 0; i < this.level * 2; i++)
            {
                // Spawn Enemies off screen with a min distance imposed
                const min_distance = 50;
                
                // random_x, random_y for each new enemy
                let random_x;
                let random_y;

                // get random direction (which direction to spawn off screen)
                // must use math.floor because it will return numbers like 2.78990 and it will never equal 0 or 1 etc
                let direction = Math.floor(Math.random() * 4);

                // top
                if (direction === 0)
                {
                    random_x = Math.random() * canvas_x;
                    random_y = -min_distance;
                }
                // bottom
                else if (direction === 1)
                {
                    random_x = Math.random() * canvas_x;
                    random_y = canvas_y + min_distance;
                }
                // left
                else if (direction === 2)
                {
                    random_x = -min_distance;
                    random_y = Math.random() * canvas_y;
                }
                // right
                else
                {
                    random_x = canvas_x + min_distance;
                    random_y = Math.random() * canvas_y;
                }

                let new_enemy = new Enemy(50,50,random_x, random_y, (Math.random() * 1.75) + 0.25);
                this.add_enemy(new_enemy);
            }

            // 50% to add collectable to new level
            if (Math.random() < 0.75)
            {
                console.log("Adding new collectable to field.");
                let c = new Collectable(Math.random() * canvas_x, Math.random() * canvas_y);
                this.add_collectable(c);
            }
        }
    }
    game_loop(ctx)
    {
        // Is the game over?
        if (this.player_has_lost)
        {
            document.body.innerHTML = `
            <div style="text-align: center; margin-top: 20%">
                <h1>GAME OVER!!!</h1>
                <h1>Final Level: ${this.level}</h1>
            </div>`;
            return;
        }

        // display player stats
        this.display_player_stats();

        // clear canvas
        this.clear_game_field(ctx);

        // check level
        this.check_level();

        // move enemies
        this.enemy_move_towards_player();

        // draw enemies
        this.check_enemy_health();
        this.draw_enemy(ctx);

        // check and remove bullets that collide with canvas border (or they'll keep going forever) or enemy
        this.check_bullet(); 

        // move then draw bullets
        this.move_and_draw_bullet(ctx);

        // draw the player
        this.draw_player(ctx);

        // draw collectables
        this.draw_collectable(ctx);

        // player legal movement
        this.player_key_listener();

        // check player and enemy collision
        this.check_enemy_collision();

        // check collectable collision
        this.check_collectable_collision();
    }
}
// Pre-game initialization

var h1 = new Hitbox();

var p1 = new Player("player 1",canvas_x/2,canvas_y/2, h1);
var game = new Game(p1);

// GAME START HERE
setInterval(()=>game.game_loop(ctx), 1000/fps);