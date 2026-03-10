const images = document.getElementById("images");
const titles = document.getElementById("titles");
const descriptions = document.getElementById("descriptions");
const authors = document.getElementById("authors");
const years = document.getElementById("years");
const sources = document.getElementById("sources");

class JusticeImage
{
    constructor(title, image, desc, author, year, source)
    {
        this.title = title
        this.image = image
        this.desc = desc
        this.author = author
        this.year = year
        this.source = source
    }
}

class Slideshow
{
    constructor(image_list)
    {
        this.image_list = image_list
        this.cursor = 0
    }

    // This shuffle algorithm follows the Fisher-Yates shuffle
    // https://www.geeksforgeeks.org/javascript/how-to-shuffle-the-elements-of-an-array-in-javascript/
    // https://www.youtube.com/watch?v=tLxBwSL3lPQ
    shuffle()
    {
        for (let i = this.image_list.length - 1; i > 0; i--)
        {
    	    const j = Math.floor(Math.random() * (i + 1));
    	    [this.image_list[i], this.image_list[j]] = [this.image_list[j], this.image_list[i]];
  	    }
    }

    display_slide()
    {
        images.src = this.image_list[this.cursor].image;
        titles.innerHTML = this.image_list[this.cursor].title;
        descriptions.innerHTML = this.image_list[this.cursor].desc;
        authors.innerHTML = this.image_list[this.cursor].author;
        years.innerHTML = this.image_list[this.cursor].year;
        sources.href = this.image_list[this.cursor].source;
    }

    previous_image()
    {
        if (this.cursor === 0)
        {
            this.cursor = this.image_list.length-1;
        }
        else
        {
            this.cursor -= 1;
        }
        this.display_slide();
    }

    next_image()
    {
        if (this.cursor === this.image_list.length-1)
        {
            this.cursor = 0;
        }
        else
        {
            this.cursor += 1;
        }
        this.display_slide();
    }
}

image_1 = new JusticeImage("Ukrainian Woman Flees Russian Bombs","imgs/img_1.jpeg","A Ukrainian woman carries pets as she runs from her apartment block after Russian bombs exploded in the area in Kharkiv, Ukraine, on July 24. This follows the illegitimate Russian invasion of Ukraine. As long as greedy leaders continue to reign the world can never hope to heal.","David Guttenfelder","2025","https://time.com/7336112/top-100-photos-2025/");
image_2 = new JusticeImage("Palestinian Boy Reads in Rubble","imgs/img_2.jpeg","A Palestinian boy reads in the rubble of a house, following overnight Israeli strikes, at the Nuseirat refugee camp in the central Gaza Strip on April 29. After the disproportionate response undertaken by Israel many thousands of Palestinians civilians lay dead in the ruins of war. The survivors linger like unseen specters.","Eyad Baba","2025","https://time.com/7336112/top-100-photos-2025/");
image_3 = new JusticeImage("Venezuelans Detained in El Salvador","imgs/img_3.jpeg","On the night of March 15, three planes touched down in El Salvador, carrying 261 men deported from the United States. A few dozen were Salvadoran, but most of the men were Venezuelans the Trump Administration had designated as gang members and deported with little or no due process. Once our president demonstrates that laws are arbitrary we all suffer as a society. These men, who ever they are, represent the shifting policy of America. Years of American politics has eroded the idea of democracy and justice for all.","Philip Holsinger","2025","https://time.com/7336112/top-100-photos-2025/");
image_4 = new JusticeImage("Donald Trump Argues with Volodymyr Zelenskyy","imgs/img_4.jpeg","Donald Trump argues with Volodymyr Zelenskyy during a heated meeting in the Oval Office in Washington DC on 28 February 2025. This tonal shift is representative of America's disdainful foreign policy. The American Mantra of \"Live Free or Die\" seems to be swinging towards the latter. The vitriol that stems for the current administration and the actions it frequently takes is indicative of a future of inequity.","Saul Loeb","2025","https://www.theguardian.com/world/gallery/2026/feb/24/four-years-of-war-in-ukraine-in-pictures#img-29");
image_5 = new JusticeImage("Vehicle Burned During Anti-ICE Protests","imgs/img_5.jpeg","A Waymo vehicle burned during protests in downtown Los Angeles on June 8. Under the current administration people are afraid. A dictator rules with fear and power. When society is fragmented and politics are split by a chasm-deep rift and power is wielded illegally it should be no surprise that people are unified by a common rejection of government that they may one day depose.","Ethan Noah Roy","2025","https://time.com/7336112/top-100-photos-2025/");

slide_1 = new Slideshow([image_1, image_2, image_3, image_4, image_5]);
slide_1.shuffle();