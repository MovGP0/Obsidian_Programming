---
title: Flash-Friendly File System (F2FS)
---
**Flash-Friendly File System** (**F2FS**) is a log-structured Linux file system designed around the behavior of NAND-flash storage.

## Best suited for

- Android devices
- Embedded Linux systems
- eMMC storage
- Some SD-card-based systems
- Flash-heavy appliances

## Design

F2FS writes data in a log-structured pattern intended to reduce random in-place updates and align better with flash translation layers. It divides storage into segments and separates hot and cold data to reduce cleaning overhead and improve allocation behavior.

Modern F2FS includes features such as compression, checkpointing, discard support, and flash-aware garbage collection. Actual benefits depend heavily on the storage controller, firmware, workload, and mount configuration.

## Advantages

- Allocation strategy designed for NAND flash
- Good performance on suitable eMMC and raw-flash-oriented devices
- Compression support, including LZ4 and Zstandard
- Avoids relying on mechanical-disk seek assumptions

## Limitations

- Smaller deployment and recovery-tool ecosystem than [[Fourth Extended File System|ext4]]
- Benefits may be less pronounced on enterprise NVMe drives with sophisticated controllers
- Less universal bootloader and recovery-environment support
- Not normally the first choice for general servers
- Flash media quality and controller behavior can dominate file-system differences

## Choose F2FS when

Choose F2FS for a tested flash-oriented Linux or Android workload. Prefer ext4 for maximum compatibility and predictable general-purpose administration.

## Official sources

- [Linux kernel documentation: F2FS](https://docs.kernel.org/filesystems/f2fs.html)
