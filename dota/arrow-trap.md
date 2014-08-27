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

(hammer screenshots)
(functions)
(link to repository)