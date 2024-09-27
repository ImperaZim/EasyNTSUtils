mkdir -p ./src/utils/
cd ./src/utils/

sudo apt-get install jq

git clone "https://https://github.com/ImperaZim/EasyNTSUtils.git"
mv ./src/ ./ 

cd ../../

if [ -f "./tsconfig.json" ]; then
jq '.compilerOptions += { "baseUrl": "./" } | .compilerOptions.paths //= {} | .compilerOptions.paths += { "#utils": ["./src/utils/index.ts"], "#console": ["./src/utils/ConsoleUtils/index.ts"], "#json": ["./src/utils/JsonUtils/index.ts"], "#embed": ["./src/utils/EmbedUtils/index.ts"] }' tsconfig.json > tmp.json && mv tmp.json tsconfig.json
fi 

rm -rf ./installer.sh