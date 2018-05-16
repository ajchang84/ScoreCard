var res = {
    Cat_json : "res/Cat.json",
    Cat_sprite : "res/running_cat.plist",
    Cat_sprite_png : "res/running_cat.png",
    MainScene_json : "res/MainScene.json",

    TestScene_json : "res/TestScene.json",
    large_10x6_png : "res/ScoreBoard/large_10x6.png",
    large_1x6_png : "res/ScoreBoard/large_1x6.png",
    small_30x6_png : "res/ScoreBoard/small_30x6.png",
    small_1x6_png : "res/ScoreBoard/small_1x6.png",
    small_30x3_png : "res/ScoreBoard/small_30x3.png",
    small_1x3_png : "res/ScoreBoard/small_1x3.png",
    small_15x3_bottom_png : "res/ScoreBoard/small_15x3_bottom.png",
    small_1x3_bottom_png : "res/ScoreBoard/small_1x3_bottom.png",
    banker_sprite_png : "res/ScoreBoard/banker.png",
    player_sprite_png : "res/ScoreBoard/player.png",
    tie_sprite_png : "res/ScoreBoard/tie.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
