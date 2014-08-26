---
title: Making a texture navigable by default
categories: 
  - dota
published: true
---

This is my test map:
![](assets/test_map_01.png)

If you're familiar with the source engine mapping scene, you probably recognize the dev measure texture (in this case, devmeasuregeneric01b). 
It's a very useful texture, because it allows you to see the distance between objects at a glance. Often, TF2 mappers start their maps entirely with dev textures, to help them get the shape and balance of the map right without needing to deal with detail. Gameplay test versions of the maps use the dev textures to communicate that the map is unfinished and the important thing being tested is map balance rather than aesthetics.

Unfortunately, by default Hammer and Dota will not generate a navmesh on this texture. The reason for this is that hammer will not generate a navigation mesh on textures that lack the dota.nav.walkable attribute. 
![](assets/test_map_no_nav.png)
mod_radiant_000 has the walkable property, and will therefore generate a nav mesh, unlike devmeasuregeneric01b.
![](assets/dota_nav_walkable_assetinfo.png)

As a side note, it's possible to filter in the material browser for only walkable textures.
<video src="assets/filter_by_walkable.webm" autoplay loop >
</video>

There are a couple options to work around this.

![](assets/test_map_clip_workaround.png)

You could use toolsclip to manually create navigatable areas. This works, but takes a very long tedious time - you have to create it everywhere you want the player to walk, and that can quickly get out of hand.

The best way is to modify the texture to add the attribute dota.nav.walkable: 1. There are two ways to do this: the material editor, or just a text editor.

<video src="assets/material_editor_set_walkable.webm" autoplay loop>
</video>

Instead of using the Material Editor, one can also simply modify the .vmat file in a text editor. (Here's dota_addons\testing_grounds\materials\dev\dev_measuregeneric01b.vmat):
{% highlight text %}
// THIS FILE IS AUTO-GENERATED

Layer0
{
	shader "global_lit_simple.vfx"

	//---- Color ----
	g_vColorTint "[1.000000 1.000000 1.000000 0.000000]"
	g_vTexCoordOffset "[0.000 0.000]"
	g_vTexCoordScale "[1.000 1.000]"
	TextureColor "materials/dev/dev_measuregeneric01b_color.tga"

	Attributes
	{
		dota.nav.walkable "1"
	}
}
{% endhighlight %}

It should be noted that many textures that come with dota are only available in the vmat_c format. My understanding is that these textures have not yet been decompiled, but you should pay attention to @ToraxXx's [Source 2 Resource Decompiler](https://github.com/ToraxXx/source_2_resource_decompiler) project, which can already successfully decompile particles.
If you have a compiled texture that you want to make navigable, it might be possible to simply edit the vmat_c file, as it is mostly plaintext. I have not experimented with this, however.