---
title: Creating a rotating banner animation in pure CSS
categories: 
  - css
  - design
published: true
---
<style>
	@-webkit-keyframes final {
    	0% {
        	background-color: beige;
        }
        33% {
        	background-color: cornflowerblue;
        }
        66% {
       		background-color: coral
        }
        100% {
        	background-color: beige;
        }
    }
	@keyframes final {
    	0% {
        	background-color: beige;
        }
        33% {
        	background-color: cornflowerblue;
        }
        66% {
       		background-color: coral
        }
        100% {
        	background-color: beige;
        }
    }
	.final {
    	-webkit-animation: final 8s linear infinite;
    }
    .banner {
    	width: 100%;
        height: 4em;
    }
</style>
Here's what we're building today:

<div class="banner final"></div>