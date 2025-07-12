ARG UBUNTU_VERSION=22.04
FROM ubuntu:${UBUNTU_VERSION}

# Install basic development tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      vim \
    && rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]
