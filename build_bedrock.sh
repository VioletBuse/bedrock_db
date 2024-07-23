#!/usr/bin/env bash

# Clone out this repo:
git clone https://github.com/Expensify/Bedrock.git

# Install some dependencies with Brew (see: https://brew.sh/)
brew update
brew install gcc@13
brew install make

# Configure PCRE to use C++17 and compile from source
brew uninstall --ignore-dependencies pcre
brew edit pcre
# Add these to the end of the `system "./configure"` command:
#     "--enable-cpp",
#     "--enable-pcre64",
#     "CXX=/usr/local/bin/g++-13",
#     "CXXFLAGS=--std=gnu++17"
brew install --build-from-source pcre

# Build it
cd Bedrock
make
