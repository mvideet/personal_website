---
date: '2025-09-04'
title: 'Adaptive Splash Attention CUDA Kernel'
cover: './adasplash.png'
github: 'https://github.com/mvideet/Adaptive-Splash-Attention'

tech:
  - Pytorch
  - CUDA
  - GPU Profiling
  - C++
---

Inspired from Goncalves et al.'s paper on Adaptive Sparse Attention and their Triton implementation, I decided to implement the kernel in CUDA.

This project implements Adaptive Sparse Attention in CUDA, which outperforms Flash Attention at longer sequence lengths by dynamically learning sparsity patterns. The α-entmax normalization enables higher throughput on sparse sequences while maintaining accuracy comparable to dense attention.

We achieved up to 99.6% sparsity while maintaining high accuracy to vanilla self-attention (<1e-5). Currently we are significantly losing speed as a result, but I am currently working on increasing speed as a result of an increase in memory.
