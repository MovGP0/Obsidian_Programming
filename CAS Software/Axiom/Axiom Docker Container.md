Dockerfile that builds **FriCAS** (SBCL + GMP, headless X for graphics) and installs **jFriCAS** + **Jupyter**, such that FriCAS can be used from [[Jupyter]] notebooks

> [!note]
> jFriCAS starts a **Hunchentoot**-backed web service inside FriCAS. The Jupyter kernel interacts via HTTP with it.

> [!note]
> If you prefer **Jupyter Notebook** over Lab, replace the `CMD` accordingly; the kernel works with both.

> [!note]
> If you want this slimmer (no graphics/HyperDoc) version, drop the X libraries and `xvfb`, and change the `CMD` to run Jupyter directly.

Place in a file named **DOCKERFILE**:
```dockerfile
# syntax=docker/dockerfile:1.7

##############################################
# Builder stage (ARM64 / aarch64)
##############################################
FROM --platform=linux/arm64 arm64v8/ubuntu:24.04 AS builder

ARG DEBIAN_FRONTEND=noninteractive
# SBCL dynamic space size for compiling FriCAS
ARG SBCL_SPACE_MB=4096

# Core build deps + SBCL + GMP dev + X headers (for graphics/HyperDoc)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates git make gcc g++ gawk pkg-config \
    sbcl \
    libgmp-dev \
    libx11-dev libxt-dev libice-dev libsm-dev libxau-dev libxdmcp-dev libxpm-dev \
 && rm -rf /var/lib/apt/lists/*

# Fetch FriCAS sources
WORKDIR /src
RUN git clone --depth=1 https://github.com/fricas/fricas.git

# Build FriCAS (SBCL + GMP). X headers present -> graphics enabled.
WORKDIR /build
RUN /src/fricas/configure \
      --with-lisp="sbcl --dynamic-space-size ${SBCL_SPACE_MB}" \
      --enable-gmp \
      --prefix=/usr/local \
 && make -j"$(nproc)" \
 && make install

##############################################
# Runtime stage (ARM64) with jFriCAS + Jupyter
##############################################
FROM --platform=linux/arm64 arm64v8/ubuntu:24.04 AS runtime

ARG DEBIAN_FRONTEND=noninteractive

# Runtime deps:
# - SBCL to run FriCAS core
# - GMP runtime
# - Minimal X libs + xvfb so graphics/HyperDoc don't crash headless
# - Python3, pip, venv, Jupyter
# - Common Lisp ASDF + Hunchentoot so jFriCAS can load webspad + start HTTP server
RUN apt-get update && apt-get install -y --no-install-recommends \
    sbcl \
    libgmp10 \
    libx11-6 libxt6 libice6 libsm6 libxau6 libxdmcp6 libxpm4 \
    xvfb \
    python3 python3-pip python3-venv \
    cl-asdf cl-hunchentoot \
 && rm -rf /var/lib/apt/lists/*

# Copy FriCAS from builder
COPY --from=builder /usr/local /usr/local

# Environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PATH="/usr/local/bin:${PATH}" \
    # Increase SBCL dynamic space for heavy sessions
    SBCL_OPTIONS="--dynamic-space-size 4096"

# Install jFriCAS kernel (from PyPI) + Jupyter in a dedicated venv
# This keeps Python bits isolated and faster to upgrade if needed.
RUN python3 -m venv /opt/jpy && \
    /opt/jpy/bin/pip install --no-cache-dir --upgrade pip && \
    /opt/jpy/bin/pip install --no-cache-dir jupyter jfricas && \
    # Install kernelspec globally so `New -> FriCAS` appears
    /opt/jpy/bin/python - <<'PY'
import json, sys, os, jupyter_client, subprocess
# jfricas installs a kernelspec via entry point; ensure it's registered:
subprocess.check_call([os.path.join('/opt/jpy/bin','python'), '-m', 'jupyter', 'kernelspec', 'list'])
PY

# Helpful default: run Jupyter Lab bound to all interfaces (no browser),
# and use xvfb-run so any FriCAS graphics won't error out.
EXPOSE 8888
CMD ["bash","-lc","xvfb-run -a /opt/jpy/bin/jupyter lab --ip=0.0.0.0 --no-browser --NotebookApp.token='' --NotebookApp.password=''"]
```

```sh
# Build ARM64 image
docker buildx build --platform linux/arm64 -t fricas-jfricas:arm64 .

# Run Jupyter Lab (no token) on localhost:8888
docker run --rm -it -p 8888:8888 --platform linux/arm64 fricas-jfricas:arm64
```
