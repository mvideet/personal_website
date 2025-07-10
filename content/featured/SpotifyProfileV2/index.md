---
date: '2'
title: 'Parameter Efficient Fine Tuning in Audio Visual Language Models'
cover: './demo.png'
github: 'https://github.com/mvideet/PEFT-mWhisper'
tech:
  - Pytorch
  - Python
  - Distributed Training
  - OpenAI Whisper
---

This project explores \***\*Parameter-Efficient Fine-Tuning (PEFT)\*\*** strategies for \***\*mWhisper-Flamingo\*\***, a state-of-the-art multilingual audio-visual speech recognition model. With \***\*3B parameters\*\***, the full model requires significant computing resources to fine-tune. We demonstrate that using \***\*LoRA\*\*** with \***\*rank-16\*\*** and tuning only \***\*Query & Value projections\*\*** recovers over \***\*85%\*\*** of noisy-speech performance while training \***\*700x fewer parameters\*\***. Our evaluation compares PEFT techniques like \***\*Linear Adapters\*\***, \***\*LoRA\*\***, and \***\*Soft Prompting\*\***, showing that \***\*LoRA-16 QV\*\*** achieves the optimal balance between parameter efficiency and Word Error Rate performance. This makes fine-tuning large multimodal models more accessible to researchers with limited resources.
