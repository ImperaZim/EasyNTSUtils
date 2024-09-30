
rm -rf ./*
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --silent

mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/

rm -rf EasyNTSUtils

