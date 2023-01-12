const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const Canvas = require('@napi-rs/canvas');
/**
 * A chest command that will display all the chest
 * that the user has, and can open using /open_chest.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing purposes.'),

    async execute(interaction) {
        const randomTier = Math.floor(Math.random() * 10) + 1;
        const canvas = Canvas.createCanvas(1000, 170);
        let context = canvas.getContext('2d');
        
        context.font = '21 px sans-serif';
        context.fillStyle = `black`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // We are now going to load in all of the images.
        const loadedImages = {
            "helmet": `./game-assets/game-images/armor/tier ${randomTier}/1.png`,
            "chestplate": `./game-assets/game-images/armor/tier ${randomTier}/2.png`,
            "boots": `./game-assets/game-images/armor/tier ${randomTier}/3.png`,
            "axe": `./game-assets/game-images/tool/axe/${randomTier}.png`,    
            "fishing rod": `./game-assets/game-images/tool/fishing rod/${randomTier}.png`,
            "hoe": `./game-assets/game-images/tool/hoe/${randomTier}.png`,
            "pickaxe": `./game-assets/game-images/tool/pickaxe/${randomTier}.png`,
            "sword": `./game-assets/game-images/weapon/sword/${randomTier}.png`,
            "bow": `./game-assets/game-images/weapon/bow/${randomTier}.png`
        };

        for (let cube = 0; cube < 9; cube++){
            const randomLevel = Math.floor(Math.random() * 100) + 1;
            const itemImage = await Canvas.loadImage(loadedImages[Object.keys(loadedImages)[cube]]);
            const x = cube * (canvas.width/Object.keys(loadedImages).length);   
            if (randomLevel >= 90) context = glow(context);
            context.drawImage(itemImage, x, 0, itemImage.width*1.25, itemImage.height*1.25)
            context.shadowColor = "black";
            context.fillStyle = "white";
            context.fillText(`Tier:  ${randomTier}`, x, 150)
            context.fillText(`Level:  ${randomLevel}`, x, 170)
        }
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'stats-image.png' });
        interaction.reply({ files: [attachment] });
    }
}

function glow(context){
    context.shadowBlur = 10;
    context.shadowColor = "#fffb00";
    return context;
}

function resetContext(canvas){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return ctx
}