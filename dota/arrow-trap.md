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
And then we change its Object Properties so that it has a unique name, so that it will load arrow_trap_ai.lua on creation, and so that it knows that it is an npc_dota_arrow_trap.
<video src="assets/npc_dota_base_settings.webm" autoplay loop>
</video>
Our NPC is ready to be told to shoot arrows, but it needs to be told that by something. That something will be a trigger_dota. First, we select the toolsstrigger.vmat material, and create a mesh with it.
<video src="assets/create_dota_trigger.webm" autoplay loop>
</video>
Next, we click "Tie Selected Meshes To Entity" and change the entity to trigger_dota. (I have hammer configured to default to trigger_dota, but it is likely yours defaults to trigger_multiple.)
<video src="assets/tie_trigger_dota_entity.webm" autoplay loop>
</video>
Finally, we hit Alt+Enter to open up the trigger_dota's detailed object properties. From here, we select the Outputs tab, and click Add to create a new output. We want to respond to a player triggering the trap, so we will use an OnTrigger output. We select the npc_arrow_trap1 that we named earlier (or whatever unique name you used) as the target. The npc_dota_base has an input named CallScriptFunction, which will call a function from the Entity Scripts that are associated with it. We are going to name that function Fire, so we'll use the parameter Fire.
<video src="assets/trigger_dota_outputs.webm" autoplay loop>
</video>
That's it as far as Hammer is concerened. I added a little decoration to create the appearance of a "launcher", but that's completely optional.
![](assets/arrow_trap_hammer_decoration.png)

(functions)
(link to repository)