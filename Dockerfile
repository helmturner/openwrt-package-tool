FROM debian:bookworm-slim

USER root

RUN useradd -ms /bin/bash -d /builder builder
RUN apt-get update && apt-get install -y \
build-essential \
libncurses-dev \
zlib1g-dev \
gawk \
git \
gettext \
libssl-dev \
xsltproc \
rsync \
wget \
unzip \
python3 \
python3-distutils \
file
    
WORKDIR /builder

ADD https://downloads.openwrt.org/releases/22.03.5/targets/bcm27xx/bcm2711/openwrt-imagebuilder-22.03.5-bcm27xx-bcm2711.Linux-x86_64.tar.xz imagebuilder.tar.xz

RUN tar -xvf imagebuilder.tar.xz --strip-components=1 
RUN rm imagebuilder.tar.xz
RUN chown -R builder:builder /builder

ARG PROFILE
ARG PACKAGES
ARG BIN_DIR

ARG FILES=""
ARG DISABLED_SERVICES=""
ARG ROOTFS_PARTSIZE="2048"
ARG EXTRA_IMAGE_NAME="$(date +%Y%m%d)-custom"
ARG ADD_LOCAL_KEY=1

ENV PROFILE=${PROFILE}
ENV PACKAGES=${PACKAGES}
ENV BIN_DIR=${BIN_DIR}

ENV FILES=${FILES}
ENV EXTRA_IMAGE_NAME=${EXTRA_IMAGE_NAME}
ENV DISABLED_SERVICES=${DISABLED_SERVICES}
ENV ROOTFS_PARTSIZE=${ROOTFS_PARTSIZE}
ENV ADD_LOCAL_KEY=${ADD_LOCAL_KEY}

USER builder

VOLUME /builder/output

RUN mkdir -p "${BIN_DIR}"

CMD make image PROFILE="${PROFILE}" PACKAGES="${PACKAGES}" FILES="${FILES}" BIN_DIR="${BIN_DIR}" EXTRA_IMAGE_NAME="${EXTRA_IMAGE_NAME}" DISABLED_SERVICES="${DISABLED_SERVICES}" ADD_LOCAL_KEY="${ADD_LOCAL_KEY}" ROOTFS_PARTSIZE="${ROOTFS_PARTSIZE}"
