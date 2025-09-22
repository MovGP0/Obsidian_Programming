### Filesystem

Work with files and directories

| Operator | Description               |
| -------- | ------------------------- |
| &cd      | Change directory          |
| &fo      | File - open               |
| &fc      | File - create             |
| &fmd     | File - make directory     |
| &fde     | File - delete             |
| &ftr     | File - trash              |
| &fe      | File - exists             |
| &fld     | File - list directory     |
| &fif     | File - is file            |
| &fras    | File - read all to string |
| &frab    | File - read all to bytes  |
| &fwa     | File - write all          |

### Standard I/O

Read and write standard input and output

| Operator | Description              |
| -------- | ------------------------ |
| &s       | Show                     |
| &pf      | Print and flush          |
| &p       | Print with newline       |
| &epf     | Print error and flush    |
| &ep      | Print error with newline |
| &sc      | Scan line                |

### Environment

Query the environment

| Operator | Description          |
| -------- | -------------------- |
| &ts      | Terminal size        |
| &raw     | Set raw mode         |
| &args    | Arguments            |
| &var     | Environment variable |

### Streams

Read from and write to streams

| Operator | Description    |
| -------- | -------------- |
| &rs      | Read to string |
| &rb      | Read to bytes  |
| &ru      | Read until     |
| &rl      | Read lines     |
| &w       | Write          |
| &cl      | Close handle   |

### Commands

Execute commands

| Operator | Description         |
| -------- | ------------------- |
| &runi    | Run command inherit |
| &runc    | Run command capture |
| &runs    | Run command stream  |
| &invk    | Invoke              |

### Media

Present media

| Operator | Description         |
| -------- | ------------------- |
| &ims     | Image - show        |
| &gifs    | GIF - show          |
| &ap      | Audio - play        |
| &asr     | Audio - sample rate |
| &ast     | Audio - stream      |

### TCP

Work with TCP sockets

| Operator | Description                     |
| -------- | ------------------------------- |
| &tcpl    | TCP - listen                    |
| &tlsl    | TLS - listen                    |
| &tcpa    | TCP - accept                    |
| &tcpc    | TCP - connect                   |
| &tlsc    | TLS - connect                   |
| &tcpsnb  | TCP - set non-blocking          |
| &tcpsrt  | TCP - set read timeout          |
| &tcpswt  | TCP - set write timeout         |
| &tcpaddr | TCP - address                   |
| &httpsw  | HTTPS - make an HTTP(S) request |

### FFI

Foreign function interface

| Operator | Description                       |
| -------- | --------------------------------- |
| &ffi     | Foreign function interface        |
| &memcpy  | Foreign function interface - copy |
| &memfree | Free memory                       |

### Misc

| Operator | Description            |
| -------- | ---------------------- |
| &b       | Breakpoint             |
| &exit    | Exit                   |
| &clip    | Get clipboard contents |
| &sl      | Sleep                  |
| &camcap  | Webcam - capture       |
