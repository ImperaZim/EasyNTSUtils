apt install jq

mkdir -p ./src/
mkdir -p ./src/utils/

cd ./src/utils/

rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

git clone "https://github.com/ImperaZim/EasyNTSUtils.git" 
cd EasyNTSUtils
mv ./src/* ../

cd ../ 
rm -rf EasyNTSUtils
cd ../../

if [ -f "./tsconfig.json" ]; then
jq '.compilerOptions += { "baseUrl": "./" } | .compilerOptions.paths //= {} | .compilerOptions.paths += { "#utils": ["./src/utils/index.ts"], "#console": ["./src/utils/ConsoleUtils/index.ts"], "#json": ["./src/utils/JsonUtils/index.ts"], "#mysql": ["./src/MySQLUtils/index.ts"], "#embed": ["./src/utils/EmbedUtils/index.ts"] }' tsconfig.json > tmp.json && mv tmp.json tsconfig.json
fi 

rm -rf ./installer.sh 

echo "EasyNTSUtils Instalado!";