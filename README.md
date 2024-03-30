# OpenWrt Package List Builder

A simple CLI for generating a list of packages to pass to the [OpenWrt Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder) or the [OpenWrt Firmware Selector](https://firmware-selector.openwrt.org/).

## Installation

Clone the repository:

```bash
git clone https://github.com/helmturner/openwrt-package-list-builder.git
```

Install the dependencies:

```bash
cd openwrt-package-list-builder
npm install
```

Optionally, you can install the CLI globally:

```bash
npm install -g
```

## Usage

```sh

$ oplb --help
   ___                __        __    _                  
  / _ \ _ __   ___ _ _\ \      / / __| |_                
 | | | | '_ \ / _ \ '_ \ \ /\ / / '__| __|               
 | |_| | |_) |  __/ | | \ V  V /| |  | |_                
  \___/| .__/ \___|_| |_|\_/\_/ |_|   \__|     _     _   
 |  _ \|_| _  ___| | ____ _  __ _  ___  | |   (_)___| |_ 
 | |_) / _` |/ __| |/ / _` |/ _` |/ _ \ | |   | / __| __|
 |  __/ (_| | (__|   < (_| | (_| |  __/ | |___| \__ \ |_ 
 |_|__ \__,_|\___|_|\_\__,_|\__, |\___| |_____|_|___/\__|
 | __ ) _   _(_) | __| | ___|___/                        
 |  _ \| | | | | |/ _` |/ _ \ '__|                       
 | |_) | |_| | | | (_| |  __/ |                          
 |____/ \__,_|_|_|\__,_|\___|_| v1.0.0
                                                         
Usage: oplb [options]

Generate a space-delimitted package list from various sources and output it to a file that can be used with `opkg install`

Options:
  -V, --version                       output the version number
  -l, --list-paths <paths...>         specify files with space-delimitted package lists to pull packages from (default: [])
  -r, --remove-list-paths <paths...>  specify files with space-delimitted package lists to remove packages from (default: [])
  -p, --opkg-list-paths <paths...>    specify files with list outputs from `opkg` to pull package names from (default: [])
  -j, --json-list-paths <paths...>    specify a json backup file to pull packages from (default: [])
  -b, --backup [path]                 create a JSON backup of the list to [path], or `backup_${LOCALE_DATE}_${EPOCH_MS}.json` if not specified (default: true)
  -o, --output [path]                 output a space-delimitted package list to [path], or `.packages` if not specified (default: true)
  -h, --help                          display help for command

Examples:
  * Generate a merged package list from two space-delimitted package lists:
      $ oplb -l list1.txt list2.txt -o packages.txt

  * Migrate your router to a new major version of OpenWrt:
      $ oplb \
          --json-list-paths 22_03_packagelist_backup.json \
          --list-paths 23_05_defaults.txt 23_05_extras.txt \
          --remove-list-paths unsupported_23_05.txt \
          --outfile 23_05_packages.txt

  * Back up your installed packages to a json file with a custom name:
      ## (on your router)
      $ opkg list-installed | awk '{print $1}' > installed_packages.txt

      ## (with this tool)
      $ oplb -p installed_packages.txt -b installed_packages.json
      
```
