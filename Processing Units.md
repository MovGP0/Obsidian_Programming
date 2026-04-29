
|Unit|Full name|Main purpose|Architecture tendency|Best at|Weak at / caveat|Typical examples|
|---|---|---|---|---|---|---|
|**CPU**|Central Processing Unit|General-purpose computation|Few to moderate powerful cores, complex control flow, large caches|OS, application logic, branching, serial work, orchestration|Lower throughput per watt for massive parallel numeric workloads|Intel Core/Xeon, AMD Ryzen/EPYC, Apple M-series CPU cores, Arm Neoverse|
|**GPU**|Graphics Processing Unit|Graphics and massively parallel numeric compute|Many SIMD/SIMT cores, high memory bandwidth|Rendering, matrix math, ML training/inference, scientific computing|Branch-heavy serial code, latency-sensitive scalar control|NVIDIA GeForce/RTX/H100/B200, AMD Radeon/Instinct, Intel Arc/Gaudi|
|**TPU**|Tensor Processing Unit|Tensor/matrix acceleration for ML|Systolic arrays / tensor engines, optimized dataflow|Neural-network training and inference, especially dense tensor ops|Less general than GPUs; best inside supported ML stacks|Google Cloud TPU|
|**NPU**|Neural Processing Unit|Local AI acceleration, usually inference|Dedicated neural-network MAC/tensor blocks, often on SoC|On-device AI: vision, speech, small/medium LLM inference, low power|Usually less flexible and less powerful than datacenter GPU/TPU|Apple Neural Engine, Qualcomm Hexagon NPU, Intel AI Boost, AMD Ryzen AI|
|**DPU**|Data Processing Unit|Datacenter infrastructure offload|Network interface + programmable cores + accelerators|Networking, storage, security, virtualization, packet processing|Not a replacement for CPU/GPU compute; infrastructure-focused|NVIDIA BlueField, AMD Pensando, Microsoft Azure DPU|
|**QPU**|Quantum Processing Unit|Quantum computation|Qubits, gates/annealing/photonic/ion/superconducting approaches|Specialized quantum algorithms, simulation, optimization research|Not general-purpose; noisy/error-prone; needs classical host|IBM Quantum, IonQ, Rigetti, D-Wave, Quantinuum|
|**IPU**|Intelligence Processing Unit|AI/ML acceleration|Many independent cores with local memory; graph/dataflow-oriented|Sparse/irregular ML graphs, fine-grained parallelism|Vendor-specific ecosystem; less broadly adopted than GPU|Graphcore IPU; Graphcore describes it as a parallel processor designed for AI workloads. ([graphcore.ai](https://www.graphcore.ai/products/ipu?utm_source=chatgpt.com "IPU Processors"))|
|**LPU**|Language Processing Unit|LLM inference acceleration|Deterministic dataflow-style AI accelerator with large on-chip SRAM emphasis|Low-latency LLM inference, token generation|Mostly a vendor term, not yet a generic industry class like CPU/GPU; strongly associated with Groq|Groq LPU; Groq describes its LPU architecture as using on-chip SRAM and static scheduling for predictable inference performance. ([Groq](https://groq.com/lpu-architecture?utm_source=chatgpt.com "LPU \| Groq is fast, low cost inference."))|

| Category                          | Units                   |
| --------------------------------- | ----------------------- |
| **General-purpose control**       | CPU                     |
| **Parallel numeric acceleration** | GPU, TPU, NPU, IPU, LPU |
| **Infrastructure acceleration**   | DPU                     |
| **Non-classical computation**     | QPU                     |
