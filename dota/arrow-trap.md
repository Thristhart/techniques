---
title: A trap that activates abilities
categories: 
  - dota
  - programming
published: true
---

Here's the end goal:
<video src="assets/arrow_trap_demo.webm" autoplay loop>
</video>
We accomplish this through a trigger_dota firing a function on an npc_dota_base that fires an ability at the origin of the trigger_dota.

If that sounds complicated, don't worry - it's quite simple.

First off, we will need a custom unit. Here's the contents of ```scripts\npcs\npc_units_custom.txt```:

{% gist Thristhart/1afe255c8daba0f0d32e npc_units_custom.txt %}

The most important part is giving it our custom ability, dota_ability_trap_arrow. The unselectable ability is a custom passive that makes it invisible and unselectable, but that isn't strictly required if you don't want it. Same goes for setting the model to invisiblebox.mdl.

It's also important that it has no movement or attack capabilities. You don't want your invisible arrow shooter wandering around and attacking things.

The next step is to define dota_ability_trap_arrow and unselectable. Both are defined in ```scripts\npcs\npc_units_custom.txt```:

{% gist Thristhart/1afe255c8daba0f0d32e npc_abilities_custom.txt %}

You can see that dota_ability_trap_arrow is based on mirana's arrow. This is convenient because I specifically wanted mirana's arrow, but the same idea works with any directional or ground-targeted ability, including datadriven ones.

There are some important modifications made here. Notice that the Mana Cost is set to 0 - our arrow shooter doesn't have any mana, so a mana cost greater than zero would render the ability unusable. I've set AbilityCastPoint to 0 as well. Even our custom unit is affected by cast times in Dota, and that translates directly into a delay in the activation of your trap. I wanted an arrow to shoot instantly, so I set it to zero. Experiment and figure out what feels best.

I've also lowered the cooldown to make the trap more responsive, but that's totally up to your preference. I've also changed the minstun and maxstun in AbilitySpecial, but that is again entirely up to preference.

Now that we've defined our trap NPC, and given it the ability to shoot arrows, we need to hook up the triggers and logic to make it shoot on command.

Our map will eventually look like this:
![](assets/arrow_trap_hammer_preview.png)
First things first, we place an npc_dota_base where we want arrows to come from:
<video src="assets/place_npc_dota_base.webm" autoplay loop>
</video>
And then we change its Object Properties so that it has a unique name, so that our trigger_dota will be able to connect to it. We assign it the Entity Script arrow_trap_ai.lua, which we will create later. Finally, we set the Unit Name to npc_dota_arrow_trap, so that a unit of the correct type is created.
<video src="assets/npc_dota_base_settings.webm" autoplay loop>
</video>
Our NPC is ready to be told to shoot arrows, but it needs to be told that by something. That something will be our trigger_dota. First, we select the toolsstrigger.vmat material, and create a mesh with it.
<video src="assets/create_dota_trigger.webm" autoplay loop>
</video>
Next, we click "Tie Selected Meshes To Entity" and change the entity to trigger_dota. (I have hammer configured to default to trigger_dota, but it is likely yours defaults to trigger_multiple.)
<video src="assets/tie_trigger_dota_entity.webm" autoplay loop>
</video>
Finally, we hit Alt+Enter to open up the trigger_dota's detailed object properties. From here, we select the Outputs tab, and click Add to create a new output. We want to respond to a player triggering the trap, so we will use an OnTrigger output. We select the npc_arrow_trap1 that we named earlier (or whatever unique name you used) as the target. The npc_dota_base has an input named CallScriptFunction, which will call a function from the Entity Scripts that are associated with it. We are going to name that function Fire, so we'll use the parameter Fire.
<video src="assets/trigger_dota_outputs.webm" autoplay loop>
</video>
That's it as far as Hammer is concerned. I added a little decoration to create the appearance of a "launcher", but that's completely optional.
![](assets/arrow_trap_hammer_decoration.png)

We're almost done! All that's left is to create the Fire function in  ```scripts\vscripts\arrow_trap_ai.lua``` (or whatever path you put into the Entity Scripts field on your npc_dota_arrow_trap)

{% gist Thristhart/1afe255c8daba0f0d32e arrow_trap_ai.lua %}

When an entity in hammer has an EntityScript specified, that script is loaded in when the entity is created. The script is given access to the entity that is associated with it via the ```thisEntity``` variable. Additionally, if an Output triggers a function through CallScriptFunction, the triggering entity is passed in the parameters as ```caller```. With these two things in mind, we can use ```CastAbilityOnPosition``` to fire the arrow at the Origin of the trigger_dota when a player walks into it.

Side note: it is important to note that the ability is being cast at the origin of the trigger_dota. To figure out where the origin of your trigger is, select the Translate tool. As you can see here, the origin of my trigger_dota is in the center of the area, just as I want it to be. You can move and resize the trigger_dota to get the origin to the point where you want it.
![](assets/arrow_trap_trigger_origin.png)

Finally, as with all things in dota modding, precaching is extremely important.

Since we are using mirana's arrow, we must precache the arrow particle and sound. IF YOU DO NOT PRECACHE THEM, YOU WILL NOT SEE OR HEAR THE ARROW!
We can do this pretty easily, simply by editing the Precache function in ```scripts\vscripts\addon_game_mode.lua``` 
{% gist Thristhart/1afe255c8daba0f0d32e addon_game_mode.lua %}

If everything is working properly, you should now have a working arrow trap. This can be easily expanded to all sorts of abilities, even completely custom ones. If you have any comments or questions, hit me up on irc.gamesurge.net channel #dota2mods or on twitter at [@thristhart](http://twitter.com/thristhart)