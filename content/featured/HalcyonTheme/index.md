---
date: '4'
title: 'Reasoning in Diffusion Language Models'
cover: './demo.png'
github: 'https://github.com/mvideet/latent_diffusion'

tech:
  - Pytorch
  - Distributed Training
  - LLM Reasoning
  - SLURM
---

Wanted to learn about diffusion language models and how their internal reasoning mechanism emerges during the diffusion process. Developed mutual information estimation frameworks using multiple estimators (binning, KSG) to track information accumulation patterns and discrete "eureka moments" where models gain sudden insights about correct answers.

Implemented Feature-wise Linear Modulation (FiLM) adapters for latent reasoning injection, enabling fine-grained control over diffusion trajectories by conditioning reasoning representations at each layer.
