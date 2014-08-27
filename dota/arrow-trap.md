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

{% gist thristhart/1afe255c8daba0f0d32e npc_units_custom.txt %}

The most important part is giving it our custom ability, dota_ability_trap_arrow. The unselectable ability is a custom passive that makes it invisible and unselectable, but that isn't strictly required if you don't want it. Same goes for setting the model to invisiblebox.mdl.

Here's npc_abilities_custom, featuring dota_ability_trap_arrow, which is simply based on Mirana's Sacred Arrow, and unselectable, a modifier-laden datadriven ability.

{% gist thristhart/1afe255c8daba0f0d32e npc_abilities_custom.txt %}

(hammer screenshots)
(functions)
(link to repository)