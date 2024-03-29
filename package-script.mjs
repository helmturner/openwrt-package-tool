import fs from 'fs';
import { readFromLuciOpkgCopyPaste } from "./parseOpkgOutput.mjs";

const fromLuciOpkgCopyPaste = readFromLuciOpkgCopyPaste("luci-opkg.txt");

const arr = [
  ...fromLuciOpkgCopyPaste,
  'strongswan-mod-curl',
  'iptables-mod-conntrack-extra',
  'iptables-mod-ipopt',
  'iptables-mod-extra',
  'iptables-mod-filter',
  'iptables-mod-dhcpmac',
  'iptables-mod-led',
  'iptables-mod-iface',
  'iptables-mod-geoip',
  'iptables-mod-fuzzy',
  'iptables-mod-nat-extra',
  'iptables-mod-physdev',
  'iptables-mod-proto',
  'iptables-mod-rpfilter',
  'iptgeoip',
  'kmod-nf-ipt',
  'tc-mod-iptables',
  'collectd',
  'collectd-mod-cpu',
  'collectd-mod-interface',
  'collectd-mod-iwinfo',
  'collectd-mod-load',
  'collectd-mod-memory',
  'collectd-mod-network',
  'collectd-mod-rrdtool',
  'collectd-mod-thermal',
  'collectd-mod-uptime',
  'collectd-mod-wireless',
  'collectd-mod-bind',
  'collectd-mod-dns',
  'collectd-mod-syslog',
  'collectd-mod-sensors',
  'collectd-mod-protocols',
  'collectd-mod-processes',
  'collectd-mod-postgresql',
  'collectd-mod-ping',
  'collectd-mod-openvpn',
  'collectd-mod-mysql',
  'collectd-mod-mqtt',
  'collectd-mod-match-hashed',
  'collectd-mod-match-value',
  'collectd-mod-match-regex',
  'collectd-mod-match-timediff',
  'collectd-mod-match-empty-counter',
  'collectd-mod-logfile',
  'collectd-mod-irq',
  'collectd-mod-iptables',
  'collectd-mod-ipstatistics',
  'collectd-mod-filecount',
  'collectd-mod-exec',
  'collectd-mod-ethstat',
  'collectd-mod-entropy',
  'collectd-mod-email',
  'collectd-mod-dns',
  'collectd-mod-disk',
  'collectd-mod-df',
  'collectd-mod-dhcpleases',
  'coreutils',
  'coreutils-sort',
  'wireguard-tools',
  'bind-host',
  'bind-client',
  'bind-server',
  'bind-libs',
  'bind-dnssec',
  'bind-tools',
  'bind-nslookup',
  'ddns-scripts-cloudflare',
  'ddns-scripts-freedns	',
  'ddns-scripts-nsupdate',
  'ddns-scripts-services',
  'ddns-scripts',
  'luci-app-ddns',
  'curl',
  'ca-bundle',
  'adblock',
  'luci-app-adblock',
  'simple-adblock',
  'luci-app-simple-adblock',
  'fdisk',
  'gdisk',
  'kmod-fs-hfs',
  'kmod-fs-hfsplus',
  'hfsfsck',
  'kmod-fs-exfat',
  'libblkid1',
  'ntfs-3g',
  'dosfstools',
  'kmod-fs-vfat',
  'kmod-fs-ext4',
  'e2fsprogs',
  'kmod-crypto-ecb',
  'kmod-crypto-xts',
  'kmod-crypto-misc',
  'kmod-crypto-user',
  'cryptsetup',
  'block-mount',
  'luci-app-hd-idle',
  'kmod-usb-storage',
  'kmod-usb-storage-extras',
  'kmod-usb-storage-uas',
  'usbutils',
  'docker',
  'luci-lib-docker',
  'dockerd',
  'docker-compose',
  'luci-app-dockerman',
  'luci-app-qos',
  'nft-qos',
  'iptables-mod-ipsec',
  'strongswan',
  'strongswan-ipsec',
  'strongswan-charon',
  'strongswan-charon-cmd',
  'strongswan-default',
  'strongswan-full',
  'strongswan-libtls',
  'strongswan-pki',
  'strongswan-scepclient',
  'strongswan-swanctl',
  'iptables-mod-ipsec',
  'wireguard-tools',
  'openvpn-openssl',
  'openvpn-easy-rsa',
  'acme',
  'nano',
  'partx-utils',
  'gzip',
  'bsdtar',
  'parted',
  'qrencode',
  'libqrencode',
  'bcm27xx-userland',
  'luci',
  'luci-app-acme',
  'luci-app-adblock',
  'luci-app-ddns',
  'luci-app-firewall',
  'luci-app-nft-qos',
  'luci-app-openvpn',
  'luci-app-opkg',
  'luci-app-simple-adblock',
  'luci-app-statistics',
  'luci-app-wireguard',
  'luci-base',
  'luci-compat',
  'luci-lib-base',
  'luci-lib-ip',
  'luci-lib-ipkg',
  'luci-lib-jsonc',
  'luci-lib-nixio',
  'luci-mod-admin-full',
  'luci-mod-network',
  'luci-mod-status',
  'luci-mod-system',
  'luci-proto-ipv6',
  'luci-proto-ppp',
  'luci-proto-wireguard',
  'luci-ssl',
  'luci-theme-bootstrap',
  'liblucihttp-lua',
  'liblucihttp0',
  'rpcd-mod-luci',
  'base-files',
  'bcm27xx-gpu-fw',
  'busybox',
  'ca-bundle',
  'cypress-firmware-43455-sdio',
  'cypress-nvram-43455-sdio-rpi-4b',
  'dnsmasq',
  'dropbear',
  'e2fsprogs',
  'firewall4',
  'fstools',
  'iwinfo',
  'kmod-brcmfmac',
  'kmod-fs-vfat',
  'kmod-nft-offload',
  'kmod-nls-cp437',
  'kmod-nls-iso8859-1',
  'kmod-sound-arm-bcm2835',
  'kmod-sound-core',
  'kmod-usb-hid',
  'kmod-usb-net-lan78xx',
  'libc',
  'libgcc',
  'libustream-wolfssl',
  'logd',
  'mkf2fs',
  'mtd',
  'netifd',
  'nftables',
  'odhcp6c',
  'odhcpd-ipv6only',
  'opkg',
  'partx-utils',
  'ppp',
  'ppp-mod-pppoe',
  'procd',
  'procd-seccomp',
  'procd-ujail',
  'uci',
  'uclient-fetch',
  'urandom-seed',
  'wpad-basic-wolfssl',
  'strongswan-full',
  'libopenssl1.1',
  'openssl-util',
  'kmod-brcmfmac',
  'kmod-brcmutil',
  'cryptsetup-ssh',
  'kmod-cfg80211',
  'kmod-crypto-acompress',
  'kmod-crypto-aead',
  'kmod-crypto-authenc',
  'kmod-crypto-cbc',
  'kmod-crypto-ctr',
  'kmod-crypto-deflate',
  'kmod-crypto-des',
  'kmod-crypto-echainiv',
  'kmod-crypto-gcm',
  'kmod-crypto-gf128',
  'kmod-crypto-ghash',
  'kmod-crypto-hash',
  'kmod-crypto-hmac',
  'kmod-crypto-kpp',
  'kmod-crypto-lib-chacha20',
  'kmod-crypto-lib-chacha20poly1305',
  'kmod-crypto-lib-curve25519',
  'kmod-crypto-lib-poly1305',
  'kmod-crypto-manager',
  'kmod-crypto-md5',
  'kmod-crypto-null',
  'kmod-crypto-rng',
  'kmod-crypto-seqiv',
  'kmod-crypto-sha1',
  'kmod-crypto-sha256',
  'kmod-crypto-user',
  'kmod-fs-vfat',
  'kmod-hid',
  'kmod-hid-generic',
  'kmod-input-core',
  'kmod-input-evdev',
  'kmod-ip6tables',
  'kmod-ipsec',
  'kmod-ipsec4',
  'kmod-ipsec6',
  'kmod-ipt-conntrack',
  'kmod-ipt-conntrack-extra',
  'kmod-ipt-core',
  'kmod-ipt-ipsec',
  'kmod-ipt-nat',
  'kmod-ipt-offload',
  'kmod-iptunnel4',
  'kmod-iptunnel6',
  'kmod-wireguard',
  'usbids',
  'usbutils',
  'brcmfmac-firmware-usb',
];

let unique = new Set(arr.sort());
let print = Array.from(unique);

fs.writeFileSync('./packages.txt', print.join(' ').trim());
export default print;
